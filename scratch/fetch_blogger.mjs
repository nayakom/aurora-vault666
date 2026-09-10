import fs from 'fs';

async function test() {
  const API_KEY = process.env.BLOGGER_API_KEY || ''; // Needs to be fetched or I can just read it from .env
  const BLOG_ID = process.env.BLOGGER_BLOG_ID || '';
  
  // Actually, I can just read .env
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const apiKeyMatch = envContent.match(/BLOGGER_API_KEY=(.*)/);
  const blogIdMatch = envContent.match(/BLOGGER_BLOG_ID=(.*)/);
  
  const apiKey = apiKeyMatch ? apiKeyMatch[1] : '';
  const blogId = blogIdMatch ? blogIdMatch[1] : '';

  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&fetchImages=true&maxResults=2`;
  const res = await fetch(url);
  const data = await res.json();

  fs.writeFileSync('scratch/blogger_dump.json', JSON.stringify(data, null, 2));
  console.log("Dumped to scratch/blogger_dump.json");
}

test();
