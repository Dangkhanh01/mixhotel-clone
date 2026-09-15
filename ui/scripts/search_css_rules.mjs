import fs from 'fs';

const cssFiles = ['scratch/remote_app.css', 'scratch/remote_theme.css'];
for (const f of cssFiles) {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    ['gold-rectangle', 'titleBlock_1', 'wrapSubcateBlock_1', 'subcateBlock_1', 'galerryMix', 'mixRoomShowcase', 'mixRoomPremium', 'mixDetailHero', 'detailConceptPremium'].forEach(term => {
      const regex = new RegExp(`[^{}]*\\.${term}[^{}]*\\{[^}]*\\}`, 'g');
      const matches = content.match(regex);
      if (matches) {
        console.log(`Found ${matches.length} matches for .${term} in ${f}:`);
        console.log(matches.slice(0, 2).join('\n'));
      }
    });
  }
}
