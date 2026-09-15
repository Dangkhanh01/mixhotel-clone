import fs from 'fs';
import * as cheerio from 'cheerio';
const html = fs.readFileSync('scratch/scraped_articles/khach-san-vintage.html', 'utf8');
const $ = cheerio.load(html);
console.log('h1 html:', $('h1').html());
console.log('h1 text:', $('h1').text());
