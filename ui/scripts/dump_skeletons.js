const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/branchPremium.html', 'utf8');
const $ = cheerio.load(html);

const classes = [
  'mixCateBooking',
  'mixCateGallery',
  'mixCatePremium',
  'mixCateDecor',
  'mixCatePolicy',
  'mixCateFaq',
  'catePremiumCta'
];

for (const cls of classes) {
  console.log(`\n============================= ${cls} =============================`);
  const el = $('.' + cls);
  if (el.length) {
    // Print simplified outer HTML structure
    console.log(el.prop('outerHTML').slice(0, 1200));
  } else {
    console.log('NOT FOUND');
  }
}
