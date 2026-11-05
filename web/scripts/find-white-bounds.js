const sharp = require('sharp');
const fs = require('fs');

async function findWhiteBounds(imagePath) {
  const metadata = await sharp(imagePath).metadata();
  const { data } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = metadata.width;
  const height = metadata.height;
  
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let whiteCount = 0;

  // Scan all pixels for white (with some tolerance)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Near-white pixels (allowing slight gray variation)
      if (r > 235 && g > 235 && b > 235) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        whiteCount++;
      }
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    whitePixels: whiteCount,
    pct: (whiteCount / (width * height) * 100).toFixed(2)
  };
}

async function main() {
  const testFile = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png';
  const bounds = await findWhiteBounds(testFile);
  console.log('White rectangle bounds:', bounds);
}

main();
