import fs from 'fs';

const themeCss = fs.readFileSync('scratch/remote_theme.css', 'utf8');
const appCss = fs.readFileSync('scratch/remote_app.css', 'utf8');

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
  'mixCatePolicy'
];

let extracted = [];
const seenRules = new Set();

function extractFrom(cssText, sourceName) {
  // Simple regex to match CSS rules
  const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
  let match;
  while ((match = ruleRegex.exec(cssText)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();
    
    // Check if selector matches any target
    const isTarget = targetSelectors.some(sel => selector.includes(`.${sel}`));
    if (isTarget && !seenRules.has(selector + body)) {
      seenRules.add(selector + body);
      extracted.push(`${selector} { ${body} }`);
    }
  }
}

extractFrom(themeCss, 'remote_theme.css');
extractFrom(appCss, 'remote_app.css');

console.log(`Extracted ${extracted.length} CSS rules for gallery, room details, and branches!`);

// Additional custom luxury styling for perfect contrast
const customOverrides = `
/* ================================================================
   GALLERY & ROOM DETAIL & BRANCH CUSTOM LUXURY STYLES
   ================================================================ */
.galerryMix {
  background-color: #0c080a;
  color: #fff8ec;
  padding-top: 40px;
}

.titleBlock_1 {
  text-align: center;
  position: relative;
  margin-bottom: 24px;
}

.titleBlock_1 .titleText {
  font-family: var(--font-philosopher, serif);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ffe2a0;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding-bottom: 12px;
}

.titleBlock_1 .titleText::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c88922, transparent);
}

.wrapSubcateBlock_1 {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.subcateBlock_1 {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.subcateBlock_1 .subcateName {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(200, 137, 34, 0.3);
  color: #f1ebd8;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.subcateBlock_1 .subcateName:hover,
.subcateBlock_1 .subcateName.active {
  background: linear-gradient(135deg, #c88922 0%, #a46d14 100%);
  color: #000;
  border-color: #e5a73e;
  box-shadow: 0 4px 15px rgba(200, 137, 34, 0.35);
}

.gold-rectangle {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(200, 137, 34, 0.3);
  background: #140e0a;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gold-rectangle:hover {
  transform: translateY(-4px);
  border-color: #e5a73e;
  box-shadow: 0 10px 25px rgba(200, 137, 34, 0.25);
}

.gold-rectangle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gold-rectangle:hover img {
  transform: scale(1.08);
}

.galleryCardTitle {
  margin-top: 12px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff8ec;
  transition: color 0.2s ease;
}

.galleryCardTitle:hover {
  color: #ffe2a0;
}

/* Pagination */
.galleryPagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 50px;
}

.galleryPagination .pageBtn {
  min-width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(200, 137, 34, 0.3);
  background: rgba(20, 14, 10, 0.8);
  color: #fff8ec;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.galleryPagination .pageBtn:hover {
  border-color: #c88922;
  color: #ffe2a0;
  background: rgba(200, 137, 34, 0.15);
}

.galleryPagination .pageBtn.active {
  background: linear-gradient(135deg, #c88922, #966110);
  color: #000;
  border-color: #e5a73e;
  font-weight: 700;
}

/* Room Detail Specific Luxury Styles */
.mixDetailHero {
  position: relative;
  overflow: hidden;
  padding: 100px 0 60px;
  background: radial-gradient(circle at 50% 20%, rgba(180,0,96,0.18), transparent 50%), #0c080a;
}

.roomYoutubeDetail {
  padding: 60px 0;
  background: #110d0a;
}

.roomImageDetailGallery {
  padding: 60px 0;
  background: #0c080a;
}

.detailConceptPremium {
  padding: 70px 0;
  background: #110d0a;
}

.detailPricePremium {
  padding: 60px 0;
  background: #0c080a;
}

.detailOccasionPremium {
  padding: 60px 0;
  background: #110d0a;
}

.detailBookingPremium {
  padding: 70px 0;
  background: #0c080a;
}

.detailMemorySection {
  padding: 60px 0;
  background: #110d0a;
}

.detailFaqSection {
  padding: 60px 0;
  background: #0c080a;
}

.detailBookingCtaSection {
  padding: 70px 0;
  background: radial-gradient(circle at 50% 50%, rgba(200,137,34,0.15), transparent 70%), #110d0a;
}
`;

const currentLuxuryCss = fs.readFileSync('src/app/mixhotel-luxury.css', 'utf8');
const finalCss = currentLuxuryCss + '\n\n' + extracted.join('\n') + '\n\n' + customOverrides;
fs.writeFileSync('src/app/mixhotel-luxury.css', finalCss);
console.log('Appended all styles to src/app/mixhotel-luxury.css successfully!');
