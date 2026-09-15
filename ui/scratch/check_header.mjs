import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');

// Find header or menu elements
const menuWrap = html.match(/<header[\s\S]*?<\/header>/i) || html.match(/class=["'][^"']*mixPremiumMenu[^"']*["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
if (menuWrap) {
  console.log('Header snippet:', menuWrap[0].slice(0, 1000));
} else {
  const menuIdx = html.indexOf('mixPremiumMenu');
  console.log('Snippet around mixPremiumMenu:', html.slice(menuIdx - 200, menuIdx + 1500));
}

// Check mobile menu
const mobIdx = html.indexOf('menuNKTA_MOBILE');
if (mobIdx !== -1) {
  console.log('Snippet around menuNKTA_MOBILE:', html.slice(mobIdx - 100, mobIdx + 800));
}
