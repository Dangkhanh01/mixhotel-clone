import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const scrapedDir = path.resolve('scratch/scraped_articles');
const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.html'));
const imageMap = JSON.parse(fs.readFileSync(path.resolve('scratch/image_mapping.json'), 'utf8'));

let totalImages = 0;
let matchedImages = 0;
const unmatched = [];

for (const f of files) {
  const html = fs.readFileSync(path.join(scrapedDir, f), 'utf8');
  const $ = cheerio.load(html);
  
  $('.data_contents img').each((_, el) => {
    totalImages++;
    let src = $(el).attr('src') || '';
    let mapped = imageMap[src];
    if (!mapped && src.startsWith('https://mixhotel.vn')) {
      const rel = src.replace('https://mixhotel.vn', '');
      mapped = imageMap[rel];
    }
    if (mapped) {
      // check if file exists
      const localDiskPath = path.resolve('public', mapped.replace(/^\//, ''));
      if (fs.existsSync(localDiskPath)) {
        matchedImages++;
      } else {
        console.warn(`File does not exist on disk: ${localDiskPath}`);
      }
    } else {
      unmatched.push({ file: f, src });
    }
  });
}

console.log(`Total images in content across all 8 articles: ${totalImages}`);
console.log(`Successfully matched to local files: ${matchedImages}`);
console.log(`Unmatched images: ${unmatched.length}`);
if (unmatched.length > 0) {
  console.log('Unmatched list:', unmatched);
}
