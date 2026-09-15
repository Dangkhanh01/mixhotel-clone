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

const targetDir = 'public/images/articles';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = {};

async function downloadImage(url, localFilename) {
  const fullUrl = url.startsWith('http') ? url : `https://mixhotel.vn${url}`;
  const targetPath = path.join(targetDir, localFilename);
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 1000) {
    console.log('Already exists:', localFilename);
    return `/images/articles/${localFilename}`;
  }

  try {
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.error('Failed to download:', fullUrl, res.status);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log('Downloaded:', localFilename, buffer.length, 'bytes');
    return `/images/articles/${localFilename}`;
  } catch (err) {
    console.error('Error downloading:', fullUrl, err.message);
    return null;
  }
}

async function run() {
  for (const slug of slugs) {
    const htmlFile = path.join('scratch/scraped_articles', `${slug}.html`);
    if (!fs.existsSync(htmlFile)) continue;
    const html = fs.readFileSync(htmlFile, 'utf8');

    const imgRegex = /src=['"]([^'"]*(?:storage|\/uploads|\.webp|\.jpg|\.png)[^'"]*)['"]/gi;
    let match;
    let idx = 1;
    while ((match = imgRegex.exec(html)) !== null) {
      const src = match[1];
      if (src.includes('logo') || src.includes('icon') || src.includes('svg')) continue;
      if (mapping[src]) continue;

      const ext = path.extname(src.split('?')[0]) || '.webp';
      const cleanName = `${slug}-${idx}${ext}`;
      const localPath = await downloadImage(src, cleanName);
      if (localPath) {
        mapping[src] = localPath;
        idx++;
      }
    }
  }

  fs.writeFileSync('scratch/image_mapping.json', JSON.stringify(mapping, null, 2), 'utf8');
  console.log('Total images downloaded and mapped:', Object.keys(mapping).length);
}

run();
