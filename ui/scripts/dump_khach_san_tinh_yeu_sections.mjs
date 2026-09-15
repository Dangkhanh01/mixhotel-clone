import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('C:/Users/maida/.gemini/antigravity-ide/brain/ee8785b0-c124-4fa2-8d4f-c2ab8912ec8e/.system_generated/steps/1140/content.md', 'utf8');
const html = content.slice(content.indexOf('<!DOCTYPE html>'));
const $ = cheerio.load(html);

const outDir = path.resolve('scratch/khach_san_tinh_yeu_sections');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sectionSelectors = [
  { name: '01_cateMixHero', selector: '.cateMixHero' },
  { name: '02_cateBranchSection', selector: '.cateBranchSection' },
  { name: '03_mixCatePrice', selector: '.mixCatePrice' },
  { name: '04_mixCateBranch', selector: '.mixCateBranch' },
  { name: '05_mixCateVideo', selector: '.mixCateVideo' },
  { name: '06_mixFreePerks', selector: '.mixFreePerks' },
  { name: '07_cateEventDecor', selector: '.cateEventDecor' },
  { name: '08_cateBookingSteps', selector: '.cateBookingSteps' },
  { name: '09_cateConsultForm', selector: '.cateConsultForm' },
  { name: '10_cateFaq', selector: '.cateFaq' },
  { name: '11_catePremiumCta', selector: '.catePremiumCta' },
  { name: '12_content_frame_section', selector: '.content-frame-section' }
];

sectionSelectors.forEach(({ name, selector }) => {
  const el = $(selector);
  if (el.length > 0) {
    fs.writeFileSync(path.join(outDir, `${name}.html`), $.html(el), 'utf8');
    console.log(`Saved ${name}.html (${$.html(el).length} bytes)`);
  } else {
    console.log(`NOT FOUND: ${name} (${selector})`);
  }
});
