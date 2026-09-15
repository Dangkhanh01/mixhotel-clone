import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/khach_san_tinh_yeu_sections/02_cateBranchSection.html', 'utf8');
const $ = cheerio.load(html);

$('.cateBranchCard').each((_, card) => {
  const id = $(card).attr('id');
  const name = $(card).find('.cateBranchName').text().trim();
  const rooms = $(card).find('.cateBranchRoom').map((_, r) => {
    return {
      title: $(r).find('strong').text().trim(),
      price: $(r).find('b').text().trim(),
      img: $(r).find('img').attr('src')
    };
  }).get();
  console.log(`Branch [${id}] - ${name}: ${rooms.length} rooms`);
  console.log('Sample rooms:', rooms.slice(0, 3));
});
