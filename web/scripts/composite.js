const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WALLS_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls';
const GALLERY_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/Gallery';
const OUTPUT_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls-composited';

// Step 1: Analyze wall mockups to find white rectangle coordinates
async function analyzeWalls() {
  console.log('Analyzing wall mockups...\n');
  const wallConfigs = {};

  for (const orientation of ['horizontal', 'vertical', 'panorama']) {
    console.log(`=== ${orientation.toUpperCase()} ===`);
    wallConfigs[orientation] = {};
    
    const orientDir = path.join(WALLS_DIR, orientation);
    const files = fs.readdirSync(orientDir).filter(f => f.endsWith('.png'));

    for (const filename of files) {
      const filepath = path.join(orientDir, filename);
      const metadata = await sharp(filepath).metadata();
      
      // Get pixel data to find white area
      const { data, info } = await sharp(filepath)
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Find white pixels (R, G, B > 250)
      let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
      let foundWhite = false;

      for (let y = 0; y < info.height; y++) {
        for (let x = 0; x < info.width; x++) {
          const idx = (y * info.width + x) * 3;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          if (r > 250 && g > 250 && b > 250) {
            foundWhite = true;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (foundWhite) {
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        wallConfigs[orientation][filename] = {
          filepath,
          mockupSize: metadata,
          whiteArea: { x: minX, y: minY, width, height },
          aspectRatio: width / height
        };
        console.log(`  ${filename}: ${width}×${height} white area at (${minX}, ${minY})`);
      }
    }
    console.log();
  }

  return wallConfigs;
}

// Step 2: Composite photo onto wall
async function compositePhotoOnWall(photoPath, wallConfig, outputPath) {
  const photoMetadata = await sharp(photoPath).metadata();
  const photoAspectRatio = photoMetadata.width / photoMetadata.height;
  const targetAspectRatio = wallConfig.whiteArea.width / wallConfig.whiteArea.height;

  let croppedPhotoBuffer;

  if (Math.abs(photoAspectRatio - targetAspectRatio) < 0.01) {
    // Aspect ratios match - just resize
    croppedPhotoBuffer = await sharp(photoPath)
      .resize(wallConfig.whiteArea.width, wallConfig.whiteArea.height, {
        fit: 'fill',
        withoutEnlargement: false
      })
      .toBuffer();
  } else if (photoAspectRatio > targetAspectRatio) {
    // Photo is wider - crop width
    const targetWidth = Math.round(photoMetadata.height * targetAspectRatio);
    const left = Math.round((photoMetadata.width - targetWidth) / 2);
    croppedPhotoBuffer = await sharp(photoPath)
      .extract({ left, top: 0, width: targetWidth, height: photoMetadata.height })
      .resize(wallConfig.whiteArea.width, wallConfig.whiteArea.height)
      .toBuffer();
  } else {
    // Photo is taller - crop height
    const targetHeight = Math.round(photoMetadata.width / targetAspectRatio);
    const top = Math.round((photoMetadata.height - targetHeight) / 2);
    croppedPhotoBuffer = await sharp(photoPath)
      .extract({ left: 0, top, width: photoMetadata.width, height: targetHeight })
      .resize(wallConfig.whiteArea.width, wallConfig.whiteArea.height)
      .toBuffer();
  }

  // Composite onto wall
  const composite = await sharp(wallConfig.filepath)
    .composite([{
      input: croppedPhotoBuffer,
      left: wallConfig.whiteArea.x,
      top: wallConfig.whiteArea.y
    }])
    .toBuffer();

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, composite);
}

// Main execution
async function main() {
  try {
    const wallConfigs = await analyzeWalls();

    console.log('\nStarting photo compositing...\n');

    // Process each location
    const locations = fs.readdirSync(GALLERY_DIR);
    let totalComposites = 0;

    for (const location of locations) {
      const locationPath = path.join(GALLERY_DIR, location);
      if (!fs.statSync(locationPath).isDirectory()) continue;

      console.log(`Processing location: ${location}`);

      // Process each orientation
      for (const orientation of ['horizontal', 'vertical', 'panorama']) {
        const orientationPath = path.join(locationPath, orientation);
        if (!fs.existsSync(orientationPath)) continue;

        const photos = fs.readdirSync(orientationPath)
          .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        console.log(`  ${orientation}: ${photos.length} photos`);

        // For each photo
        for (const photoFile of photos) {
          const photoPath = path.join(orientationPath, photoFile);
          const photoNameWithoutExt = path.parse(photoFile).name;

          // For each wall mockup of this orientation
          for (const wallFile in wallConfigs[orientation]) {
            const wallConfig = wallConfigs[orientation][wallFile];
            const wallNameWithoutExt = path.parse(wallFile).name;
            
            const outputPath = path.join(
              OUTPUT_DIR,
              orientation,
              location,
              `${photoNameWithoutExt}__on__${wallNameWithoutExt}.png`
            );

            await compositePhotoOnWall(photoPath, wallConfig, outputPath);
            totalComposites++;
          }
        }
      }
    }

    console.log(`\n✓ Created ${totalComposites} composite images in ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
