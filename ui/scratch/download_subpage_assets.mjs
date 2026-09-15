import fs from 'fs';
import path from 'path';

const urls = [
  '/storage/3j/6q/3j6qj66712eqg9d2t0ssjjuxk6mp_mixhotel-gt-.webp',
  '/storage/id/tx/idtx21qzhicjbkawl6xz3v6znl8c_wifi.webp',
  '/storage/25/iy/25iyonrnz1ikuu1lwh6tam71acts_bon-tam.webp',
  '/storage/62/32/62323sas9x38yhas4ml448e1yxcs_cosplay.webp',
  '/storage/w5/hh/w5hhci9jm0v2ucpye4g6hew7xtsz_tvha-1.webp',
  '/storage/q9/1y/q91y4poy5kvbsa4x4dcv4rpav7pd_tvha-2.webp',
  '/storage/30/n5/30n53marz0uriv4y890u1x7mzf8d_tvha-3.webp',
  '/storage/b8/6a/b86a4sn0f7ruuiqin80he12u0zrs_tvha-4.webp',
  '/storage/7s/27/7s27z4i0kyzca79b97u1vc6xt2r6_tvha-5.webp',
  '/storage/6p/ze/6pzetgbolp6l78ajmzq2rrswq1zz_tvha-6.webp',
  '/storage/qf/ci/qfcivbquyw6bbxs9vjeufbti5k4t_469-moonlit-love.jpg',
  '/storage/e8/fo/e8fo0t2jei3ooib6yy7h4x2zigdc_302-karma.jpg',
  '/storage/63/r7/63r7hvzdxw4kznzy14srvy4fkwdo_202-galaxy.jpg',
  '/storage/qz/cz/qzczrs4c7tj3qgua5wk32mkjrir5_khach-san-vintage.jpg',
  '/storage/1q/vc/1qvcxvbt7i0occc8phpve9ikqtdd_khach-san-phong-cach-tropical.jpg',
  '/storage/df/gi/dfgix2x3g41siqrzt6z6tg3eaqrn_khach-san-phong-cach-indochine.jpg'
];

async function downloadOne(relUrl) {
  const fullUrl = `https://mixhotel.vn${relUrl}`;
  const filename = path.basename(relUrl);
  const dest = path.join('public/images', filename);
  if (fs.existsSync(dest)) return;
  try {
    const res = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Downloaded ${filename} (${buf.byteLength} bytes)`);
    } else {
      console.log(`Failed ${filename}: ${res.status}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function main() {
  for (const u of urls) await downloadOne(u);
}

main();
