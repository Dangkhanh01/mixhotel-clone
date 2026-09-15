import fs from 'fs';
import path from 'path';

const remaining = [
  { name: 'chinh-sach-thanh-toan', url: 'https://mixhotel.vn/chinh-sach-thanh-toan/' },
  { name: 'chinh-sach-bao-mat-thong-tin', url: 'https://mixhotel.vn/chinh-sach-bao-mat-thong-tin/' },
  { name: 'chinh-sach-dat-tra-phong', url: 'https://mixhotel.vn/chinh-sach-dat-tra-phong/' },
  { name: 'lien-he', url: 'https://mixhotel.vn/lien-he/' },
  { name: 'mix-boutique-premium-hotel', url: 'https://mixhotel.vn/mix-boutique-premium-hotel/' }
];

async function fetchOne(item) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(item.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    clearTimeout(timeout);
    if (!res.ok) {
      console.log(`Failed ${item.name}: ${res.status}`);
      return;
    }
    const html = await res.text();
    const outDir = path.resolve('scratch/live_pages');
    fs.writeFileSync(path.join(outDir, `${item.name}.html`), html);
    console.log(`Saved ${item.name}: ${html.length} chars`);
  } catch (err) {
    console.log(`Error ${item.name}:`, err.message);
  }
}

async function main() {
  for (const item of remaining) {
    await fetchOne(item);
  }
}

main();
