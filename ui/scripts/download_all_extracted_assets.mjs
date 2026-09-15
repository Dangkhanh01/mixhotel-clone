import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const allImages = new Set();

// 1. From all_rooms_detail.json
if (fs.existsSync('scratch/all_rooms_detail.json')) {
  const rooms = JSON.parse(fs.readFileSync('scratch/all_rooms_detail.json', 'utf8'));
  for (const r of Object.values(rooms)) {
    if (r.heroImg) allImages.add(r.heroImg);
    if (r.galleryImages) {
      r.galleryImages.forEach(img => allImages.add(img));
    }
    if (r.contentHtml) {
      const $ = cheerio.load(r.contentHtml);
      $('img').each((_, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src) allImages.add(src);
      });
    }
  }
}

// 2. From gallery_full.html
if (fs.existsSync('scratch/gallery_full.html')) {
  const $ = cheerio.load(fs.readFileSync('scratch/gallery_full.html', 'utf8'));
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src) allImages.add(src);
  });
}

// 3. From 3 branches
['scratch/branch1_full.html', 'scratch/branch2_full.html', 'scratch/branch3_full.html'].forEach(f => {
  if (fs.existsSync(f)) {
    const $ = cheerio.load(fs.readFileSync(f, 'utf8'));
    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src) allImages.add(src);
    });
  }
});

console.log(`Total unique image URLs found: ${allImages.size}`);

async function downloadImage(urlPath) {
  if (!urlPath || urlPath.startsWith('data:')) return;
  
  // Clean URL
  let remoteUrl = urlPath;
  if (remoteUrl.startsWith('//')) {
    remoteUrl = 'https:' + remoteUrl;
  } else if (remoteUrl.startsWith('/')) {
    remoteUrl = 'https://mixhotel.vn' + remoteUrl;
  } else if (!remoteUrl.startsWith('http')) {
    remoteUrl = 'https://mixhotel.vn/' + remoteUrl;
  }

  // Determine local disk path
  let localRelPath = urlPath.replace(/^https?:\/\/[^\/]+/, '');
  if (localRelPath.startsWith('//')) localRelPath = localRelPath.substring(1);
  if (localRelPath.startsWith('/')) localRelPath = localRelPath.substring(1);
  localRelPath = localRelPath.split('?')[0];

  const localFullPath = path.join(process.cwd(), 'public', localRelPath);

  if (fs.existsSync(localFullPath)) {
    return; // already exists
  }

  fs.mkdirSync(path.dirname(localFullPath), { recursive: true });

  try {
    const res = await fetch(remoteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });
    if (res.ok) {
      const buffer = await res.buffer();
      fs.writeFileSync(localFullPath, buffer);
      console.log(`Downloaded: ${localRelPath}`);
    } else {
      console.warn(`HTTP ${res.status} for ${remoteUrl}`);
    }
  } catch (err) {
    console.error(`Error downloading ${remoteUrl}:`, err.message);
  }
}

async function run() {
  const list = Array.from(allImages);
  console.log(`Starting download of ${list.length} images in batches...`);
  const batchSize = 10;
  for (let i = 0; i < list.length; i += batchSize) {
    const batch = list.slice(i, i + batchSize);
    await Promise.all(batch.map(url => downloadImage(url)));
  }
  console.log('All image downloads completed!');
}

run();
