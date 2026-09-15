import fs from 'fs';

let css = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');

// 1. a tag color overrides
css = css.replace(/a\s*\{\s*color\s*:\s*black\s*\}/gi, 'a{color:inherit}');
css = css.replace(/a\s*\{\s*text-decoration\s*:\s*none\s*;\s*color\s*:\s*#333333\s*;\s*transition\s*:\s*all\s*0\.25s\s*\}/gi, 'a{text-decoration:none;color:inherit;transition:all 0.25s}');
css = css.replace(/a\s*\{\s*font-size\s*:\s*16px\s*;\s*overflow-wrap\s*:\s*break-word\s*;\s*color\s*:\s*#0000ff\s*;\s*font-weight\s*:\s*inherit\s*\}/gi, 'a{font-size:inherit;overflow-wrap:break-word;color:inherit;font-weight:inherit}');

// 2. Specific selectors setting black/dark colors
css = css.replace(/nav\.navbar\s+li\s+a\.nav-link\s*\{([^}]*?)color\s*:\s*#333\s*!important/gi, 'nav.navbar li a.nav-link{$1color:#fff8ec !important');
css = css.replace(/\.colorBlack\s*\{[^}]*color\s*:\s*#000000\s*!important[^}]*\}/gi, '.colorBlack{color:inherit !important}');
css = css.replace(/\.color-black\s*\{[^}]*color\s*:\s*black[^}]*\}/gi, '.color-black{color:inherit}');
css = css.replace(/footer\s+\.loaidichvu\s+p\s*\{([^}]*?)color\s*:\s*black/gi, 'footer .loaidichvu p{$1color:#fff8ec');
css = css.replace(/#footerTico\s+a\s*\{([^}]*?)color\s*:\s*#333333/gi, '#footerTico a{$1color:#fff8ec');
css = css.replace(/#header-thankyou\s+h1\s*\{([^}]*?)color\s*:\s*black/gi, '#header-thankyou h1{$1color:#fff8ec');

// 3. Ensure global link styles are clean and high-contrast
const globalOverrides = `
/* Global Luxury Contrast Safeguards */
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: #ffe2a0;
}
p, span, li, dt, dd, td, th {
  color: inherit;
}
`;

css += globalOverrides;

fs.writeFileSync('src/app/mixhotel-luxury.css', css);
console.log('Successfully updated mixhotel-luxury.css');
