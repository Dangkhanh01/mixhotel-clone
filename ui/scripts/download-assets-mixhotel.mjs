import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../public/images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  // Brand & Navigation
  { url: 'https://mixhotel.vn/uploads/images/mix-boutique-logo.png', name: 'logo.png' },
  { url: 'https://mixhotel.vn/uploads/images/24-icon-2.webp', name: 'icon-messenger.webp' },
  { url: 'https://mixhotel.vn/uploads/images/24-icon-3.webp', name: 'icon-zalo.webp' },
  { url: 'https://mixhotel.vn/uploads/images/phone_item_2.svg', name: 'icon-phone-bar.svg' },
  { url: 'https://mixhotel.vn/uploads/images/bars_item.svg', name: 'icon-bars.svg' },
  { url: 'https://mixhotel.vn/uploads/images/u1214.svg', name: 'icon-home.svg' },
  { url: 'https://mixhotel.vn/uploads/images/messenger_2.svg', name: 'icon-messenger-bottom.svg' },
  { url: 'https://mixhotel.vn/uploads/images/phone_item.svg', name: 'icon-phone-bottom.svg' },
  { url: 'https://mixhotel.vn/uploads/images/zalo_2.png', name: 'icon-zalo-bottom.png' },
  { url: 'https://mixhotel.vn/uploads/images/u1351.svg', name: 'icon-sms.svg' },

  // Hero & Highlights
  { url: 'https://mixhotel.vn/storage/wn/qx/wnqxsxdir8bo8mqqguhb8n9mrsbr_mix_s_s-7954-2_(1)_(1).webp', name: 'hero-bg.webp' },
  { url: 'https://mixhotel.vn/tassets/images/thu-vien-1.webp', name: 'thu-vien-1.webp' },
  { url: 'https://mixhotel.vn/tassets/images/thu-vien-2.webp', name: 'thu-vien-2.webp' },
  { url: 'https://mixhotel.vn/tassets/images/thu-vien-3.webp', name: 'thu-vien-3.webp' },

  // Real Photos Grid
  { url: 'https://mixhotel.vn/storage/sb/xo/sbxojtunz2mqq5su7x0e0e1nil1q_thu-vien-1.webp', name: 'photo-stage-featured.webp' },
  { url: 'https://mixhotel.vn/storage/zh/vo/zhvo6h45pt27kgk8zpapzilu0ehl_mix_s_s-8246-2_(1).webp', name: 'photo-tile-bdsm.webp' },
  { url: 'https://mixhotel.vn/storage/fh/yv/fhyva2dvrzhr1pp9iteny6r9vx4q_image_(2)_(1).webp', name: 'photo-tile-bathtub.webp' },
  { url: 'https://mixhotel.vn/storage/qy/kb/qykb3d0000dmkgegkk5gat06pwrl_thu-vien-2.jpg', name: 'photo-tile-cosplay.jpg' },
  { url: 'https://mixhotel.vn/storage/tv/78/tv78z3fjwfm7jlyc535lefojs0p7_mix_s_s-8255-2_(1).webp', name: 'photo-tile-tantra.webp' },
  { url: 'https://mixhotel.vn/storage/r4/5k/r45k8p7vt1bxgxv5h7f33cjt2ntn_mix_s_s-8251-2_(1).webp', name: 'photo-tile-netflix.webp' },

  // Concept Rooms
  // Karma
  { url: 'https://mixhotel.vn/storage/e8/fo/e8fo0t2jei3ooib6yy7h4x2zigdc_302-karma.jpg', name: 'room-302-karma.jpg' },
  { url: 'https://mixhotel.vn/storage/ns/e7/nse7li472itq3wab4xxiu4lfup5i_image_(1).webp', name: 'karma-thumb-1.webp' },
  { url: 'https://mixhotel.vn/storage/rg/9p/rg9pnmv9cdwv6lndvhjm1furoalg_4tffhpiejoaahapj0eduagvb85k1_karma-1.webp', name: 'karma-thumb-2.webp' },
  // Katana
  { url: 'https://mixhotel.vn/storage/q2/a6/q2a6jjsum90li8gzayh55emvp9uw_401-katana.jpg', name: 'room-401-katana.jpg' },
  { url: 'https://mixhotel.vn/storage/0f/sh/0fshlfc8mhbgulirx669dykxf563_image_(3).webp', name: 'katana-thumb-1.webp' },
  { url: 'https://mixhotel.vn/storage/py/2e/py2e8hhdjufwla5quzwnch7s1zfb_3r8e38225rdl13awoiffcyzh4l58_katana_(7).jpg', name: 'katana-thumb-2.jpg' },
  // Amora
  { url: 'https://mixhotel.vn/storage/1e/ak/1eakhk4fdk9spyiu1er2dch50zd7_402-amora.jpg', name: 'room-402-amora.jpg' },
  { url: 'https://mixhotel.vn/storage/7t/gf/7tgf82c7inahko34xg79ysi2zinc_image_(4).webp', name: 'amora-thumb-1.webp' },
  { url: 'https://mixhotel.vn/storage/ga/aq/gaaq0jly7hci0se2vfmoollb6ueq_2g49rcjn4g8csv4p3uwyaxldomum_amora-2.webp', name: 'amora-thumb-2.webp' },
  // Cloud Nine
  { url: 'https://mixhotel.vn/storage/qf/ci/qfcivbquyw6bbxs9vjeufbti5k4t_469-moonlit-love.jpg', name: 'room-469-cloudnine.jpg' },
  { url: 'https://mixhotel.vn/storage/3s/z7/3sz7xg8qjbc60enfy41dttp7c9il_PMC_90_(8)_(1).webp', name: 'cloudnine-thumb-1.webp' },
  { url: 'https://mixhotel.vn/storage/l2/bv/l2bvumn3ffzt4erivwdkwqe8cf0e_PMC_90_(8).webp', name: 'cloudnine-thumb-2.webp' },
  { url: 'https://mixhotel.vn/storage/40/3m/403mcfovounrplfnelhr6f77l3zi_xrh8ev6x79vb67mh6ex5ldimuwd0_moonlit-love_(23).jpg', name: 'cloudnine-thumb-3.jpg' },

  // Branches
  { url: 'https://mixhotel.vn/storage/y3/b5/y3b5660lbzhk6lqokchsfa3cyfs6_mix_s_s-8289-2_(1).webp', name: 'branch-huynhthuckhang.webp' },
  { url: 'https://mixhotel.vn/storage/oa/v9/oav9oeviii99cyubnsbl5wc30oob_image_(3)_(1).webp', name: 'branch-dangtiendong.webp' },
  { url: 'https://mixhotel.vn/storage/cs/a1/csa118f40zu9grmhpuzcjsbrkxjp_mix_s_s-8452-2_(1).webp', name: 'branch-phucla.webp' },

  // Events & Decor
  { url: 'https://mixhotel.vn/tassets/images/home-5.jpg', name: 'event-1.jpg' },
  { url: 'https://mixhotel.vn/tassets/images/home-6.jpg', name: 'event-2.jpg' },
  { url: 'https://mixhotel.vn/tassets/images/home-7.jpg', name: 'event-3.jpg' },
  { url: 'https://mixhotel.vn/tassets/images/home-8.jpg', name: 'event-4.jpg' },

  // Final CTA & Footer
  { url: 'https://mixhotel.vn/tassets/images/cuoi-trang.jpg', name: 'final-cta-bg.jpg' },
  { url: 'https://mixhotel.vn/tassets/images/bo-cong-thuong_2.webp', name: 'bo-cong-thuong.webp' },
  { url: 'https://mixhotel.vn/tassets/images/face.png', name: 'facebook-preview.png' },
  { url: 'https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=4bfc3c19-8433-472d-9f3a-98a480e56499', name: 'dmca-badge.png' },

  // YouTube Shorts & Channel Thumbs
  { url: 'https://img.youtube.com/vi/qyeqmaNJYbY/hqdefault.jpg', name: 'yt-short-1.jpg' },
  { url: 'https://img.youtube.com/vi/_3pSDfR8Ccw/hqdefault.jpg', name: 'yt-short-2.jpg' },
  { url: 'https://img.youtube.com/vi/Ts4seBpirOA/hqdefault.jpg', name: 'yt-channel.jpg' }
];

async function downloadAsset(asset) {
  const filePath = path.join(targetDir, asset.name);
  if (fs.existsSync(filePath)) {
    console.log(`[SKIP] Already exists: ${asset.name}`);
    return;
  }
  try {
    const res = await fetch(asset.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`[FAILED] ${asset.name}: HTTP ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`[OK] Downloaded: ${asset.name} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`[ERROR] ${asset.name}:`, err.message);
  }
}

async function run() {
  console.log(`Starting download of ${assets.length} assets...`);
  for (let i = 0; i < assets.length; i += 4) {
    const chunk = assets.slice(i, i + 4);
    await Promise.all(chunk.map(downloadAsset));
  }
  console.log('Finished downloading assets!');
}

run();
