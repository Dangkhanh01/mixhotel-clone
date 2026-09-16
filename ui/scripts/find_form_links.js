const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/branchPremium.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== All links with href="#form-lien-he" in branchPremium.html ===');
$('a[href*="form-lien-he"]').each((i, el) => {
  console.log({
    text: $(el).text().replace(/\s+/g, ' ').trim(),
    parentClass: $(el).parent().attr('class'),
    class: $(el).attr('class')
  });
});
