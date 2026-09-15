import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');
const faLinks = [...html.matchAll(/font-awesome[^\s"']+/gi)].map(m => m[0]);
console.log('Font Awesome links:', faLinks);
