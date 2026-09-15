import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const scrapedDir = path.resolve('scratch/scraped_articles');
const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files.`);

for (const f of files) {
  const html = fs.readFileSync(path.join(scrapedDir, f), 'utf8');
  const $ = cheerio.load(html);
  
  const title = $('h1').text().trim() || $('title').text().trim();
  const date = $('.date, .time, .created-at, .date_post').text().trim() || 
               html.match(/(\d{1,2}\/\d{1,2}\/\d{4})/)?.[1] || '';
  const sapo = $('.size-1, .sapo, .lead, .short_desc').first().text().trim();
  const hasMucLuc = $('.mucLucPart').length > 0;
  const mucLucItems = [];
  $('.mucLucPart a').each((_, el) => {
    mucLucItems.push({
      text: $(el).text().trim(),
      href: $(el).attr('href') || ''
    });
  });
  
  const contentEl = $('.data_contents');
  const imgCount = contentEl.find('img').length;
  const tableCount = contentEl.find('table').length;
  const h2Count = contentEl.find('h2').length;
  const h3Count = contentEl.find('h3').length;

  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const metaDate = $('meta[property="article:published_time"]').attr('content') || '';
  const ogImg = $('meta[property="og:image"]').attr('content') || '';
  const breadcrumb = $('.breadCrumb, .breadcrumb, .breadcrumbs, .breakcrumb').text().trim().replace(/\s+/g, ' ');

  console.log(`\n--- ${f} ---`);
  console.log(`Title: ${title}`);
  console.log(`Breadcrumb: ${breadcrumb}`);
  console.log(`Meta Date: ${metaDate || date}`);
  console.log(`Og Image: ${ogImg}`);
  console.log(`Meta Desc: ${metaDesc.slice(0, 80)}...`);
  console.log(`MucLuc items: ${mucLucItems.length}`);
  console.log(`Images in content: ${imgCount}, Tables: ${tableCount}, H2: ${h2Count}, H3: ${h3Count}`);
}
