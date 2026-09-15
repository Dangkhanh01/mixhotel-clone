import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const scrapedDir = path.resolve('scratch/scraped_articles');
const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.html'));

const links = new Set();

for (const f of files) {
  const html = fs.readFileSync(path.join(scrapedDir, f), 'utf8');
  const $ = cheerio.load(html);
  
  $('.data_contents a').each((_, el) => {
    links.add($(el).attr('href'));
  });
}

console.log('All links inside content:');
for (const l of links) {
  console.log('  ', l);
}
