const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Mirrors public/photos/** into public/photos-web/** as resized, compressed JPEGs.
// Originals in public/photos are full-resolution masters (multi-GB) and are gitignored;
// public/photos-web is what actually ships to the deployed site.

const SRC_ROOT = path.join(process.cwd(), "public", "photos");
const DEST_ROOT = path.join(process.cwd(), "public", "photos-web");

const MAX_DIMENSION = 2400; // long edge, px
const JPEG_QUALITY = 82;

const IMAGE_EXT = /\.(jpe?g|png)$/i;

function isImageFile(name) {
  return !name.startsWith(".") && IMAGE_EXT.test(name);
}

function walk(dir, relDir = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(path.join(dir, entry.name), rel));
    } else if (entry.isFile() && isImageFile(entry.name)) {
      files.push(rel);
    }
  }
  return files;
}

async function optimizeOne(relPath) {
  const srcPath = path.join(SRC_ROOT, relPath);
  const destPath = path.join(DEST_ROOT, relPath);

  const srcStat = fs.statSync(srcPath);
  if (fs.existsSync(destPath)) {
    const destStat = fs.statSync(destPath);
    if (destStat.mtimeMs >= srcStat.mtimeMs) {
      return { relPath, skipped: true };
    }
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const isPng = /\.png$/i.test(relPath);
  const pipeline = sharp(srcPath).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (isPng) {
    await pipeline.png({ quality: JPEG_QUALITY, compressionLevel: 9 }).toFile(destPath);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(destPath);
  }

  return { relPath, skipped: false, srcBytes: srcStat.size, destBytes: fs.statSync(destPath).size };
}

async function main() {
  if (!fs.existsSync(SRC_ROOT)) {
    console.log(`No source folder at ${SRC_ROOT}, nothing to optimize.`);
    return;
  }

  const relPaths = walk(SRC_ROOT);
  console.log(`Found ${relPaths.length} source images. Optimizing (max ${MAX_DIMENSION}px, q${JPEG_QUALITY})...`);

  let done = 0;
  let skipped = 0;
  let srcTotal = 0;
  let destTotal = 0;

  // Limit concurrency so we don't blow up memory decoding many huge images at once.
  const CONCURRENCY = 4;
  let index = 0;

  async function worker() {
    while (index < relPaths.length) {
      const i = index++;
      const relPath = relPaths[i];
      try {
        const result = await optimizeOne(relPath);
        if (result.skipped) {
          skipped++;
        } else {
          done++;
          srcTotal += result.srcBytes;
          destTotal += result.destBytes;
        }
        if ((done + skipped) % 20 === 0) {
          console.log(`  ${done + skipped}/${relPaths.length} processed...`);
        }
      } catch (err) {
        console.error(`  Failed: ${relPath}: ${err.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const fmtMb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(
    `Done. Optimized ${done}, skipped ${skipped} (already up to date). ` +
      (srcTotal ? `${fmtMb(srcTotal)}MB -> ${fmtMb(destTotal)}MB.` : ""),
  );
}

main();
