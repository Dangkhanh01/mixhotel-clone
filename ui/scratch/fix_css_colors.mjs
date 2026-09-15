import fs from 'fs';

let css = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');

// Replace the harmful global black text rule
const badRule = 'h1,h2,h3,h4,h5,h6,p,li,i{font-size:16px;line-height:1.5;margin-bottom:8px;color:#000000;font-weight:normal;font-style:normal;transition:0.3s}a{transition:all 0.3s;color:#000000;font-size:16px;line-height:1.5;font-weight:normal}';
const goodRule = 'h1,h2,h3,h4,h5,h6,p,li,i{margin-bottom:8px;color:inherit;font-weight:inherit;font-style:normal}a{color:inherit;text-decoration:none}';

if (css.includes(badRule)) {
  css = css.replace(badRule, goodRule);
  console.log('Replaced badRule successfully');
} else {
  console.log('badRule not found directly, checking partial matches...');
  css = css.replace(/h1,h2,h3,h4,h5,h6,p,li,i\{[^}]*color:#000000[^}]*\}/g, 'h1,h2,h3,h4,h5,h6,p,li,i{margin-bottom:8px;color:inherit}');
  css = css.replace(/a\{transition:all 0\.3s;color:#000000;font-size:16px;line-height:1\.5;font-weight:normal\}/g, 'a{color:inherit;text-decoration:none}');
}

// Ensure body has proper base colors and fonts
const bodyOverride = `
/* Luxury Dark Theme Default Overrides */
body {
  color: #fff8ec;
  background-color: #070503;
}
h1, h2, h3, h4, h5, h6 {
  color: #fff8ec;
}
p {
  color: rgba(255, 248, 236, 0.85);
}
`;

css += bodyOverride;

fs.writeFileSync('src/app/mixhotel-luxury.css', css);
console.log('Updated src/app/mixhotel-luxury.css successfully');
