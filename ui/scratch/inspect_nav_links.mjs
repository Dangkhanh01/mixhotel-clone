import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');

// Find all menu links in mixPremiumNavBox
const navMatch = html.match(/<div[^>]*class=["'][^"']*mixPremiumNavBox[^"']*["'][\s\S]*?<\/div>\s*<\/div>\s*<div[^>]*class=["'][^"']*mixPremiumActionBox/i);
if (navMatch) {
  console.log('Nav box HTML:');
  console.log(navMatch[0]);
}

// Extract all <a> hrefs and text in menu
const links = [...html.matchAll(/<a[^>]+class=["'](?:mixPremiumNavLink|mixPremiumDropLink)["'][^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
links.forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').trim();
  console.log(`${text} -> ${l[1]}`);
});
