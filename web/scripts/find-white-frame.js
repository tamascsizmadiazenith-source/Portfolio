const sharp = require('sharp');

async function findWhiteFrame(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  const { data } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = metadata.width;
  const height = metadata.height;
  
  // Create a stricter white map (very pure white)
  const isWhite = (r, g, b) => r > 248 && g > 248 && b > 248;
  
  // Scan with different thresholds to find clusters
  console.log(`Image: ${width}×${height}`);
  
  for (let threshold = 248; threshold >= 240; threshold--) {
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let whiteCount = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 3;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];

        if (r > threshold && g > threshold && b > threshold) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          whiteCount++;
        }
      }
    }

    if (whiteCount > 0) {
      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      const area = w * h;
      const density = (whiteCount / area * 100).toFixed(1);
      console.log(`  Threshold ${threshold}: ${w}×${h} at (${minX}, ${minY}) - ${whiteCount} pixels, density ${density}%`);
      
      // If density is high (>80%), we likely found the frame
      if (parseFloat(density) > 80) {
        console.log(`  ✓ Found frame at threshold ${threshold}`);
        break;
      }
    }
  }
}

findWhiteFrame('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png');
