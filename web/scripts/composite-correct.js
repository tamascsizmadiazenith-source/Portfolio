const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WALLS_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls';
const GALLERY_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/Gallery';
const OUTPUT_DIR = '/Users/sphot/portfolio/Portfolio/web/public/photos/walls-composited';

// Parse mockup filename to get dimensions and calculate aspect ratio
function getAspectRatio(filename) {
  const match = filename.match(/LR_(\d+)x(\d+)/);
  if (!match) return null;
  const width = parseInt(match[1]);
  const height = parseInt(match[2]);
  return { width, height, ratio: width / height };
}

// Get white frame position centered horizontally
function getWhiteFrame(mockupWidth) {
  // Approximate white frame based on center alignment
  const frameWidth = 530;
  const frameHeight = 635;
  const x = (mockupWidth - frameWidth) / 2;
  const y = 275;
  return { x, y, width: frameWidth, height: frameHeight };
}

async function compositePhotoOnWall(photoPath, wallFilepath, wallFilename, outputPath) {
  try {
    const photoMetadata = await sharp(photoPath).metadata();
    const photoAspectRatio = photoMetadata.width / photoMetadata.height;

    // Get mockup aspect ratio
    const mockupAspectData = getAspectRatio(wallFilename);
    if (!mockupAspectData) return;

    const mockupAspectRatio = mockupAspectData.ratio;

    // Skip if aspect ratios don't match (tolerance of 5%)
    if (Math.abs(photoAspectRatio - mockupAspectRatio) / mockupAspectRatio > 0.05) {
      return;
    }

    // Get wall metadata to calculate centered white frame
    const wallMetadata = await sharp(wallFilepath).metadata();
    const WHITE_FRAME = getWhiteFrame(wallMetadata.width);

    let croppedPhotoBuffer;

    // Crop/resize photo to match the white frame exactly
    const targetAspectRatio = WHITE_FRAME.width / WHITE_FRAME.height;

    if (Math.abs(photoAspectRatio - targetAspectRatio) < 0.01) {
      // Aspect ratios match - just resize
      croppedPhotoBuffer = await sharp(photoPath)
        .resize(WHITE_FRAME.width, WHITE_FRAME.height, {
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
        .resize(WHITE_FRAME.width, WHITE_FRAME.height)
        .toBuffer();
    } else {
      // Photo is taller - crop height
      const targetHeight = Math.round(photoMetadata.width / targetAspectRatio);
      const top = Math.round((photoMetadata.height - targetHeight) / 2);
      croppedPhotoBuffer = await sharp(photoPath)
        .extract({ left: 0, top, width: photoMetadata.width, height: targetHeight })
        .resize(WHITE_FRAME.width, WHITE_FRAME.height)
        .toBuffer();
    }

    // Composite onto wall
    const composite = await sharp(wallFilepath)
      .composite([{
        input: croppedPhotoBuffer,
        left: Math.round(WHITE_FRAME.x),
        top: Math.round(WHITE_FRAME.y)
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
    // Clear old output
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('Starting photo compositing with aspect ratio matching...\n');
    console.log('Only compositing photos onto mockups with matching aspect ratios\n');

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
          .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
          .sort();

        console.log(`  ${orientation}: ${photos.length} photos`);

        // Get all wall mockups for this orientation
        const wallsDir = path.join(WALLS_DIR, orientation);
        const wallFiles = fs.readdirSync(wallsDir)
          .filter(f => f.endsWith('.png'))
          .sort();

        // For each photo
        for (const photoFile of photos) {
          const photoPath = path.join(orientationPath, photoFile);
          const photoNameWithoutExt = path.parse(photoFile).name;

          // For each wall mockup of this orientation
          for (const wallFile of wallFiles) {
            const wallFilepath = path.join(wallsDir, wallFile);
            const wallNameWithoutExt = path.parse(wallFile).name;

            const outputPath = path.join(
              OUTPUT_DIR,
              orientation,
              location,
              `${photoNameWithoutExt}__on__${wallNameWithoutExt}.png`
            );

            await compositePhotoOnWall(photoPath, wallFilepath, wallFile, outputPath);
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
