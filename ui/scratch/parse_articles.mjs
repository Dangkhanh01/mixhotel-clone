import fs from 'fs';
import path from 'path';

const slugs = [
  'khach-san-vintage',
  'khach-san-phong-cach-tropical',
  'khach-san-phong-cach-indochine',
  'khach-san-gan-lang-bac',
  'so-sanh-khach-san',
  'bang-noi-quy-khach-san',
  'khach-san-gan-pho-co',
  'khach-san-gan-ho-guom'
];

const results = [];

for (const slug of slugs) {
  const filePath = path.join('scratch/scraped_articles', `${slug}.html`);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract title
  const titleMatch = html.match(/<h1[^>]*titlePost[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract excerpt/sapo
  const sapoMatch = html.match(/<p class=['"]size-1['"]>([\s\S]*?)<\/p>/i);
  const excerpt = sapoMatch ? sapoMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract table of contents
  const tocMatch = html.match(/<div class=['"]mucLucPart['"][^>]*>([\s\S]*?)<\/div>/i);
  const toc = [];
  if (tocMatch) {
    const liRegex = /<a href=['"]#([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/g;
    let m;
    while ((m = liRegex.exec(tocMatch[1])) !== null) {
      toc.push({ anchor: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
    }
  }

  // Extract main content
  const contentMatch = html.match(/<div class=['"][^'"]*data_contents[^'"]*['"]>([\s\S]*?)<\/div>\s*<!-- \.on-desktop -->/i);
  const rawContent = contentMatch ? contentMatch[1].trim() : '';

  // Extract images inside content
  const imgRegex = /<img[^>]+src=['"]([^'"]+)['"][^>]*>/g;
  const images = [];
  let imgM;
  while ((imgM = imgRegex.exec(rawContent)) !== null) {
    images.push(imgM[1]);
  }

  results.push({
    slug,
    title,
    excerpt,
    tocCount: toc.length,
    toc,
    contentLength: rawContent.length,
    imagesCount: images.length,
    images
  });
}

console.log(JSON.stringify(results, null, 2));
