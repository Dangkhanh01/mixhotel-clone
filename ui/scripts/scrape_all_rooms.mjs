import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

const ROOM_SLUGS = [
  // Branch 1: Premium
  'bad-girl', 'inferno', 'master-n-slave', 'galaxy', 'eden', 'lolita', 'karma', '303-scarlet', 'katana', 'amora', 'cloud-nine',
  // Branch 2: Dang Tien Dong
  'hidden-frenzy', 'after-sunset', 'lollipop', 'blowj-up', 'lalaland', 'bad-boy', 'oasis', 'kissing', 'lover', 'on-top',
  // Branch 3: Phuc La
  'naive', 'confession', 'hollywood', 'honeymoon', 'flame', 'passion', 'whisper', 'wake-up', 'rhett-butler', 'get-high', 'the-lust'
];

async function fetchRoom(slug) {
  const url = `https://mixhotel.vn/khach-san-tinh-yeu/${slug}/`;
  console.log(`Fetching room: ${slug}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    if (!res.ok) {
      console.error(`Failed ${slug}: status ${res.status}`);
      return null;
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract title & headings
    const title = $('title').text().trim().replace(' - Mix Boutique Hotel', '').trim();
    const heroTitle = $('.mixDetailHeroTitle, .mixDetailHero h1, .mixDetailHero strong').first().text().trim() || title;
    const heroSubtitle = $('.mixDetailHeroDesc, .mixDetailHero p').first().text().trim();
    const heroBadge = $('.mixDetailHeroBadge, .badge').first().text().trim();
    const heroImg = $('.mixDetailHeroImg img, .mixDetailHero img').attr('src') || '';

    // Youtube
    const youtubeIframe = $('.roomYoutubeDetail iframe').attr('src') || '';
    const youtubeTitle = $('.roomYoutubeDetail h2, .roomYoutubeDetail .title').text().trim();

    // Gallery images
    const galleryImages = [];
    $('.roomImageDetailGallery img, .mixDetailGallery img, .room-gallery img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && !galleryImages.includes(src)) {
        galleryImages.push(src);
      }
    });

    // Concept details
    const conceptText = $('.detailConceptPremium').text().trim().replace(/\s+/g, ' ');
    const conceptFeatures = [];
    $('.detailConceptPremium .item, .detailConceptPremium .col-md-4, .detailConceptPremium li').each((_, el) => {
      const featTitle = $(el).find('h3, strong, b').text().trim();
      const featDesc = $(el).find('p, span').text().trim();
      if (featTitle || featDesc) {
        conceptFeatures.push({ title: featTitle, desc: featDesc });
      }
    });

    // Price
    const priceText = $('.detailPricePremium').text().trim().replace(/\s+/g, ' ');

    // Occasions
    const occasionText = $('.detailOccasionPremium').text().trim().replace(/\s+/g, ' ');

    // FAQ
    const faqs = [];
    $('.detailFaqSection details, .detailFaqSection .faq-item').each((_, el) => {
      const q = $(el).find('summary, .question, h3').text().trim();
      const a = $(el).find('.answer, p').text().trim();
      if (q) faqs.push({ question: q, answer: a });
    });

    // Content article
    const contentHtml = $('.content-frame-section .data_contents, .content-frame-section .content-frame, .content-frame-section').html() || '';

    return {
      slug,
      title: title || slug,
      heroTitle,
      heroSubtitle,
      heroBadge,
      heroImg,
      youtubeIframe,
      youtubeTitle,
      galleryImages,
      conceptText,
      conceptFeatures,
      priceText,
      occasionText,
      faqs,
      contentHtml
    };
  } catch (err) {
    console.error(`Error fetching ${slug}:`, err.message);
    return null;
  }
}

async function run() {
  const results = {};
  for (const slug of ROOM_SLUGS) {
    const data = await fetchRoom(slug);
    if (data) {
      results[slug] = data;
    }
  }

  fs.writeFileSync('scratch/all_rooms_detail.json', JSON.stringify(results, null, 2));
  console.log(`Saved ${Object.keys(results).length} rooms data to scratch/all_rooms_detail.json`);
}

run();
