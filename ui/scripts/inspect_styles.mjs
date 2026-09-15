import fs from 'fs';
import * as cheerio from 'cheerio';

const content = fs.readFileSync('C:/Users/maida/.gemini/antigravity-ide/brain/ee8785b0-c124-4fa2-8d4f-c2ab8912ec8e/.system_generated/steps/1140/content.md', 'utf8');
const html = content.slice(content.indexOf('<!DOCTYPE html>'));
const $ = cheerio.load(html);

console.log('CSS links:');
$('link[rel="stylesheet"]').each((_, el) => console.log($(el).attr('href')));

console.log('Inline style tags count:', $('style').length);
$('style').each((i, el) => {
  const css = $(el).html();
  console.log(`Style #${i}: length=${css.length}, preview=${css.slice(0, 150).replace(/\s+/g, ' ')}`);
});
