const fs = require('fs');

const css = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');
const lines = css.split('\n');

console.log('Total lines in mixhotel-luxury.css:', lines.length);

// Let's find where grid-template-columns: 1fr is defined for mixRoomPremiumBlock
const matches = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('.mixRoomPremiumBlock') && lines[i].includes('grid-template-columns:1fr')) {
    matches.push({ line: i + 1, content: lines[i] });
  }
}
console.log('Matches:', matches);
