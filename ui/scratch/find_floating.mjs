import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');

// Search for floating bar or right-side buttons
const matches = [...html.matchAll(/class=["']([^"']*(?:widget|contact|float|mess|zalo|hotline)[^"']*)["']/gi)].map(m => m[1]);
console.log('Floating/contact classes found:');
console.log([...new Set(matches)]);

// Let's find the exact markup for the right-side floating contact bar
const rightBarMatch = html.match(/<div[^>]*class=["'][^"']*(?:messengerBlock|zaloBlock|callContactLocate|phonePart)[^"']*["'][\s\S]*?<\/div>/gi);
if (rightBarMatch) {
  console.log('Found right bar match snippet:');
  console.log(rightBarMatch.slice(0, 5));
}

// Let's find any element containing 'zaloBlock' or 'messengerBlock'
const blockMatch = html.match(/<div[^>]*class=["'][^"']*messengerBlock[\s\S]*?<\/div>\s*<\/div>/gi);
if (blockMatch) {
  console.log('messenger block parent:');
  console.log(blockMatch[0]);
}

// Let's search for "zalo" in html
const zaloIdx = html.indexOf('zaloBlock');
if (zaloIdx !== -1) {
  console.log('Surrounding HTML of zaloBlock:');
  console.log(html.slice(zaloIdx - 300, zaloIdx + 700));
}
