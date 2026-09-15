import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/khach_san_tinh_yeu_sections/12_content_frame_section.html', 'utf8');
const $ = cheerio.load(html);

// Clean image URLs
$('img').each((_, el) => {
  let src = $(el).attr('src') || '';
  if (src.startsWith('https://mixhotel.vn')) {
    src = src.replace('https://mixhotel.vn', '');
    $(el).attr('src', src);
  }
  $(el).attr('loading', 'lazy');
});

// Clean links that point to mixhotel.vn
$('a').each((_, el) => {
  let href = $(el).attr('href') || '';
  if (href.startsWith('https://mixhotel.vn/khach-san-tinh-yeu')) {
    href = href.replace('https://mixhotel.vn', '');
    $(el).attr('href', href);
  }
});

// Extract table of content items
const toc = [];
$('#bookmark-list ul li').each((_, el) => {
  const isSub = $(el).hasClass('sub_data');
  const a = $(el).find('a');
  toc.push({
    title: a.text().trim(),
    href: a.attr('href'),
    isSub
  });
});

const cleanedHtml = $('.content-body').html();

fs.writeFileSync('scratch/content_frame_cleaned.html', cleanedHtml, 'utf8');
fs.writeFileSync('scratch/content_frame_toc.json', JSON.stringify(toc, null, 2), 'utf8');
console.log(`Cleaned content frame: ${cleanedHtml.length} bytes, TOC items: ${toc.length}`);
