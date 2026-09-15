import fs from 'fs';

async function main() {
  const luxury = fs.readFileSync('scratch_mixhotel_luxury.css', 'utf8');
  console.log('In luxury.css:', luxury.includes('mixFooterPremium'));

  const res = await fetch('https://mixhotel.vn', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  fs.writeFileSync('scratch/live_page.html', html);

  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  console.log('Inline style tags count:', styles.length);
  let totalInlineCss = '';
  styles.forEach((s, idx) => {
    totalInlineCss += `\n/* STYLE TAG #${idx} */\n` + s;
    if (s.includes('mixFooterPremium')) {
      console.log(`Found mixFooterPremium in style tag #${idx}, length: ${s.length}`);
    }
    if (s.includes('mixPremiumMenu')) {
      console.log(`Found mixPremiumMenu in style tag #${idx}`);
    }
  });
  fs.writeFileSync('scratch/live_inline_styles.css', totalInlineCss);
  console.log('Saved scratch/live_inline_styles.css, size:', totalInlineCss.length);
}

main().catch(console.error);
