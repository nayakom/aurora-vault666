import { Product } from '../data/products';
import { parseBulkSpecifications } from './specsParser';

const BLOGGER_API_KEY = process.env.BLOGGER_API_KEY;
const BLOGGER_BLOG_ID = process.env.BLOGGER_BLOG_ID;

export async function getProductsFromBlogger(): Promise<Product[]> {
  const API_KEY = process.env.BLOGGER_API_KEY;
  const BLOG_ID = process.env.BLOGGER_BLOG_ID;

  console.log("Checking API Keys...");
  console.log("API_KEY exists?", !!API_KEY);
  console.log("BLOG_ID exists?", !!BLOG_ID);

  if (!API_KEY || !BLOG_ID) {
    console.error('Blogger API keys are missing in environment variables.');
    return [];
  }

  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&fetchImages=true&maxResults=20`;
  console.log("Fetching from Blogger URL...");

  try {
    const res = await fetch(url, { cache: 'no-store' }); // Always fetch fresh data
    if (!res.ok) {
      throw new Error(`Failed to fetch from Blogger API: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Parse each post into a Product
    return data.items.map((post: any) => {
      // 1. Extract Images (All img tags)
      const images: string[] = [];
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let imgMatch;
      while ((imgMatch = imgRegex.exec(post.content)) !== null) {
        // Upgrade to High-Res
        const highResUrl = imgMatch[1].replace(/\/(s\d+|w\d+-h\d+)(-[a-z]+)*\//g, '/s1600/');
        if (!images.includes(highResUrl)) {
          images.push(highResUrl);
        }
      }
      const imageUrl = images.length > 0 ? images[0] : '/images/products/placeholder.jpg';

      // 2. Extract Specifications from bullet lists (<ul><li>Key: Value</li></ul>)
      const specifications: Record<string, string> = {};
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch;
      while ((liMatch = liRegex.exec(post.content)) !== null) {
        let text = liMatch[1].replace(/<[^>]*>?/gm, '').trim(); // Remove inner HTML like strong
        text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
        if (text.includes(':')) {
          const [key, ...val] = text.split(':');
          specifications[key.trim()] = val.join(':').trim();
        }
      }

      // 2.5 Extract Specifications from Flipkart tables (pasted from Flipkart)
      const flipkartRegex = /<div[^>]*color:\s*#707070[^>]*>([\s\S]*?)<\/div>[\s\S]*?<div[^>]*color:\s*#333333[^>]*>([\s\S]*?)<\/div>/gi;
      let flipkartMatch;
      while ((flipkartMatch = flipkartRegex.exec(post.content)) !== null) {
        let key = flipkartMatch[1].replace(/<[^>]*>?/gm, '').trim();
        let val = flipkartMatch[2].replace(/<[^>]*>?/gm, '').trim();
        if (key && val) {
          specifications[key] = val;
        }
      }

      // 3. Extract Description and Usage
      let contentForDesc = post.content;
      
      // Remove parsed Flipkart specification divs from the description content so they don't duplicate
      contentForDesc = contentForDesc.replace(/<div[^>]*color:\s*#707070[^>]*>([\s\S]*?)<\/div>/gi, '');
      contentForDesc = contentForDesc.replace(/<div[^>]*color:\s*#333333[^>]*>([\s\S]*?)<\/div>/gi, '');
      // Remove Flipkart table category headings (like "General", "Dimensions")
      contentForDesc = contentForDesc.replace(/<div[^>]*class="[^"]*v1zwn21n v1zwn24[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '');

      // Preserve newlines for paragraphs, divs, table rows, and list items before stripping HTML
      let textContent = contentForDesc
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/tr>/gi, '\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<[^>]*>?/gm, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/[ ]+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n') // Collapse excessive newlines
        .trim();

      let description = textContent;
      let usage = "";
      let features = "";
      let warranty = "";

      // 4. Manual Section Parser (User-typed headings)
      let lines = textContent.split('\n');
      let currentSection = 'description'; // Default section
      let descriptionLines: string[] = [];
      let specsLines: string[] = [];
      let usageLines: string[] = [];
      let featuresLines: string[] = [];
      let warrantyLines: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        let lower = line.toLowerCase().replace(/:$/, ''); // Remove trailing colon if any
        
        if (lower === 'specifications' || lower === 'specification' || lower === 'product details' || lower === 'details') {
          currentSection = 'specifications';
          continue;
        } else if (lower === 'description' || lower === 'about' || lower === 'overview') {
          currentSection = 'description';
          continue;
        } else if (lower === 'purpose' || lower === 'usage' || lower === 'how to use') {
          currentSection = 'usage';
          continue;
        } else if (lower === 'features' || lower === 'key features') {
          currentSection = 'features';
          continue;
        } else if (lower === 'warranty' || lower === 'warranty details') {
          currentSection = 'warranty';
          continue;
        }

        if (currentSection === 'description') {
          descriptionLines.push(lines[i]);
        } else if (currentSection === 'usage') {
          usageLines.push(lines[i]);
        } else if (currentSection === 'features') {
          featuresLines.push(lines[i]);
        } else if (currentSection === 'warranty') {
          warrantyLines.push(lines[i]);
        } else if (currentSection === 'specifications') {
          specsLines.push(lines[i]);
        }
      }

      // Update variables if manual sections were found
      let parsedDesc = descriptionLines.join('\n').trim();
      let parsedUsage = usageLines.join('\n').trim();
      let parsedFeatures = featuresLines.join('\n').trim();
      let parsedWarranty = warrantyLines.join('\n').trim();
      
      if (parsedDesc) description = parsedDesc;
      if (parsedUsage) usage = parsedUsage;
      if (parsedFeatures) features = parsedFeatures;
      if (parsedWarranty) warranty = parsedWarranty;
      
      // Parse manual specifications (e.g., Brand: Daniel Klein or alternating Flipkart lines)
      if (specsLines.length > 0) {
        const specsText = specsLines.join('\n');
        const parsed = parseBulkSpecifications(specsText);
        for (const item of parsed) {
          if (item.key && item.value) {
            specifications[item.key] = item.value;
          }
        }
      }

      // 5. Parse Affiliate Links and custom ratings
      const affiliates: any = {};
      const linkRegex = /<a([^>]+)>(.*?)<\/a>/gi;
      let match;
      while ((match = linkRegex.exec(post.content)) !== null) {
        const attributes = match[1];
        const text = match[2].toLowerCase();
        
        const hrefMatch = /href="([^"]+)"/i.exec(attributes);
        const ratingMatch = /data-rating="([^"]+)"/i.exec(attributes);
        
        if (!hrefMatch) continue;
        
        const url = hrefMatch[1];
        const customRating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
        
        if (text.includes('amazon') || url.includes('amazon.') || url.includes('amzn.to') || url.includes('amzn.in') || url.includes('link.amazon')) {
          affiliates.amazon = { platform: "Amazon", url: url, rating: customRating || 4.8, reviews: 2450 };
        } else if (text.includes('myntra') || url.includes('myntra.') || url.includes('myntr.it')) {
          affiliates.myntra = { platform: "Myntra", url: url, rating: customRating || 4.7, reviews: 920 };
        } else if (text.includes('meesho') || url.includes('meesho.')) {
          affiliates.meesho = { platform: "Meesho", url: url, rating: customRating || 4.4, reviews: 3100 };
        } else if (text.includes('flipkart') || url.includes('flipkart.') || url.includes('ekaro.in') || url.includes('fkrt.it')) {
          affiliates.flipkart = { platform: "Flipkart", url: url, rating: customRating || 4.6, reviews: 1820 };
        }
      }

      // Check for explicit main product rating
      const mainRatingMatch = /data-product-rating="([^"]+)"/i.exec(post.content);
      const customMainRating = mainRatingMatch ? parseFloat(mainRatingMatch[1]) : null;

      // Calculate main product rating
      const assignedRatings = Object.values(affiliates).map((a: any) => a.rating);
      const avgRating = customMainRating
        ? customMainRating
        : (assignedRatings.length > 0 
          ? parseFloat((assignedRatings.reduce((a: number, b: number) => a + b, 0) / assignedRatings.length).toFixed(1))
          : 4.8);

      return {
        id: post.id,
        name: post.title,
        description: description,
        usage: usage,
        features: features,
        warranty: warranty,
        specifications: specifications,
        price: 0,
        imageUrl: imageUrl,
        images: images,
        affiliates: affiliates,
        rating: avgRating,
        labels: post.labels || []
      };
    });
  } catch (error) {
    console.error('Blogger API Error:', error);
    return [];
  }
}
