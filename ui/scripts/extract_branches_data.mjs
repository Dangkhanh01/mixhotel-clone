import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/khach_san_tinh_yeu_sections/02_cateBranchSection.html', 'utf8');
const $ = cheerio.load(html);

const branches = [];

$('.cateBranchCard').each((_, card) => {
  const id = $(card).attr('id');
  const image = $(card).find('.cateBranchImage').attr('src');
  const badge = $(card).find('.cateBranchBadge').text().trim();
  const area = $(card).find('.cateBranchArea').text().trim();
  const name = $(card).find('.cateBranchName').text().trim();
  const address = $(card).find('.cateBranchAddress').text().trim();
  const notice = $(card).find('.cateBranchNotice span').text().trim();
  const tags = $(card).find('.cateBranchTags span').map((_, el) => $(el).text().trim()).get();
  const roomTitle = $(card).find('.cateBranchRoomTitle').text().trim();

  const rooms = $(card).find('.cateBranchRoom').map((_, r) => {
    return {
      name: $(r).find('.cateBranchRoomNameLink strong').text().trim(),
      link: $(r).find('.cateBranchRoomNameLink').attr('href'),
      price: $(r).find('b').text().trim(),
      desc: $(r).find('.cateBranchRoomText span').text().trim(),
      image: $(r).find('.cateBranchRoomImageLink img').attr('src')
    };
  }).get();

  branches.push({
    id,
    image,
    badge,
    area,
    name,
    address,
    notice,
    tags,
    roomTitle,
    rooms
  });
});

fs.writeFileSync('scratch/branches_data.json', JSON.stringify(branches, null, 2), 'utf8');
console.log(`Extracted ${branches.length} branches with a total of ${branches.reduce((acc, b) => acc + b.rooms.length, 0)} rooms.`);
