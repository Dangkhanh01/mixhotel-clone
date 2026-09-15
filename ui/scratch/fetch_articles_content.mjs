import fs from 'fs';
import path from 'path';

const slugs = [
  'khach-san-vintage',
  'khach-san-phong-cach-tropical',
  'khach-san-phong-cach-indochine',
  'khach-san-gan-lang-bac',
  'so-sanh-khach-san',
  'bang-noi-quy-khach-san',
  'khach-san-gan-pho-co',
  'khach-san-gan-ho-guom'
];

async function run() {
  const dir = 'scratch/scraped_articles';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const slug of slugs) {
    try {
      console.log('Fetching:', slug);
      const res = await fetch(`https://mixhotel.vn/${slug}/`);
      if (!res.ok) {
        console.error('Failed:', slug, res.status);
        continue;
      }
      const html = await res.text();
      fs.writeFileSync(path.join(dir, `${slug}.html`), html, 'utf8');
      console.log('Saved:', slug, html.length, 'bytes');
    } catch (err) {
      console.error('Error fetching', slug, err.message);
    }
  }
}

run();
