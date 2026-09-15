import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const scrapedDir = path.resolve('scratch/scraped_articles');
const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const html = fs.readFileSync(path.join(scrapedDir, f), 'utf8');
  const $ = cheerio.load(html);
  
  console.log(`\n=== FILE: ${f} ===`);
  console.log('TOC links:');
  $('.mucLucPart a').each((_, el) => {
    console.log(`  ${$(el).attr('href')} -> ${$(el).text().trim()}`);
  });

  console.log('Headings in content:');
  $('.data_contents h2, .data_contents h3').each((_, el) => {
    console.log(`  <${el.name} id="${$(el).attr('id')}"> ${$(el).text().trim()}`);
  });
}
