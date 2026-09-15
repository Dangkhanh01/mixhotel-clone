import fs from 'fs';
import path from 'path';

const pages = [
  'gioi-thieu',
  'khach-san-tinh-yeu',
  'gallery',
  'tin-tuc',
  'chinh-sach-thanh-toan',
  'chinh-sach-bao-mat-thong-tin',
  'chinh-sach-dat-tra-phong',
  'lien-he'
];

for (const p of pages) {
  const filePath = `scratch/live_pages/${p}.html`;
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');

  // Strip header and footer to see what is in between
  let content = html;
  const menuEnd = html.indexOf('</header>');
  const navEnd = html.indexOf('mixPremiumMenuWrap');
  // Find where content starts
  const mainMatch = html.match(/<(?:main|div|section)[^>]+class=["']([^"']*(?:content|main|wrap|container|mix)[^"']*)["']/i);

  // Let's find all section tags or top-level containers inside body
  const bodyStart = html.indexOf('<body');
  const bodyContent = html.slice(bodyStart);
  
  // Find h1, title, breadcrumbs, and main classes
  const titles = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const classes = [...html.matchAll(/class=["']([a-zA-Z0-9_-]+(?:Content|Detail|Wrap|List|Grid|Hero|Head|Banner|Section|Box)[a-zA-Z0-9_-]*)["']/gi)].map(m => m[1]);

  console.log(`\n================== PAGE: ${p} ==================`);
  console.log(`Titles:`, titles.slice(0, 5));
  console.log(`Key container classes:`, [...new Set(classes)].slice(0, 10));
}
