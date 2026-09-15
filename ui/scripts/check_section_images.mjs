import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import https from 'https';

const dir = path.resolve('scratch/khach_san_tinh_yeu_sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const allImages = new Set();

files.forEach(f => {
  const html = fs.readFileSync(path.join(dir, f), 'utf8');
  const $ = cheerio.load(html);
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    const dataSrc = $(el).attr('data-src');
    if (src && !src.startsWith('data:')) allImages.add(src);
    if (dataSrc && !dataSrc.startsWith('data:')) allImages.add(dataSrc);
  });
  // Also check background-image
  $('[style*="background"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const match = style.match(/url\(['"]?([^'")]+)['"]?\)/);
    if (match && !match[1].startsWith('data:')) {
      allImages.add(match[1]);
    }
  });
});

console.log(`Found ${allImages.size} unique image URLs across all 12 sections:`);
const imgList = Array.from(allImages);
imgList.forEach(url => console.log(' -', url));

// Save image list to json
fs.writeFileSync('scratch/khach_san_tinh_yeu_images.json', JSON.stringify(imgList, null, 2), 'utf8');
