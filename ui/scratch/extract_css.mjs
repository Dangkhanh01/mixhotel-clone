import fs from 'node:fs';

async function run() {
  const url = 'https://mixhotel.vn/assets/theme.default-5c65fdcb52a017e1daf763e79f23a98d8aa222f9c7bcda30b06243b232685942.css';
  const res = await fetch(url);
  const text = await res.text();
  
  // Save full css
  fs.writeFileSync('scratch/theme_full.css', text);
  console.log('Saved theme_full.css, length:', text.length);

  // Find where .mixLuxury starts
  const idx = text.indexOf('.mixLuxury');
  console.log('Index of .mixLuxury:', idx);
  if (idx !== -1) {
    const luxuryCss = text.slice(idx);
    fs.writeFileSync('scratch/mixhotel_luxury.css', luxuryCss);
    console.log('Saved mixhotel_luxury.css, length:', luxuryCss.length);
  }

  // Also check variables like --mix-gold
  const varIdx = text.indexOf('--mix-');
  if (varIdx !== -1) {
    console.log('Variables snippet:');
    console.log(text.slice(varIdx - 50, varIdx + 300));
  }
}
run();
