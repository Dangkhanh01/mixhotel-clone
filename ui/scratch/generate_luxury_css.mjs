import fs from 'fs';

let css = fs.readFileSync('scratch/theme_full.css', 'utf8');

// Replace font URLs with local /fonts/
css = css.replace(/url\(\/uploads\/fonts\/Philosopher-Regular\.ttf\)/g, "url('/fonts/Philosopher-Regular.ttf')");
css = css.replace(/url\(\/uploads\/fonts\/Philosopher-Bold\.ttf\)/g, "url('/fonts/Philosopher-Bold.ttf')");

// Replace image URLs with local /images/
css = css.replace(/url\(\/uploads\/images\/([^)]+)\)/g, "url('/images/$1')");
css = css.replace(/url\(\/tassets\/images\/([^)]+)\)/g, "url('/images/$1')");

// Add any missing utility classes or overrides for header and navigation
const additionalCss = `
/* Additional layout & typography utilities matching mixhotel.vn */
.font-philosopher {
  font-family: 'Philosopher-Bold', 'Philosopher-Regular', 'Times New Roman', serif;
}

.mixPremiumMenuWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: rgba(14, 10, 8, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 226, 160, 0.12);
  transition: all 0.3s ease;
}

.mixPremiumMenuInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.mixPremiumLogoBox {
  display: flex;
  align-items: center;
}

.mixPremiumLogoImg {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.mixPremiumNavBox {
  display: flex;
  align-items: center;
  gap: 22px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.mixPremiumNavItem {
  position: relative;
}

.mixPremiumNavLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #fff8ec;
  font-family: 'Philosopher-Bold', 'Philosopher-Regular', serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  padding: 8px 4px;
  transition: color 0.2s ease;
}

.mixPremiumNavLink:hover,
.mixPremiumNavItem:hover > .mixPremiumNavLink,
.mixPremiumNavLink.active {
  color: #ffe2a0;
}

.mixPremiumDropList {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 260px;
  background: #140e0a;
  border: 1px solid rgba(255, 226, 160, 0.2);
  border-radius: 12px;
  padding: 10px 0;
  list-style: none;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
  display: none;
  z-index: 1000;
}

.mixPremiumNavItem:hover .mixPremiumDropList {
  display: block;
}

.mixPremiumDropItem {
  margin: 0;
}

.mixPremiumDropLink {
  display: block;
  padding: 10px 18px;
  color: rgba(255, 242, 221, 0.85);
  font-family: 'Philosopher-Bold', 'Philosopher-Regular', serif;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mixPremiumDropLink:hover {
  background: rgba(255, 226, 160, 0.08);
  color: #ffe2a0;
  padding-left: 22px;
}

.mixPremiumActionBox {
  display: flex;
  align-items: center;
}

.mixPremiumContactBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #c88922 0%, #ffe2a0 48%, #d9a83a 100%);
  color: #1a0f05;
  font-family: 'Philosopher-Bold', serif;
  font-size: 14.5px;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 11px 22px;
  border-radius: 999px;
  box-shadow: 0 4px 18px rgba(200, 137, 34, 0.35);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mixPremiumContactBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(200, 137, 34, 0.5);
  color: #000;
}
`;

const finalCss = css + '\n' + additionalCss;
fs.writeFileSync('src/app/mixhotel-luxury.css', finalCss);
console.log(`Generated src/app/mixhotel-luxury.css (${finalCss.length} bytes)`);
