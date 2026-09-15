import fs from 'fs';

const app = fs.readFileSync('scratch/application.css', 'utf8');
const fontFaces = [...app.matchAll(/@font-face\s*\{[^}]+\}/gi)].map(m => m[0]);
console.log('App CSS font faces count:', fontFaces.length);
fontFaces.forEach(f => console.log(f.slice(0, 200)));
