import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryChapterPage from "@/components/gallery/GalleryChapterPage";
import { categoryLabelByValue, categorySlugs, isGalleryCategory } from "@/lib/gallery-categories";

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabelByValue.get(category) ?? category;
  return {
    title: `${label} | Tamás Csizmadia`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isGalleryCategory(category)) notFound();

  return <GalleryChapterPage category={category} />;
}
