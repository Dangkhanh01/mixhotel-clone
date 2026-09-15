import fs from 'fs';

const theme = fs.readFileSync('scratch/theme_full.css', 'utf8');
const urls = [...theme.matchAll(/url\(([^)]+)\)/gi)].map(m => m[1].replace(/['"]/g, '').trim());
console.log('All unique URLs in theme CSS:', [...new Set(urls)]);
