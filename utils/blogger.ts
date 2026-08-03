export interface BloggerPost {
  id: string;
  title: string;
  content: string;
  published: string;
  url: string;
  labels?: string[];
  author?: {
    displayName: string;
  };
}

export async function getBloggerPosts(): Promise<BloggerPost[]> {
  const API_KEY = process.env.BLOGGER_API_KEY;
  const BLOG_ID = process.env.BLOGGER_BLOG_ID;

  if (!API_KEY || !BLOG_ID) {
    console.warn("Blogger API Key or Blog ID is missing in environment variables.");
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Blogger posts: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items as BloggerPost[];
  } catch (error) {
    console.error("Error fetching blogger posts:", error);
    return [];
  }
}
