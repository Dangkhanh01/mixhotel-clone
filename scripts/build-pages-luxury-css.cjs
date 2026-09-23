const fs = require('fs');
const path = require('path');

const fontCss = `/* ================================================================
   PHILOSOPHER FONTS & LUXURY TOKENS
   ================================================================ */
@font-face {
  font-family: 'Philosopher';
  src: url('../fonts/Philosopher-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Philosopher';
  src: url('../fonts/Philosopher-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Philosopher-Regular';
  src: url('../fonts/Philosopher-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Philosopher-Bold';
  src: url('../fonts/Philosopher-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --wp--preset--color--dark-primary: #070503;
  --wp--preset--color--dark-secondary: #0f0b08;
  --wp--preset--color--dark-card: #140e0a;
  --wp--preset--color--luxury-gold: #c88922;
  --wp--preset--color--gold-bright: #ffe2a0;
  --wp--preset--font-family--philosopher: 'Philosopher', 'Questrial', serif;
}

.font-philosopher,
.mixSectionTitle,
h1, h2, h3, h4, h5, h6 {
  font-family: 'Philosopher', 'Questrial', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;

const luxuryCss = fs.readFileSync(path.join(__dirname, '../ui/src/app/mixhotel-luxury.css'), 'utf8');

const additionalPageStyles = `
/* ================================================================
   PIXEL-PERFECT V2: PAGES LUXURY STYLES (PORTED 1:1 FROM @ui)
   ================================================================ */

/* --- Container & Utilities --- */
.mixLuxuryContainer {
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.mixLuxuryContainerNarrow {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* --- Breadcrumbs --- */
.mixLuxuryBreadcrumbs {
  padding-top: 100px;
  padding-bottom: 16px;
  background-color: #0f0b08;
  border-bottom: 1px solid rgba(200, 137, 34, 0.15);
}

.mixLuxuryBreadcrumbs .inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #a1a1aa;
}

.mixLuxuryBreadcrumbs a {
  color: rgba(255, 226, 160, 0.8);
  transition: color 0.2s ease;
  text-decoration: none;
}

.mixLuxuryBreadcrumbs a:hover {
  color: #ffe2a0;
}

.mixLuxuryBreadcrumbs .current {
  color: #ffe2a0;
}

/* --- Section Headings --- */
.mixLuxuryHeading {
  text-align: center;
  margin-bottom: 40px;
}

.mixLuxuryKicker {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c88922;
  margin-bottom: 8px;
  font-family: 'Philosopher', serif;
}

.mixLuxuryTitle {
  font-size: clamp(26px, 4vw, 48px);
  font-weight: 900;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  line-height: 1.2;
  margin: 0 0 16px;
}

.mixLuxuryTitleDivider {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c88922, transparent);
  margin: 0 auto 24px;
}

/* --- About Page: Story --- */
.mixAboutStory {
  max-width: 860px;
  margin: 0 auto 60px;
  text-align: center;
}

.mixAboutQuote {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 700;
  font-style: italic;
  font-family: 'Philosopher', serif;
  color: #ffe2a0;
  margin-bottom: 24px;
  line-height: 1.4;
}

.mixAboutText {
  text-align: justify;
  color: #d4d4d8;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 300;
}

.mixAboutText p {
  margin-bottom: 16px;
}

/* --- About Page: Feature Banner --- */
.mixAboutBanner {
  position: relative;
  width: 100%;
  height: clamp(320px, 45vw, 540px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(200, 137, 34, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  margin-bottom: 80px;
}

.mixAboutBanner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.mixAboutBanner:hover img {
  transform: scale(1.05);
}

.mixAboutBannerOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
  pointer-events: none;
}

.mixAboutBannerContent {
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  text-align: left;
}

.mixAboutBadge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #d8a85a, #f3cb82);
  color: #151008;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Philosopher', serif;
  margin-bottom: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.mixAboutBannerTitle {
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  margin: 0;
}

/* --- About Page: 6 Amenities --- */
.mixAmenitiesGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

@media (max-width: 991px) {
  .mixAmenitiesGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .mixAmenitiesGrid {
    grid-template-columns: 1fr;
  }
}

.mixAmenityCard {
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, #15100c 0%, #0d0907 100%);
  border: 1px solid rgba(200, 137, 34, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.mixAmenityCard:hover {
  border-color: rgba(200, 137, 34, 0.6);
  transform: translateY(-4px);
}

.mixAmenityIcon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(200, 137, 34, 0.15);
  border: 1px solid rgba(200, 137, 34, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffe2a0;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  font-size: 20px;
}

.mixAmenityCard:hover .mixAmenityIcon {
  background: #c88922;
  color: #151008;
}

.mixAmenityName {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  margin: 0 0 8px;
  letter-spacing: 0.05em;
}

.mixAmenityDesc {
  font-size: 14px;
  color: #a1a1aa;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
}

/* --- About Page: Testimonials --- */
.mixTestimonialsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

@media (max-width: 767px) {
  .mixTestimonialsGrid {
    grid-template-columns: 1fr;
  }
}

.mixTestimonialCard {
  padding: 24px;
  border-radius: 20px;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mixTestimonialStars {
  display: flex;
  gap: 4px;
  color: #ffe2a0;
  margin-bottom: 14px;
}

.mixTestimonialQuote {
  font-size: 15px;
  color: #d4d4d8;
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 20px;
}

.mixTestimonialAuthor {
  border-top: 1px solid rgba(200, 137, 34, 0.15);
  padding-top: 12px;
}

.mixTestimonialName {
  font-weight: 700;
  font-size: 14px;
  color: #fff8ec;
  font-family: 'Philosopher', serif;
  letter-spacing: 0.05em;
  margin: 0;
}

.mixTestimonialRole {
  font-size: 12px;
  color: #c88922;
  margin: 0;
}

/* --- About Page & Global: CTA Banner --- */
.mixCtaBanner {
  border-radius: 24px;
  padding: clamp(32px, 5vw, 48px);
  text-align: center;
  background: linear-gradient(135deg, #20150d 0%, #2d1b0f 50%, #1a0f08 100%);
  border: 1px solid rgba(200, 137, 34, 0.4);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  margin-bottom: 60px;
}

.mixCtaTitle {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  margin: 0 0 16px;
}

.mixCtaDesc {
  font-size: 15px;
  color: #d4d4d8;
  max-width: 640px;
  margin: 0 auto 30px;
  font-weight: 300;
  line-height: 1.6;
}

.mixCtaBtn {
  display: inline-block;
  padding: 14px 36px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #c88922 0%, #ffe2a0 50%, #d9a83a 100%);
  color: #1a0f05 !important;
  font-family: 'Philosopher', serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  box-shadow: 0 10px 25px rgba(200, 137, 34, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.mixCtaBtn:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(200, 137, 34, 0.6);
}

/* --- Contact Page Styles --- */
.mixContactGrid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 40px;
  margin-bottom: 60px;
}

@media (max-width: 991px) {
  .mixContactGrid {
    grid-template-columns: 1fr;
  }
}

.mixContactFormCard {
  border-radius: 24px;
  padding: clamp(24px, 4vw, 40px);
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.mixContactFormCard h2 {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  margin: 0 0 8px;
}

.mixContactFormCard .lead {
  font-size: 13px;
  color: #a1a1aa;
  margin-bottom: 24px;
  font-weight: 300;
}

.mixContactFormCard label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #d4d4d8;
  margin-bottom: 6px;
  font-family: 'Philosopher', serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mixContactFormCard input,
.mixContactFormCard textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: #0c0806;
  border: 1px solid rgba(200, 137, 34, 0.3);
  color: #fff8ec;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.mixContactFormCard input:focus,
.mixContactFormCard textarea:focus {
  outline: none;
  border-color: #ffe2a0;
}

.mixContactFormInput--error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}

.mixContactFormResult {
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
}

.mixContactFormResult--success {
  background: rgba(16, 185, 129, 0.15) !important;
  border: 1px solid #10b981 !important;
  color: #6ee7b7 !important;
}

.mixContactFormResult--error {
  background: rgba(239, 68, 68, 0.15) !important;
  border: 1px solid #ef4444 !important;
  color: #fca5a5 !important;
}

.mixContactFormRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 575px) {
  .mixContactFormRow {
    grid-template-columns: 1fr;
  }
}

.mixContactSidebarCard {
  border-radius: 24px;
  padding: 32px;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  margin-bottom: 24px;
}

.mixContactBranchItem {
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 14px;
  color: #d4d4d8;
}

.mixContactBranchItem .icon {
  color: #c88922;
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.mixContactBranchItem strong {
  display: block;
  color: #ffe2a0;
  margin-bottom: 2px;
}

.mixContactZaloBox {
  border-radius: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #17100b 0%, #20150d 100%);
  border: 1px solid rgba(200, 137, 34, 0.3);
  text-align: center;
}

.mixContactZaloBtn {
  display: inline-block;
  padding: 10px 28px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #d8a85a, #f3cb82);
  color: #151008 !important;
  font-family: 'Philosopher', serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.mixContactZaloBtn:hover {
  transform: scale(1.05);
}

/* --- Policy Pages Styling --- */
.mixPolicyCard {
  border-radius: 24px;
  padding: clamp(24px, 5vw, 48px);
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  color: #d4d4d8;
  line-height: 1.8;
  font-weight: 300;
}

.mixPolicyBox {
  padding: 24px;
  border-radius: 16px;
  background: #1c140e;
  border: 1px solid rgba(200, 137, 34, 0.2);
  margin-bottom: 24px;
}

.mixPolicyBoxTitle {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #ffe2a0;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.mixPolicyNotice {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(200, 137, 34, 0.1);
  border: 1px solid rgba(200, 137, 34, 0.3);
  font-size: 14px;
}

/* --- Blog Archive Styles --- */
.mixBlogCategories {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
}

.mixBlogCategoryPill {
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.3);
  color: #d4d4d8;
  transition: all 0.2s ease;
}

.mixBlogCategoryPill:hover,
.mixBlogCategoryPill.active {
  background: linear-gradient(90deg, #c88922, #ffe2a0);
  color: #1a0f05;
  border-color: #ffe2a0;
  box-shadow: 0 4px 15px rgba(200, 137, 34, 0.3);
}

.mixBlogGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 48px;
}

@media (max-width: 991px) {
  .mixBlogGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .mixBlogGrid {
    grid-template-columns: 1fr;
  }
}

.mixBlogCard {
  border-radius: 24px;
  overflow: hidden;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
}

.mixBlogCard:hover {
  border-color: rgba(200, 137, 34, 0.7);
  transform: translateY(-4px);
}

.mixBlogCardThumb {
  position: relative;
  width: 100%;
  height: 224px;
  overflow: hidden;
}

.mixBlogCardThumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.mixBlogCard:hover .mixBlogCardThumb img {
  transform: scale(1.08);
}

.mixBlogCardTag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  color: #ffe2a0;
  border: 1px solid rgba(200, 137, 34, 0.4);
  font-size: 11px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
}

.mixBlogCardBody {
  padding: 24px;
}

.mixBlogCardDate {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 12px;
}

.mixBlogCardTitle {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  line-height: 1.35;
  margin: 0 0 12px;
  transition: color 0.2s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mixBlogCard:hover .mixBlogCardTitle {
  color: #ffe2a0;
}

.mixBlogCardExcerpt {
  font-size: 14px;
  color: #a1a1aa;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mixBlogCardFooter {
  padding: 0 24px 24px;
}

.mixBlogCardReadMore {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #ffe2a0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.mixBlogCard:hover .mixBlogCardReadMore {
  color: #c88922;
}

/* --- Single Blog Article Styles --- */
.mixArticleHeader {
  margin-bottom: 32px;
}

.mixArticleMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #a1a1aa;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

.mixArticleSapo {
  padding: 20px;
  border-radius: 16px;
  background: #140e0a;
  border-left: 4px solid #c88922;
  border-top: 1px solid rgba(200, 137, 34, 0.2);
  border-right: 1px solid rgba(200, 137, 34, 0.2);
  border-bottom: 1px solid rgba(200, 137, 34, 0.2);
  color: #f5ebd7;
  font-size: 16px;
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 32px;
}

.mixArticleToc {
  padding: 20px;
  border-radius: 16px;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.25);
  margin-bottom: 32px;
}

.mixArticleTocTitle {
  font-size: 16px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #ffe2a0;
  margin-bottom: 12px;
}

.mixArticleTocList {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.mixArticleTocList li {
  margin-bottom: 8px;
}

.mixArticleTocList a {
  color: #d4d4d8;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.mixArticleTocList a:hover {
  color: #ffe2a0;
}

.mixArticleContent {
  color: rgba(245, 235, 215, 0.9);
  font-size: 17px;
  line-height: 1.8;
  font-weight: 300;
}

.mixArticleContent p {
  margin-bottom: 20px;
}

.mixArticleContent h2 {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #ffe2a0;
  margin: 36px 0 16px;
}

.mixArticleContent h3 {
  font-size: 20px;
  font-weight: 700;
  font-family: 'Philosopher', serif;
  color: #fff8ec;
  margin: 28px 0 12px;
}

.mixArticleContent img {
  border-radius: 16px;
  margin: 24px 0;
  border: 1px solid rgba(200, 137, 34, 0.2);
}

.mixArticleShare {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 40px 0;
  padding: 20px;
  border-radius: 16px;
  background: #140e0a;
  border: 1px solid rgba(200, 137, 34, 0.2);
}
`;

const completeCss = fontCss + '\n\n' + luxuryCss + '\n\n' + additionalPageStyles;
const targetPath = path.join(__dirname, '../wp-content/themes/mixhotel-theme/assets/css/pages-luxury.css');
fs.writeFileSync(targetPath, completeCss);
console.log('Generated wp-content/themes/mixhotel-theme/assets/css/pages-luxury.css successfully, size:', completeCss.length);
