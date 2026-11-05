const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WALLS_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls';
const GALLERY_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/Gallery';
const OUTPUT_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls-composited';

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
      
      // Get pixel data with larger threshold for white detection
      const { data, info } = await sharp(filepath)
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Find largest contiguous white rectangle
      const width = info.width;
      const height = info.height;
      
      // Build a 2D map of white pixels
      const whiteMap = Array(height).fill(null).map(() => Array(width).fill(false));
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 3;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          // Consider as white if all channels > 240
          if (r > 240 && g > 240 && b > 240) {
            whiteMap[y][x] = true;
          }
        }
      }

      // Find largest rectangular region of white pixels
      let maxArea = 0;
      let bestRect = { x: 0, y: 0, width: 1, height: 1 };

      // For each starting point
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!whiteMap[y][x]) continue;

          // Try expanding right to find row width
          let rowWidth = 1;
          while (x + rowWidth < width && whiteMap[y][x + rowWidth]) {
            rowWidth++;
          }

          // Try expanding down with this width
          let rowHeight = 1;
          for (let checkY = y + 1; checkY < height; checkY++) {
            let allWhite = true;
            for (let checkX = 0; checkX < rowWidth; checkX++) {
              if (!whiteMap[checkY][x + checkX]) {
                allWhite = false;
                break;
              }
            }
            if (allWhite) {
              rowHeight++;
            } else {
              break;
            }
          }

          const area = rowWidth * rowHeight;
          if (area > maxArea && rowWidth > 50 && rowHeight > 50) { // Min size threshold
            maxArea = area;
            bestRect = { x, y, width: rowWidth, height: rowHeight };
          }
        }
      }

      wallConfigs[orientation][filename] = {
        filepath,
        mockupSize: metadata,
        whiteArea: { 
          x: bestRect.x, 
          y: bestRect.y, 
          width: bestRect.width, 
          height: bestRect.height 
        },
        aspectRatio: bestRect.width / bestRect.height
      };
      
      console.log(`  ${filename}: ${bestRect.width}×${bestRect.height} white area at (${bestRect.x}, ${bestRect.y})`);
    }
    console.log();
  }

  return wallConfigs;
}

async function compositePhotoOnWall(photoPath, wallConfig, outputPath) {
  try {
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
  } catch (error) {
    console.error(`Error processing ${photoPath}:`, error.message);
  }
}

async function main() {
  try {
    // Clear old output if exists
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true });
    }

    const wallConfigs = await analyzeWalls();

    console.log('\nStarting photo compositing...\n');

    const locations = fs.readdirSync(GALLERY_DIR);
    let totalComposites = 0;

    for (const location of locations) {
      const locationPath = path.join(GALLERY_DIR, location);
      if (!fs.statSync(locationPath).isDirectory()) continue;

      console.log(`Processing location: ${location}`);

      for (const orientation of ['horizontal', 'vertical', 'panorama']) {
        const orientationPath = path.join(locationPath, orientation);
        if (!fs.existsSync(orientationPath)) continue;

        const photos = fs.readdirSync(orientationPath)
          .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        console.log(`  ${orientation}: ${photos.length} photos`);

        for (const photoFile of photos) {
          const photoPath = path.join(orientationPath, photoFile);
          const photoNameWithoutExt = path.parse(photoFile).name;

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
