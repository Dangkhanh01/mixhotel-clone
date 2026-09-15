import * as cheerio from 'cheerio';
import fs from 'fs';

function inspectGallery() {
  const html = fs.readFileSync('scratch/gallery_full.html', 'utf8');
  const $ = cheerio.load(html);

  console.log('========== GALLERY INSPECTION ==========');
  console.log('Main class:', $('main').attr('class'));
  
  // Find all cards, links, images, filters in main
  $('main a').each((i, el) => {
    console.log(`Gallery Link ${i}: href="${$(el).attr('href')}" text="${$(el).text().trim().replace(/\s+/g, ' ')}" class="${$(el).attr('class')}"`);
  });

  // Print all elements inside main
  $('main').children().each((i, el) => {
    console.log(`Main child ${i}: <${el.tagName} class="${$(el).attr('class')}" id="${$(el).attr('id')}">`);
    console.log(`Child ${i} snippet:`, $(el).html().substring(0, 300));
  });
}

function inspectBranchRooms() {
  const html = fs.readFileSync('scratch/branch1_full.html', 'utf8');
  const $ = cheerio.load(html);

  console.log('\n========== BRANCH 1 ROOM SHOWCASE & ROOM SECTIONS ==========');
  $('.mixRoomShowcase a, .mixRoomShowcase .item').each((i, el) => {
    console.log(`Showcase item ${i}:`, $(el).attr('href'), $(el).text().trim().replace(/\s+/g, ' '));
  });

  $('.mixRoomPremium').each((i, el) => {
    const id = $(el).attr('id');
    const title = $(el).find('h2, h3, .title, .room-title').text().trim().replace(/\s+/g, ' ');
    console.log(`mixRoomPremium ${i}: id="${id}" title="${title}"`);
  });
}

inspectGallery();
inspectBranchRooms();
