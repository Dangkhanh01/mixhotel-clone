import * as cheerio from 'cheerio';
import fs from 'fs';

const html = fs.readFileSync('scratch/gallery_full.html', 'utf8');
const $ = cheerio.load(html);

// Find the container between titleBlock and pagination
console.log('--- MAIN CHILDREN ---');
$('main .container').each((i, el) => {
  console.log(`Container ${i}: class="${$(el).attr('class')}"`);
});

// Search for cards with links to /khach-san-tinh-yeu/
$('main a[href*="/khach-san-tinh-yeu/"]').each((i, el) => {
  const parent = $(el).parent();
  console.log(`Link ${i}: parentTag=<${parent.prop('tagName')}> parentClass="${parent.attr('class')}" href="${$(el).attr('href')}" html="${$(el).html().substring(0, 100)}"`);
});
