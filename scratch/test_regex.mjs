import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/blogger_dump.json', 'utf-8'));
const post = data.items[0];

const specifications = {};

// Flipkart format regex:
// A div with color #707070 (key) followed closely by a div with color #333333 (value)
const flipkartRegex = /<div[^>]*color:\s*#707070[^>]*>([\s\S]*?)<\/div>[\s\S]*?<div[^>]*color:\s*#333333[^>]*>([\s\S]*?)<\/div>/gi;

let match;
while ((match = flipkartRegex.exec(post.content)) !== null) {
  let key = match[1].replace(/<[^>]*>?/gm, '').trim();
  let val = match[2].replace(/<[^>]*>?/gm, '').trim();
  if (key && val) {
    specifications[key] = val;
  }
}

console.log("Extracted Specifications:", specifications);
