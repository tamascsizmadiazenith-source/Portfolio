const sharp = require('sharp');

async function analyze() {
  const img = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .toFile('/tmp/mockup-analysis.png');
  
  console.log('Mockup saved to /tmp/mockup-analysis.png for visual inspection');
  
  // Get metadata
  const metadata = await sharp('/Users/sphot/portfolio/Portfolio/web/public/photos/walls/horizontal/LR_40x30.png')
    .metadata();
  
  console.log(`\nImage dimensions: ${metadata.width}×${metadata.height}`);
  console.log('\nTo properly detect the white frame, I need you to:');
  console.log('1. Open the mockup image');
  console.log('2. Identify the exact pixel coordinates of the white rectangle');
  console.log('3. Tell me the top-left (x,y) and bottom-right (x2,y2) coordinates');
}

analyze();
