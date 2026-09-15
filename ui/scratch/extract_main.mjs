import fs from 'fs';

function extractMain(pageName) {
  const html = fs.readFileSync(`scratch/live_pages/${pageName}.html`, 'utf8');
  
  // Find where header ends
  const endHeaderIdx = html.indexOf('class="mixLuxuryHero"') !== -1 
    ? html.indexOf('class="mixLuxuryHero"')
    : html.indexOf('class="mixFooterPremium"');
  
  // Find between header and footer
  // Header end is after </header> or after mixPremiumMenuWrap
  let headerEnd = html.indexOf('</header>');
  if (headerEnd === -1) {
    const wrapIdx = html.indexOf('mixPremiumMenuWrap');
    headerEnd = html.indexOf('</div>\n</div>\n</div>', wrapIdx);
  }

  // Footer start is before mixFooterPremium
  const footerStart = html.indexOf('mixFooterPremium');

  const mainPart = html.slice(headerEnd, footerStart);
  fs.writeFileSync(`scratch/live_pages/${pageName}_main.html`, mainPart);
  console.log(`Saved ${pageName}_main.html: ${mainPart.length} chars`);
}

['gioi-thieu', 'khach-san-tinh-yeu', 'gallery', 'tin-tuc', 'chinh-sach-thanh-toan', 'chinh-sach-bao-mat-thong-tin', 'chinh-sach-dat-tra-phong', 'lien-he'].forEach(extractMain);
