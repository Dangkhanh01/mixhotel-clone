import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');
const matches = [...html.matchAll(/href=["']([^"']+\.css[^"']*)["']/gi)].map(m => m[1]);
console.log('All CSS matches:', matches);

// Check where mixFooterPremium is used in html
const footerOccurrences = [...html.matchAll(/class=["']([^"']*mixFooterPremium[^"']*)["']/gi)].map(m => m[1]);
console.log('Footer classes used:', [...new Set(footerOccurrences)]);

// Check if theme.default css was completely downloaded
const themeFile = 'scratch_mixhotel_luxury.css';
const content = fs.readFileSync(themeFile, 'utf8');
console.log('scratch_mixhotel_luxury.css length:', content.length);
console.log('Contains footer:', content.includes('Footer') || content.includes('footer'));

// Check theme.default file from server directly
async function checkThemeCss() {
  const url = 'https://mixhotel.vn/assets/theme.default-5c65fdcb52a017e1daf763e79f23a98d8aa222f9c7bcda30b06243b232685942.css';
  const res = await fetch(url);
  const text = await res.text();
  console.log('Full theme.default CSS length:', text.length);
  console.log('Has mixFooterPremium in full theme:', text.includes('mixFooterPremium'));
  if (text.includes('mixFooterPremium')) {
    const idx = text.indexOf('mixFooterPremium');
    console.log('Snippet around mixFooterPremium:', text.slice(idx - 50, idx + 400));
  }
  fs.writeFileSync('scratch/theme_full.css', text);
}

checkThemeCss().catch(console.error);
