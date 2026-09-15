import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function checkRoomDetail() {
  const url = 'https://mixhotel.vn/khach-san-tinh-yeu/cloud-nine/';
  console.log(`Checking room detail: ${url}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  console.log(`Status: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('Room Title:', $('title').text());
  console.log('H1:', $('h1').text());
  
  $('section, main, article').each((i, el) => {
    console.log(`Room Tag <${el.tagName}> class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
  });

  fs.writeFileSync('scratch/room_detail_cloud_nine.html', html);
}

async function checkBranchDetails() {
  const b1Html = fs.readFileSync('scratch/branch1_full.html', 'utf8');
  const $ = cheerio.load(b1Html);
  console.log('\n--- Branch 1 Main Structure ---');
  $('body > *').each((i, el) => {
    if (el.tagName !== 'script' && el.tagName !== 'style') {
      console.log(`Tag <${el.tagName}> class="${$(el).attr('class')}" id="${$(el).attr('id')}"`);
    }
  });

  // Check mixRoomPremium in Branch 1
  console.log('\n--- Branch 1 mixRoomPremium elements ---');
  $('.mixRoomPremium').each((i, el) => {
    const title = $(el).find('h2, h3, .name, .title').text().trim().replace(/\s+/g, ' ');
    const imgs = $(el).find('img').map((_, img) => $(img).attr('src') || $(img).attr('data-src')).get();
    console.log(`Room in Branch 1: title="${title}" imgs count=${imgs.length}`);
  });
}

checkRoomDetail();
checkBranchDetails();
