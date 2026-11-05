const sharp = require('sharp');

async function measure() {
  const { data, info } = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Scan the middle horizontal line to find white region start/end
  const y = Math.floor(info.height / 2);
  console.log(`\nScanning horizontal line at y=${y}:`);
  
  let inWhite = false;
  let whiteStart = -1;
  for (let x = 0; x < info.width; x++) {
    const idx = (y * info.width + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const white = r > 240 && g > 240 && b > 240;
    
    if (white && !inWhite) {
      whiteStart = x;
      inWhite = true;
    } else if (!white && inWhite) {
      console.log(`  White region: x=${whiteStart} to x=${x-1} (width=${x - whiteStart})`);
      inWhite = false;
    }
  }

  // Scan vertical line through middle to find frame top/bottom
  const x = Math.floor(info.width / 2);
  console.log(`\nScanning vertical line at x=${x}:`);
  
  inWhite = false;
  let frameStart = -1;
  for (let y = 0; y < info.height; y++) {
    const idx = (y * info.width + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const white = r > 240 && g > 240 && b > 240;
    
    if (white && !inWhite) {
      frameStart = y;
      inWhite = true;
    } else if (!white && inWhite) {
      console.log(`  White region: y=${frameStart} to y=${y-1} (height=${y - frameStart})`);
      inWhite = false;
    }
  }
}

measure();
