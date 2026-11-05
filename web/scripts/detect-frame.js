const sharp = require('sharp');

async function detectFrame() {
  const { data, info } = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Use threshold that catches the light/white areas
  const threshold = 235;
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  let count = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      
      if (r > threshold && g > threshold && b > threshold) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        count++;
      }
    }
  }

  console.log(`Light/white region detected:`);
  console.log(`  Position: (${minX}, ${minY})`);
  console.log(`  Size: ${maxX - minX + 1}×${maxY - minY + 1}`);
  console.log(`  Pixels: ${count}`);
  
  // The white artwork frame is probably in the center of this region
  // Let's narrow it down by looking at the densest area
  const regionWidth = maxX - minX + 1;
  const regionHeight = maxY - minY + 1;
  
  // Look at center 60% of the detected region for tighter bounds
  const leftBorder = minX + Math.round(regionWidth * 0.2);
  const rightBorder = maxX - Math.round(regionWidth * 0.2);
  const topBorder = minY + Math.round(regionHeight * 0.15);
  const bottomBorder = maxY - Math.round(regionHeight * 0.15);
  
  console.log(`\nTightened bounds (center 60%):`);
  console.log(`  Position: (${leftBorder}, ${topBorder})`);
  console.log(`  Size: ${rightBorder - leftBorder}×${bottomBorder - topBorder}`);
}

detectFrame();
