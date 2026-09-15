import fs from 'fs';

const html = fs.readFileSync('scratch/live_page.html', 'utf8');
const idx = html.indexOf('messengerBlock');
console.log('Parent container of messengerBlock:');
console.log(html.slice(idx - 250, idx + 100));

// Also check popupAskContact markup
const modalIdx = html.indexOf('popupAskContact');
if (modalIdx !== -1) {
  console.log('Modal popup HTML:');
  console.log(html.slice(modalIdx - 100, modalIdx + 1200));
}
