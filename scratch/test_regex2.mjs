import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/blogger_dump.json', 'utf-8'));
const post = data.items[0];

const specifications = {};
const flipkartRegex = /<div[^>]*color:\s*#707070[^>]*>([\s\S]*?)<\/div>[\s\S]*?<div[^>]*color:\s*#333333[^>]*>([\s\S]*?)<\/div>/gi;

let match;
while ((match = flipkartRegex.exec(post.content)) !== null) {
  let key = match[1].replace(/<[^>]*>?/gm, '').trim();
  let val = match[2].replace(/<[^>]*>?/gm, '').trim();
  if (key && val) {
    specifications[key] = val;
  }
}

let contentForDesc = post.content;
// Remove extracted spec key/values
contentForDesc = contentForDesc.replace(/<div[^>]*color:\s*#707070[^>]*>([\s\S]*?)<\/div>/gi, '');
contentForDesc = contentForDesc.replace(/<div[^>]*color:\s*#333333[^>]*>([\s\S]*?)<\/div>/gi, '');
// Remove the heading like "General", "Dimensions" which have class v1zwn24
contentForDesc = contentForDesc.replace(/<div[^>]*class="[^"]*v1zwn24[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '');

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

console.log("Description:", textContent);
