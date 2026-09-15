import fs from 'fs';

const theme = fs.readFileSync('scratch/theme_full.css', 'utf8');
const fontFaces = [...theme.matchAll(/@font-face\s*\{[^}]+\}/gi)].map(m => m[0]);
console.log('Font faces count:', fontFaces.length);
fontFaces.forEach(f => console.log(f));
