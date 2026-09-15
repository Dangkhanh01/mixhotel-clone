import * as cheerio from 'cheerio';
import fs from 'fs';

const html = fs.readFileSync('scratch/gallery_full.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- GALLERY TITLE BLOCK ---');
console.log($('.titleBlock_1').html()?.trim());

console.log('--- SUBCATE BLOCK (BRANCH TABS) ---');
$('.wrapSubcateBlock_1 .smallPart').each((i, el) => {
  console.log(`Branch tab ${i}:`, $(el).find('a').attr('href'), $(el).find('a').text().trim(), $(el).find('img').attr('src'));
});

console.log('--- GALLERY ITEMS COUNT ---');
const items = $('.itemCategoryBlock_1');
console.log(`Found ${items.length} items`);

items.each((i, el) => {
  const link = $(el).find('a').attr('href');
  const title = $(el).find('.titleItem, h3, a').text().trim().replace(/\s+/g, ' ');
  const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
  console.log(`Item ${i}: link="${link}" title="${title}" img="${img}"`);
});

console.log('--- PAGINATION ---');
console.log($('.pagination').html()?.trim() || $('.wrapPagination').html()?.trim() || $('ul.pagination').text());

console.log('--- CONTENT FRAME / SEO SECTION ---');
console.log($('.content-frame-section').html()?.substring(0, 300));
