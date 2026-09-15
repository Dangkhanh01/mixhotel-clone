import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');
const fontLinks = [...html.matchAll(/fonts\.googleapis\.com[^\s"']+/gi)].map(m => m[0]);
console.log('Google Fonts in HTML:', fontLinks);

const theme = fs.readFileSync('scratch/theme_full.css', 'utf8');
const fontFamilies = [...theme.matchAll(/font-family:\s*([^;}]+)/gi)].map(m => m[1].trim());
console.log('Unique font families in theme:', [...new Set(fontFamilies)]);
