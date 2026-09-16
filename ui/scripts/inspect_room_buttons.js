const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/branchPremium.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== mixRoomPremium buttons ===');
$('.mixRoomPremium').first().find('.mixRoomPremiumActions a, .mixRoomPremiumActions button').each((i, el) => {
  console.log({
    tag: el.tagName,
    text: $(el).text().trim(),
    href: $(el).attr('href'),
    class: $(el).attr('class'),
    onclick: $(el).attr('onclick'),
    dataHref: $(el).attr('datahref'),
    dataTarget: $(el).attr('data-target')
  });
});

console.log('=== mixRoomShowcase buttons ===');
$('.mixRoomShowcasePanel').find('.mixRoomShowcaseActions a, .mixRoomShowcaseActions button').each((i, el) => {
  console.log({
    tag: el.tagName,
    text: $(el).text().trim(),
    href: $(el).attr('href'),
    class: $(el).attr('class'),
    onclick: $(el).attr('onclick')
  });
});
