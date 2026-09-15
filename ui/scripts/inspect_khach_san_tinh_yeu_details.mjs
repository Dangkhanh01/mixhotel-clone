import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('C:/Users/maida/.gemini/antigravity-ide/brain/ee8785b0-c124-4fa2-8d4f-c2ab8912ec8e/.system_generated/steps/1140/content.md', 'utf8');
const html = content.slice(content.indexOf('<!DOCTYPE html>'));
const $ = cheerio.load(html);

const sections = [
  '.cateMixHero',
  '.cateBranchSection',
  '.mixCatePrice',
  '.mixCateBranch',
  '.mixCateVideo',
  '.mixFreePerks',
  '.cateEventDecor',
  '.cateBookingSteps',
  '.cateConsultForm',
  '.cateFaq',
  '.catePremiumCta',
  '.content-frame-section'
];

sections.forEach(sec => {
  const el = $(sec);
  console.log(`\n======================================================`);
  console.log(`SECTION: ${sec} (Found: ${el.length})`);
  console.log(`ID: ${el.attr('id') || 'none'}`);
  console.log(`Classes: ${el.attr('class') || ''}`);
  
  // Find headings
  const headings = el.find('h1, h2, h3, h4').map((_, h) => `${h.tagName}: ${$(h).text().trim()}`).get();
  console.log('Headings:', headings);

  // Find images
  const imgs = el.find('img').map((_, im) => $(im).attr('src')).get();
  console.log('Images count:', imgs.length, 'sample:', imgs.slice(0, 5));

  // Find text preview
  const text = el.text().replace(/\s+/g, ' ').trim();
  console.log('Text preview:', text.slice(0, 300) + '...');
});
