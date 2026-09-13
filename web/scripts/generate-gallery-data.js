const fs = require("fs");
const path = require("path");

// Source of truth for discovery (folder/category/title structure) — full-resolution
// originals, gitignored, present only on machines that have the photo library.
const photosDir = path.join(process.cwd(), "public", "photos");
const galleryDir = path.join(photosDir, "Gallery");
const favoriteFolder = "favorites";
const slideshowFolder = "slideshow";

// Web root the generated URLs point at — committed, optimized copies (see optimize-images.js).
const webPhotosSegment = "photos-web";

const galleryOutputFile = path.join(process.cwd(), "src", "data", "gallery-photos.ts");
const slideshowOutputFile = path.join(process.cwd(), "src", "data", "slideshow-photos.ts");

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

// Tailwind gradient accents per category slug, used as a placeholder background while images load.
const ACCENTS = {
  adventure: "bg-gradient-to-br from-amber-900 via-stone-800 to-slate-950",
  austria: "bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-950",
  birdeye: "bg-gradient-to-br from-sky-900 via-slate-800 to-slate-950",
  france: "bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-950",
  germany: "bg-gradient-to-br from-teal-900 via-slate-800 to-slate-950",
  himalayas: "bg-gradient-to-br from-cyan-900 via-slate-800 to-indigo-950",
  hungary: "bg-gradient-to-br from-rose-900 via-slate-800 to-slate-950",
  italy: "bg-gradient-to-br from-orange-900 via-slate-800 to-slate-950",
  "la-palma-canaries": "bg-gradient-to-br from-red-900 via-slate-800 to-slate-950",
  nightscape: "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950",
  norway: "bg-gradient-to-br from-blue-900 via-slate-800 to-slate-950",
  scotland: "bg-gradient-to-br from-green-900 via-slate-800 to-slate-950",
  slowenia: "bg-gradient-to-br from-lime-900 via-slate-800 to-slate-950",
  "swiss-alps": "bg-gradient-to-br from-sky-950 via-slate-800 to-slate-950",
  wildlife: "bg-gradient-to-br from-amber-950 via-stone-800 to-slate-950",
};
const DEFAULT_ACCENT = "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950";

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isImageFile(name) {
  return !name.startsWith(".") && IMAGE_EXT.test(name);
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith(".") && fs.statSync(path.join(dir, name)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => isImageFile(name) && fs.statSync(path.join(dir, name)).isFile())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function toPublicPath(...segments) {
  return "/" + segments.map((segment) => encodeURIComponent(segment)).join("/");
}

function readFavoriteNames() {
  return new Set(
    listImageFiles(path.join(photosDir, favoriteFolder)).map((name) => name.toLowerCase()),
  );
}

// Each subfolder of public/photos/Gallery is a category; each file name (minus extension) is the photo title.
function generateGalleryData() {
  const favoriteNames = readFavoriteNames();
  const categoryFolders = listDirs(galleryDir);

  const photoItems = categoryFolders.flatMap((folder) => {
    const categoryLabel = folder;
    const category = slugify(folder);
    const files = listImageFiles(path.join(galleryDir, folder));

    return files.map((file) => {
      const title = path.basename(file, path.extname(file));
      return {
        id: `${category}-${slugify(title)}`,
        title,
        category,
        categoryLabel,
        isFavorite: favoriteNames.has(file.toLowerCase()),
        description: `${categoryLabel} collection`,
        location: categoryLabel,
        image: toPublicPath(webPhotosSegment, "Gallery", folder, file),
        accent: ACCENTS[category] || DEFAULT_ACCENT,
      };
    });
  });

  const output =
    `export type PhotoItem = {\n` +
    `  id: string;\n` +
    `  title: string;\n` +
    `  category: string;\n` +
    `  categoryLabel: string;\n` +
    `  isFavorite: boolean;\n` +
    `  description: string;\n` +
    `  location: string;\n` +
    `  image: string;\n` +
    `  accent: string;\n` +
    `};\n\n` +
    `export const photoItems: PhotoItem[] = ${JSON.stringify(photoItems, null, 2)};\n`;

  fs.mkdirSync(path.dirname(galleryOutputFile), { recursive: true });
  fs.writeFileSync(galleryOutputFile, output, "utf8");
  console.log(
    `Generated ${photoItems.length} gallery items across ${categoryFolders.length} categories to ${galleryOutputFile}`,
  );

  return photoItems;
}

// Home page hero slideshow, sourced from public/photos/slideshow; captions are resolved
// by matching each file name back to its gallery entry to recover the category label.
function generateSlideshowData(photoItems) {
  const byTitle = new Map(photoItems.map((item) => [item.title.toLowerCase(), item]));

  const slideFiles = listImageFiles(path.join(photosDir, slideshowFolder));
  const slides = slideFiles.map((file) => {
    const title = path.basename(file, path.extname(file));
    const match = byTitle.get(title.toLowerCase());
    return {
      image: toPublicPath(webPhotosSegment, slideshowFolder, file),
      caption: match ? `${match.categoryLabel} \u2014 ${match.title}` : title,
    };
  });

  const output =
    `export type SlideshowPhoto = {\n` +
    `  image: string;\n` +
    `  caption: string;\n` +
    `};\n\n` +
    `export const slideshowPhotos: SlideshowPhoto[] = ${JSON.stringify(slides, null, 2)};\n`;

  fs.mkdirSync(path.dirname(slideshowOutputFile), { recursive: true });
  fs.writeFileSync(slideshowOutputFile, output, "utf8");
  console.log(`Generated ${slides.length} slideshow entries to ${slideshowOutputFile}`);
}

if (!fs.existsSync(photosDir)) {
  console.log(
    `No ${photosDir} folder found (expected on deploy environments) — keeping existing generated data files as-is.`,
  );
} else {
  const photoItems = generateGalleryData();
  generateSlideshowData(photoItems);
}
