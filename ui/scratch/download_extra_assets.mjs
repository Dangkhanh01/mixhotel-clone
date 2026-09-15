import fs from 'fs';
import path from 'path';

const assets = [
  '/tassets/images/bgFooter.webp',
  '/tassets/images/face.png',
  '/tassets/images/bo-cong-thuong_2.webp',
  '/uploads/images/phone_item_2.svg',
  '/uploads/images/phone_item.svg',
  '/uploads/images/24-icon-2.webp',
  '/uploads/images/24-icon-3.webp',
  '/storage/wn/qx/wnqxsxdir8bo8mqqguhb8n9mrsbr_mix_s_s-7954-2_(1)_(1).webp'
];

async function downloadAsset(relUrl) {
  const fullUrl = `https://mixhotel.vn${relUrl}`;
  const filename = path.basename(relUrl);
  const dest = path.join('public/images', filename);
  try {
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Downloaded ${relUrl} -> public/images/${filename} (${buffer.byteLength} bytes)`);
    } else {
      console.log(`Failed ${relUrl}: status ${res.status}`);
    }
  } catch (err) {
    console.error(`Error downloading ${relUrl}:`, err.message);
  }
}

async function main() {
  for (const a of assets) {
    await downloadAsset(a);
  }
}

main();
