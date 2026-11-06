import { photoItems, type PhotoItem } from "@/data/gallery-photos";

// Category slugs and labels are derived from whatever folders exist under
// public/photos/Gallery, so a folder rename/removal never needs a manual update here.
export const categoryLabelByValue = new Map<string, string>();
for (const item of photoItems) {
  if (!categoryLabelByValue.has(item.category)) {
    categoryLabelByValue.set(item.category, item.categoryLabel);
  }
}

export const categorySlugs = Array.from(categoryLabelByValue.keys());

export const photosByCategory = new Map<string, PhotoItem[]>();
for (const item of photoItems) {
  const list = photosByCategory.get(item.category);
  if (list) list.push(item);
  else photosByCategory.set(item.category, [item]);
}

export function isGalleryCategory(value: string): boolean {
  return categoryLabelByValue.has(value);
}
