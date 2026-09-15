import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('C:/Users/maida/.gemini/antigravity-ide/brain/ee8785b0-c124-4fa2-8d4f-c2ab8912ec8e/.system_generated/steps/1140/content.md', 'utf8');
const html = content.slice(content.indexOf('<!DOCTYPE html>'));
const $ = cheerio.load(html);

console.log('Title:', $('title').text());
console.log('h1:', $('h1').map((_, el) => $(el).text().trim()).get());
console.log('h2:', $('h2').map((_, el) => $(el).text().trim()).get());

console.log('\n--- Direct Body Children ---');
$('body > *').each((_, el) => {
  const tag = el.tagName;
  const id = $(el).attr('id') || '';
  const cls = $(el).attr('class') || '';
  console.log(`<${tag} id="${id}" class="${cls}">`);
});
