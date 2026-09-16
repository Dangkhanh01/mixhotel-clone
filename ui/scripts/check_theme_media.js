const fs = require('fs');

const themeCss = fs.readFileSync('scratch/remote_theme.css', 'utf8');

// Find all occurrences of .mixRoomPremiumBlock in remote_theme.css
let pos = 0;
while (true) {
  const idx = themeCss.indexOf('.mixRoomPremiumBlock', pos);
  if (idx === -1) break;
  // Look backwards for @media
  const before = themeCss.substring(Math.max(0, idx - 500), idx);
  const mediaIdx = before.lastIndexOf('@media');
  let mediaContext = 'ROOT (desktop)';
  if (mediaIdx !== -1) {
    const mediaHeader = before.substring(mediaIdx, before.indexOf('{', mediaIdx) + 1);
    // Check if braces balance
    const afterMedia = before.substring(mediaIdx);
    const openBraces = (afterMedia.match(/\{/g) || []).length;
    const closeBraces = (afterMedia.match(/\}/g) || []).length;
    if (openBraces > closeBraces) {
      mediaContext = mediaHeader.trim();
    }
  }
  const rule = themeCss.substring(idx, themeCss.indexOf('}', idx) + 1);
  console.log(`Context: ${mediaContext}`);
  console.log(`Rule: ${rule.slice(0, 150)}\n`);
  pos = idx + 20;
}
