import * as cheerio from 'cheerio';
import fs from 'fs';

function analyzeBranch(filename, branchName) {
  console.log(`\n==================== ${branchName} ====================`);
  const html = fs.readFileSync(filename, 'utf8');
  const $ = cheerio.load(html);

  console.log('Title:', $('title').text().trim());

  // Hero section
  const hero = $('.mixBoutiqueHero');
  console.log('Hero title:', hero.find('h1, h2, .title').text().trim().replace(/\s+/g, ' '));
  console.log('Hero address/info:', hero.find('.address, .info, p').map((_, el) => $(el).text().trim()).get().filter(Boolean).slice(0, 5));

  // Room showcase (grid or slider of rooms at top)
  const showcase = $('.mixRoomShowcase');
  console.log('Showcase rooms count:', showcase.find('.item, .room-card, .col-md-3, .col-6').length);
  showcase.find('a[href*="/khach-san-tinh-yeu/"]').each((i, el) => {
    console.log(`Showcase room link ${i}: href="${$(el).attr('href')}" text="${$(el).text().trim().replace(/\s+/g, ' ')}"`);
  });

  // Individual room sections in the branch page
  const roomSections = $('.mixRoomPremium');
  console.log(`mixRoomPremium count: ${roomSections.length}`);
  roomSections.each((i, el) => {
    const title = $(el).find('h2, h3, .title, .roomName').text().trim().replace(/\s+/g, ' ');
    const price = $(el).find('.price, .roomPrice').text().trim().replace(/\s+/g, ' ');
    const detailLink = $(el).find('a[href*="/khach-san-tinh-yeu/"]').attr('href');
    const bookingLink = $(el).find('a[href*="#"], a[href*="booking"], a[href*="zalo"]').attr('href');
    console.log(`Room ${i}: title="${title}" price="${price}" detailLink="${detailLink}" booking="${bookingLink}"`);
  });

  // Other sections
  console.log('Price section exists:', $('.mixPricePremium').length > 0);
  console.log('Booking form exists:', $('.mixCateBooking, #form-lien-he').length > 0);
  console.log('Gallery section exists:', $('.mixCateGallery').length > 0);
  console.log('FAQ section exists:', $('.mixCateFaq').length > 0);
  console.log('Content frame exists:', $('.content-frame-section').length > 0);
}

analyzeBranch('scratch/branch1_full.html', 'BRANCH 1: Premium (186 Hoàng Ngân)');
analyzeBranch('scratch/branch2_full.html', 'BRANCH 2: 256B Đặng Tiến Đông');
analyzeBranch('scratch/branch3_full.html', 'BRANCH 3: 20 Phúc La Hà Đông');
