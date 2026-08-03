import { Product } from '../data/products';

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

      // 3. Extract Description and Usage
      // We'll split the content by paragraphs or breaks to find text
      let textContent = post.content.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
      
      let description = textContent;
      let usage = "";

      // If user specifically typed "Usage:" we can try to extract it
      if (textContent.includes('Usage:')) {
         const parts = textContent.split('Usage:');
         description = parts[0].trim();
         usage = parts[1].trim();
      } else {
         // If no Usage, split in half roughly or just use full as description
         description = textContent;
      }

      // 4. Parse Affiliate Links and generate realistic premium ratings
      const affiliates: any = {};
      const linkRegex = /<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/gi;
      let match;
      while ((match = linkRegex.exec(post.content)) !== null) {
        const url = match[1].toLowerCase();
        const text = match[2].toLowerCase();
        
        if (url.includes('amazon.') || url.includes('amzn.to') || text.includes('amazon')) {
            affiliates.amazon = { platform: "Amazon", url: match[1], rating: 4.8, reviews: 2450 };
        }
        if (url.includes('flipkart.') || url.includes('fkrt.it') || text.includes('flipkart')) {
            affiliates.flipkart = { platform: "Flipkart", url: match[1], rating: 4.6, reviews: 1820 };
        }
        if (url.includes('meesho.') || text.includes('meesho')) {
            affiliates.meesho = { platform: "Meesho", url: match[1], rating: 4.4, reviews: 3100 };
        }
        if (url.includes('myntra.') || text.includes('myntra')) {
            affiliates.myntra = { platform: "Myntra", url: match[1], rating: 4.7, reviews: 920 };
        }
      }

      return {
        id: post.id,
        name: post.title,
        description: description,
        usage: usage,
        specifications: specifications,
        price: 0,
        imageUrl: imageUrl,
        images: images,
        affiliates: affiliates,
        rating: 4.8, // Default high rating for aesthetics
        labels: post.labels || []
      };
    });
  } catch (error) {
    console.error('Blogger API Error:', error);
    return [];
  }
}
