import fs from 'fs';

const theme = fs.readFileSync('scratch/theme_full.css', 'utf8');
const contactBtnIdx = theme.indexOf('#contactBtnBlock');
console.log('#contactBtnBlock in theme:', contactBtnIdx !== -1);
if (contactBtnIdx !== -1) {
  console.log(theme.slice(contactBtnIdx, contactBtnIdx + 600));
}

const appCss = fs.readFileSync('scratch/application.css', 'utf8');
const contactAppIdx = appCss.indexOf('#contactBtnBlock');
console.log('#contactBtnBlock in application.css:', contactAppIdx !== -1);
if (contactAppIdx !== -1) {
  console.log(appCss.slice(contactAppIdx, contactAppIdx + 800));
}
