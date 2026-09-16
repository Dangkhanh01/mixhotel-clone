const fs = require('fs');
const postcss = require('postcss');

const targetSelectors = [
  'galerryMix',
  'titleBlock_1',
  'wrapSubcateBlock_1',
  'subcateBlock_1',
  'gold-rectangle',
  'slideshow',
  'subcateName',
  'mixDetailHero',
  'roomYoutubeDetail',
  'roomImageDetailGallery',
  'detailConceptPremium',
  'detailPricePremium',
  'detailOccasionPremium',
  'detailBookingPremium',
  'detailMemorySection',
  'detailFaqSection',
  'detailBookingCtaSection',
  'mixBoutiqueHero',
  'mixRoomShowcase',
  'mixRoomPremium',
  'mixVideoPremium',
  'mixPricePremium',
  'mixCateBooking',
  'mixCateGallery',
  'mixCateDecor',
  'mixCatePolicy',
  'mixCatePremium',
  'mixCateFaq',
  'catePremiumCta',
  'content-frame'
];

function isTargetRule(selector) {
  return targetSelectors.some(target => selector.includes('.' + target));
}

// Start with clean base mixhotel-luxury.css before the bad append
// Let's see what base luxury css was: everything before "GALLERY & ROOM DETAIL & BRANCH CUSTOM LUXURY STYLES"
const currentCss = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');
const baseEndIdx = currentCss.indexOf('/* ================================================================\n   GALLERY & ROOM DETAIL & BRANCH CUSTOM LUXURY STYLES');
let baseCss = baseEndIdx !== -1 ? currentCss.substring(0, baseEndIdx).trim() : currentCss;

// If baseCss still has flattened .mixRoomPremiumBlock, let's find the original boundary
const firstAppendIdx = baseCss.indexOf('.mixRoomPremiumBlock { display:grid');
if (firstAppendIdx !== -1) {
  baseCss = baseCss.substring(0, firstAppendIdx).trim();
}
const firstAppendIdx2 = baseCss.indexOf('.mixRoomPremium .mixRoomPremiumBlock{display:grid');
if (firstAppendIdx2 !== -1) {
  baseCss = baseCss.substring(0, firstAppendIdx2).trim();
}

console.log('Base CSS length:', baseCss.length);

function extractFromSource(sourceFile) {
  const cssText = fs.readFileSync(sourceFile, 'utf8');
  const root = postcss.parse(cssText);
  const newRoot = postcss.root();

  root.walk(node => {
    if (node.type === 'rule' && isTargetRule(node.selector)) {
      if (node.parent && node.parent.type === 'atrule') {
        const atRule = node.parent;
        // Check if we already have this atrule in newRoot
        let targetAtRule = newRoot.nodes.find(
          n => n.type === 'atrule' && n.name === atRule.name && n.params === atRule.params
        );
        if (!targetAtRule) {
          targetAtRule = postcss.atRule({ name: atRule.name, params: atRule.params });
          newRoot.append(targetAtRule);
        }
        targetAtRule.append(node.clone());
      } else {
        newRoot.append(node.clone());
      }
    }
  });

  return newRoot.toString();
}

const themeExtracted = extractFromSource('scratch/remote_theme.css');
const appExtracted = extractFromSource('scratch/remote_app.css');

console.log('Theme extracted length:', themeExtracted.length);
console.log('App extracted length:', appExtracted.length);

// Custom contrast and polish overrides
const customPolish = `
/* ================================================================
   PERFECT CONTRAST & RESPONSIVENESS OVERRIDES
   ================================================================ */
.mixRoomPremium {
  padding: 80px 0;
  position: relative;
  background: #0c080a;
}
.mixRoomPremium.mixRoomPremiumSecond {
  background: #110d0a;
}
.mixRoomPremium .container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
}
@media (min-width: 992px) {
  .mixRoomPremium .mixRoomPremiumBlock {
    display: grid !important;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr) !important;
    gap: 48px !important;
    align-items: center !important;
    padding: 40px !important;
    border-radius: 24px !important;
    border: 1px solid rgba(241, 215, 38, 0.25) !important;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01)), rgba(20, 14, 10, 0.85) !important;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6) !important;
  }
  .mixRoomPremium .mixRoomPremiumBlock.mixRoomPremiumBlockReverse {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr) !important;
  }
  .mixRoomPremium .mixRoomPremiumBlockReverse .mixRoomPremiumVisual {
    order: 1 !important;
  }
  .mixRoomPremium .mixRoomPremiumBlockReverse .mixRoomPremiumContent {
    order: 2 !important;
  }
  .mixRoomPremium .mixRoomPremiumVisual {
    order: 2 !important;
  }
  .mixRoomPremium .mixRoomPremiumContent {
    order: 1 !important;
  }
}
@media (max-width: 991px) {
  .mixRoomPremium .mixRoomPremiumBlock {
    display: flex !important;
    flex-direction: column !important;
    gap: 24px !important;
    padding: 24px !important;
  }
  .mixRoomPremium .mixRoomPremiumVisual {
    order: 1 !important;
  }
  .mixRoomPremium .mixRoomPremiumContent {
    order: 2 !important;
  }
}
.mixRoomPremium .mixRoomPremiumTitle {
  font-size: clamp(32px, 3.5vw, 52px) !important;
  font-weight: 950 !important;
  line-height: 1.15 !important;
  color: #ffe2a0 !important;
  font-family: var(--font-philosopher, serif) !important;
}
.mixRoomPremium .mixRoomPremiumPrices {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 12px !important;
  margin: 24px 0 !important;
  padding: 16px !important;
  background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(241, 215, 38, 0.2) !important;
  border-radius: 14px !important;
}
@media (max-width: 576px) {
  .mixRoomPremium .mixRoomPremiumPrices {
    grid-template-columns: 1fr !important;
  }
}
.mixRoomPremium .mixRoomPremiumActions {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
  margin-top: 24px !important;
}
.mixRoomPremium .mixRoomPremiumFloat {
  position: relative !important;
  margin-top: 16px !important;
  padding: 18px 20px !important;
  border-radius: 16px !important;
  border: 1px solid rgba(241, 215, 38, 0.25) !important;
  background: linear-gradient(135deg, rgba(241, 215, 38, 0.08), rgba(0, 0, 0, 0.6)) !important;
  backdrop-filter: blur(12px) !important;
}
.mixRoomPremium .mixRoomPremiumFloatName {
  font-size: 22px !important;
  font-weight: 800 !important;
  color: #ffe2a0 !important;
  font-family: var(--font-philosopher, serif) !important;
}
.mixRoomPremium .mixRoomPremiumFloatMini {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
  margin-top: 10px !important;
}
.mixRoomPremium .mixRoomPremiumFloatMini span {
  padding: 4px 12px !important;
  border-radius: 999px !important;
  background: #f1d726 !important;
  color: #111 !important;
  font-size: 11px !important;
  font-weight: 800 !important;
}
`;

const finalCss = baseCss + '\n\n' + themeExtracted + '\n\n' + appExtracted + '\n\n' + customPolish;
fs.writeFileSync('src/app/mixhotel-luxury.css', finalCss);
console.log('Successfully rebuilt src/app/mixhotel-luxury.css with proper @media separation!');
