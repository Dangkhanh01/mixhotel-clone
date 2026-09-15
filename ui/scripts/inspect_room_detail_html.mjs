import * as cheerio from 'cheerio';
import fs from 'fs';

const html = fs.readFileSync('scratch/room_detail_cloud_nine.html', 'utf8');
const $ = cheerio.load(html);

console.log('Room Title:', $('title').text().trim());

$('section').each((i, el) => {
  const cls = $(el).attr('class');
  const id = $(el).attr('id');
  console.log(`\nSection ${i}: class="${cls}" id="${id}"`);
  console.log('Headings:', $(el).find('h1, h2, h3, .title').map((_, h) => $(h).text().trim().replace(/\s+/g, ' ')).get().slice(0, 3));
  console.log('Text preview:', $(el).text().trim().replace(/\s+/g, ' ').substring(0, 150));
});
