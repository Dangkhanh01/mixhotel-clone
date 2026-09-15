import fs from 'fs';
import path from 'path';
import https from 'https';

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const css1Url = 'https://mixhotel.vn/assets/application-68d7a4117d5586ca09f43f5d8ba052c5b5c0040454620c7345cbaf855aef36c7.css';
  const css2Url = 'https://mixhotel.vn/assets/theme.default-5c65fdcb52a017e1daf763e79f23a98d8aa222f9c7bcda30b06243b232685942.css';

  console.log('Fetching CSS files...');
  const [css1, css2] = await Promise.all([fetchText(css1Url), fetchText(css2Url)]);

  fs.writeFileSync('scratch/remote_app.css', css1, 'utf8');
  fs.writeFileSync('scratch/remote_theme.css', css2, 'utf8');
  console.log('Saved remote CSS files: css1 =', css1.length, 'bytes, css2 =', css2.length, 'bytes');

  const keywords = [
    'cateMixHero',
    'cateBranchSection',
    'mixCatePrice',
    'mixCateBranch',
    'mixCateVideo',
    'mixFreePerks',
    'cateEventDecor',
    'cateBookingSteps',
    'cateConsultForm',
    'cateFaq',
    'catePremiumCta',
    'content-frame-section'
  ];

  keywords.forEach(kw => {
    const in1 = css1.includes(kw);
    const in2 = css2.includes(kw);
    console.log(`Keyword "${kw}": css1=${in1}, css2=${in2}`);
  });
}

run();
