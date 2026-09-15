import fs from 'fs';

async function downloadFont(name) {
  const url = `https://mixhotel.vn/uploads/fonts/${name}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      if (!fs.existsSync('public/fonts')) fs.mkdirSync('public/fonts', { recursive: true });
      fs.writeFileSync(`public/fonts/${name}`, Buffer.from(buffer));
      console.log(`Downloaded ${name}: ${buffer.byteLength} bytes`);
    } else {
      console.log(`Failed to download ${name}: status ${res.status}`);
    }
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  await downloadFont('Philosopher-Regular.ttf');
  await downloadFont('Philosopher-Bold.ttf');
}

main();
