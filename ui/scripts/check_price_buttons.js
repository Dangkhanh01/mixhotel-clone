const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/branchPremium.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== mixPricePremium buttons in branchPremium.html ===');
$('.mixPricePremiumCard').each((i, el) => {
  const btn = $(el).find('a, button');
  console.log({
    cardTitle: $(el).find('.mixPricePremiumName').text().trim(),
    btnText: btn.text().replace(/\s+/g, ' ').trim(),
    btnHref: btn.attr('href'),
    btnClass: btn.attr('class'),
    btnDataHref: btn.attr('datahref')
  });
});
