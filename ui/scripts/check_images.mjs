import fs from 'fs';
import path from 'path';

const files = [
  'src/app/khach-san-tinh-yeu/page.tsx',
  'src/app/gallery/page.tsx',
  'src/app/tin-tuc/page.tsx',
  'src/app/su-kien/page.tsx'
];

files.forEach(f => {
  console.log('=== Checking:', f);
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map(m => m[1]);
  const unique = [...new Set(matches)];
  unique.forEach(img => {
    const diskPath = path.join('public', img.replace(/^\//, ''));
    const exists = fs.existsSync(diskPath);
    console.log((exists ? '  [OK] ' : '  [MISSING] ') + img + ' -> ' + diskPath);
  });
});
