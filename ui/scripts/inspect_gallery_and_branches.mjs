import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function checkUrl(url) {
  try {
    console.log(`\n================== Checking: ${url} ==================`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log(`Status: ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    console.log(`Title:`, $('title').text());
    
    // Check main container classes / structure
    const mainClasses = [];
    $('main, body > div, section').each((i, el) => {
      const cls = $(el).attr('class');
      const id = $(el).attr('id');
      if (cls || id) {
        mainClasses.push(`<${el.tagName} id="${id || ''}" class="${cls || ''}">`);
      }
    });
    console.log(`Key sections found:`, mainClasses.slice(0, 15));

    return { html, $ };
  } catch (err) {
    console.error(`Error checking ${url}:`, err.message);
    return null;
  }
}

async function run() {
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  // 1. Inspect gallery
  const galleryData = await checkUrl('https://mixhotel.vn/gallery/');
  if (galleryData) {
    const { $ } = galleryData;
    console.log('\n--- Gallery Structure ---');
    // Check all sections in gallery
    $('section').each((i, el) => {
      console.log(`Gallery Section ${i}: class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
    });

    // Save full HTML
    fs.writeFileSync('scratch/gallery_full.html', galleryData.html);
  }

  // 2. Inspect 3 branch pages
  const branch1 = await checkUrl('https://mixhotel.vn/mix-boutique-premium-hotel/');
  if (branch1) {
    const { $ } = branch1;
    console.log('\n--- Branch 1 (Premium) Sections ---');
    $('section').each((i, el) => {
      console.log(`Section ${i}: class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
    });
    fs.writeFileSync('scratch/branch1_full.html', branch1.html);
  }

  const branch2 = await checkUrl('https://mixhotel.vn/mix-boutique-hotel-256b-dang-tien-dong/');
  if (branch2) {
    const { $ } = branch2;
    console.log('\n--- Branch 2 (Dang Tien Dong) Sections ---');
    $('section').each((i, el) => {
      console.log(`Section ${i}: class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
    });
    fs.writeFileSync('scratch/branch2_full.html', branch2.html);
  }

  const branch3 = await checkUrl('https://mixhotel.vn/mix-boutique-hotel-20-phuc-la-ha-dong/');
  if (branch3) {
    const { $ } = branch3;
    console.log('\n--- Branch 3 (Phuc La) Sections ---');
    $('section').each((i, el) => {
      console.log(`Section ${i}: class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
    });
    fs.writeFileSync('scratch/branch3_full.html', branch3.html);
  }
}

run();
