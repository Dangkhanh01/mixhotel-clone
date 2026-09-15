import fs from 'fs';
import path from 'path';
import https from 'https';

const imgList = JSON.parse(fs.readFileSync('scratch/khach_san_tinh_yeu_images.json', 'utf8'));
const publicDir = path.resolve('public');

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    });
    req.on('error', err => {
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
    req.on('timeout', () => {
      req.destroy();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

async function run() {
  console.log(`Checking ${imgList.length} images...`);
  let downloaded = 0;
  let alreadyExists = 0;
  let failed = 0;

  for (const rawUrl of imgList) {
    let cleanPath = rawUrl;
    let fullRemoteUrl = rawUrl;

    if (rawUrl.startsWith('https://mixhotel.vn')) {
      cleanPath = rawUrl.replace('https://mixhotel.vn', '');
      fullRemoteUrl = rawUrl;
    } else if (rawUrl.startsWith('http')) {
      // External like youtube or unsplash
      const urlObj = new URL(rawUrl);
      cleanPath = path.join('/external', urlObj.hostname, urlObj.pathname);
      fullRemoteUrl = rawUrl;
    } else {
      fullRemoteUrl = `https://mixhotel.vn${rawUrl}`;
    }

    const localFile = path.join(publicDir, cleanPath.replace(/^\//, '').replace(/\//g, path.sep));
    if (fs.existsSync(localFile) && fs.statSync(localFile).size > 0) {
      alreadyExists++;
      continue;
    }

    try {
      console.log(`Downloading: ${fullRemoteUrl} -> ${cleanPath}`);
      await downloadFile(fullRemoteUrl, localFile);
      downloaded++;
    } catch (e) {
      console.error(`Failed ${fullRemoteUrl}:`, e.message);
      failed++;
    }
  }

  console.log(`Finished: ${alreadyExists} already existed, ${downloaded} downloaded, ${failed} failed.`);
}

run();
