import fs from 'fs';
import path from 'path';

const cssFiles = ['src/app/mixhotel-luxury.css', 'src/app/globals.css'];
for (const cf of cssFiles) {
  if (!fs.existsSync(cf)) continue;
  const css = fs.readFileSync(cf, 'utf8');
  const urls = [...css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map(m => m[2]);
  console.log(`Auditing ${urls.length} URLs in ${cf}:`);
  for (const u of urls) {
    if (u.startsWith('data:') || u.startsWith('http://') || u.startsWith('https://')) continue;
    const cleanUrl = u.split('?')[0].split('#')[0];
    const diskPath = cleanUrl.startsWith('/') ? path.join('public', cleanUrl.slice(1)) : path.join('public', cleanUrl);
    const exists = fs.existsSync(diskPath);
    console.log((exists ? '  [OK] ' : '  [MISSING] ') + u + ' -> ' + diskPath);
  }
}
