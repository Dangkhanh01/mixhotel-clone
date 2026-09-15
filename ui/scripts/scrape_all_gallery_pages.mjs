import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchGalleryPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return [];
    const html = await res.text();
    const $ = cheerio.load(html);

    const items = [];
    $('figure.gold-rectangle').each((_, el) => {
      const linkEl = $(el).find('a');
      const href = linkEl.attr('href') || '';
      const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || '';
      const alt = $(el).find('img').attr('alt') || '';
      
      // Look for title text in sibling or next p
      const parentCol = $(el).closest('.col-6, .col-md-3, .col-md-4, .item, div');
      const title = parentCol.find('p a, p').text().trim() || alt;

      if (href || img) {
        items.push({
          title,
          link: href,
          image: img
        });
      }
    });
    return items;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return [];
  }
}

async function run() {
  const allGallery = {
    page1: await fetchGalleryPage('https://mixhotel.vn/gallery/?page=1'),
    page2: await fetchGalleryPage('https://mixhotel.vn/gallery/?page=2'),
    page3: await fetchGalleryPage('https://mixhotel.vn/gallery/?page=3'),
    branch1: await fetchGalleryPage('https://mixhotel.vn/gallery-mix-boutique-hotel-186-hoang-ngan/'),
    branch2: await fetchGalleryPage('https://mixhotel.vn/gallery-mix-boutique-hotel-256b-dang-tien-dong/'),
    branch3: await fetchGalleryPage('https://mixhotel.vn/gallery-mix-boutique-hotel-20-phuc-la-ha-dong/')
  };

  fs.writeFileSync('scratch/all_gallery_data.json', JSON.stringify(allGallery, null, 2));
  console.log(`Gallery Page 1: ${allGallery.page1.length} items`);
  console.log(`Gallery Page 2: ${allGallery.page2.length} items`);
  console.log(`Gallery Page 3: ${allGallery.page3.length} items`);
  console.log(`Branch 1 Gallery: ${allGallery.branch1.length} items`);
  console.log(`Branch 2 Gallery: ${allGallery.branch2.length} items`);
  console.log(`Branch 3 Gallery: ${allGallery.branch3.length} items`);
}

run();
