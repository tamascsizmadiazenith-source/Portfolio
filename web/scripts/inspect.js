const sharp = require('sharp');

async function inspect() {
  const img = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .metadata();
  
  console.log(`Image size: ${img.width}×${img.height}`);
  console.log(`Image format: ${img.format}`);
  
  // Extract center area to analyze
  const { data } = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .extract({
      left: Math.max(0, img.width / 2 - 300),
      top: Math.max(0, img.height / 2 - 300),
      width: 600,
      height: 600
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  // Scan for white pixels
  console.log('\nScanning for white area...');
  let whiteCount = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i+1], b = data[i+2];
    if (r > 240 && g > 240 && b > 240) whiteCount++;
  }
  console.log(`White pixels in center: ${whiteCount}/${data.length/3}`);
}

inspect().catch(console.error);
