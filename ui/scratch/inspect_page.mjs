import fs from 'fs';

async function main() {
  const res = await fetch('https://mixhotel.vn', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  
  // Find all css links
  const cssMatches = [...html.matchAll(/href=["']([^"']+\.css[^"']*)["']/g)].map(m => m[1]);
  console.log('CSS Links:', cssMatches);

  // Check footer or last sections
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
  if (footerMatch) {
    console.log('Found <footer> tag length:', footerMatch[0].length);
    fs.writeFileSync('scratch/live_footer.html', footerMatch[0]);
  } else {
    console.log('No <footer> tag found, checking last 5000 chars of body:');
    const bodyEnd = html.slice(html.lastIndexOf('</body>') - 4000, html.lastIndexOf('</body>'));
    console.log(bodyEnd);
  }

  // Also check floating widget or contact bar
  const floatingMatches = html.match(/class=["'][^"']*(?:float|contact|hotline|zalo|mess|sticky)[^"']*["']/gi);
  console.log('Floating/Contact matches:', [...new Set(floatingMatches)]);
}

main().catch(console.error);
