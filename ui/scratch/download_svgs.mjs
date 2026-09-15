import fs from 'fs';
import path from 'path';

const svgs = [
  '/uploads/images/bars_item.svg',
  '/uploads/images/u1214.svg',
  '/uploads/images/mix-boutique-logo.png'
];

async function downloadSvg(relUrl) {
  const fullUrl = `https://mixhotel.vn${relUrl}`;
  const filename = path.basename(relUrl);
  const dest = path.join('public/images', filename);
  try {
    const res = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Downloaded ${relUrl} -> public/images/${filename}`);
    } else {
      console.log(`Failed ${relUrl}: status ${res.status}`);
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function main() {
  for (const s of svgs) await downloadSvg(s);
}

main();
