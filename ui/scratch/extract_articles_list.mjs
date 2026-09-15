import fs from 'fs';

const content = fs.readFileSync('scratch/live_pages/tin-tuc.html', 'utf8');
const regex = /<a[^>]+class=['"][^'"]*aTagTitle[^'"]*['"][^>]+href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/g;
let match;
const articles = [];
while ((match = regex.exec(content)) !== null) {
  const url = match[1];
  const title = match[2].replace(/<[^>]+>/g, '').trim();
  articles.push({ url, title });
}
console.log(JSON.stringify(articles, null, 2));
