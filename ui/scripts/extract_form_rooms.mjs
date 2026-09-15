import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/khach_san_tinh_yeu_sections/09_cateConsultForm.html', 'utf8');
const $ = cheerio.load(html);

const formRooms = {};

$('.selectRoom').each((_, el) => {
  const diaDiem = $(el).attr('data-dia-diem') || $(el).attr('diadiem') || 'All';
  const options = [];
  $(el).find('option').each((_, opt) => {
    const val = $(opt).attr('value');
    if (val) {
      options.push({
        value: val,
        text: $(opt).text().trim(),
        price1: $(opt).attr('price1'),
        price2: $(opt).attr('price2'),
        price3: $(opt).attr('price3'),
        pricesub: $(opt).attr('pricesub')
      });
    }
  });
  formRooms[diaDiem] = options;
});

fs.writeFileSync('scratch/form_rooms.json', JSON.stringify(formRooms, null, 2), 'utf8');
console.log('Extracted form rooms keys:', Object.keys(formRooms));
