import fs from "fs";
import path from "path";

const photosDir = path.join(process.cwd(), "public", "photos");
const outputFile = path.join(process.cwd(), "web", "src", "data", "gallery-photos.ts");

const collections = [
  "nightscape",
  "mountain-spirit",
  "swiss-alps",
  "norway",
  "scotland",
  "himalayas",
  "italy",
  "austria",
  "la-palma",
  "hungary",
  "nature",
  "birdeye-view",
];

const collectionLabels: Record<string, string> = {
  all: "All",
  nightscape: "Nightscape",
  "mountain-spirit": "Mountain Spirit",
  "swiss-alps": "Swiss Alps",
  norway: "Norway",
  scotland: "Scotland",
  himalayas: "Himalayas",
  italy: "Italy",
  austria: "Austria",
  "la-palma": "La Palma",
  hungary: "Hungary",
  nature: "Nature",
  "birdeye-view": "Birdeye View",
};

function slugifyId(folder: string, filename: string) {
  return `${folder}-${path.basename(filename, path.extname(filename))}`.replace(/\s+/g, "-").toLowerCase();
}

function readCollectionPhotos(folder: string) {
  const folderPath = path.join(photosDir, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter((name) => !name.startsWith(".") && !name.endsWith(".DS_Store"))
    .map((name) => ({
      name,
      path: `/photos/${folder}/${name}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

function generate() {
  const photoItems = collections.flatMap((category) => {
    const photos = readCollectionPhotos(category);
    return photos.map((photo, index) => ({
      id: slugifyId(category, photo.name),
      title: photo.name.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""),
      category,
      description: `${collectionLabels[category]} study #${index + 1}`,
      location: collectionLabels[category],
      image: photo.path,
      accent: "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950",
    }));
  });

  const output = `export type PhotoItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  image: string;
  accent: string;
};

export const photoItems: PhotoItem[] = ${JSON.stringify(photoItems, null, 2)};
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, output, "utf8");
  console.log(`Generated ${photoItems.length} gallery items to ${outputFile}`);
}

generate();
