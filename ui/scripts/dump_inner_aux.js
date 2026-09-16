const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('scratch/branchPremium.html', 'utf8'));

console.log('=== mixCateGalleryBody ===');
console.log($('.mixCateGalleryBody').html()?.slice(0, 1000));

console.log('=== mixCatePremiumContent ===');
console.log($('.mixCatePremiumContent').html()?.slice(0, 1000));

console.log('=== mixCateDecorContent ===');
console.log($('.mixCateDecorContent').html()?.slice(0, 1000));

console.log('=== mixCatePolicyBody ===');
console.log($('.mixCatePolicyBody').html()?.slice(0, 1000));
