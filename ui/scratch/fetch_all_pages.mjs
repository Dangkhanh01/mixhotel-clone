import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'home', url: 'https://mixhotel.vn/' },
  { name: 'gioi-thieu', url: 'https://mixhotel.vn/gioi-thieu/' },
  { name: 'khach-san-tinh-yeu', url: 'https://mixhotel.vn/khach-san-tinh-yeu/' },
  { name: 'gallery', url: 'https://mixhotel.vn/gallery/' },
  { name: 'tin-tuc', url: 'https://mixhotel.vn/tin-tuc/' },
  { name: 'su-kien', url: 'https://mixhotel.vn/su-kien/' },
  { name: 'chinh-sach-thanh-toan', url: 'https://mixhotel.vn/chinh-sach-thanh-toan/' },
  { name: 'chinh-sach-bao-mat-thong-tin', url: 'https://mixhotel.vn/chinh-sach-bao-mat-thong-tin/' },
  { name: 'chinh-sach-dat-tra-phong', url: 'https://mixhotel.vn/chinh-sach-dat-tra-phong/' },
  { name: 'lien-he', url: 'https://mixhotel.vn/lien-he/' }
];

async function fetchPage(p) {
  try {
    const res = await fetch(p.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) {
      console.log(`Failed ${p.name}: ${res.status}`);
      return;
    }
    const html = await res.text();
    const outDir = path.resolve('scratch/live_pages');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, `${p.name}.html`), html);
    console.log(`Fetched ${p.name}: ${html.length} chars`);

    // Extract main sections / classes
    const mainMatches = [...html.matchAll(/<(?:main|section|div)[^>]+class=["']([^"']*(?:mix|page|content|banner|layout|detail|article|blog|gallery|contact)[^"']*)["']/gi)].map(m => m[1]);
    console.log(`Key classes in ${p.name}:`, [...new Set(mainMatches)].slice(0, 10));
  } catch (err) {
    console.error(`Error fetching ${p.name}:`, err.message);
  }
}

async function main() {
  for (const p of pages) {
    await fetchPage(p);
  }
}

main();
