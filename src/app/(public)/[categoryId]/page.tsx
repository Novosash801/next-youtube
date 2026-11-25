import { Metadata } from "next";
import { notFound } from "next/navigation";

import HomeScreen from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { getVideos } from "@/shared/server/videos";

type CategoryIdPageProps = {
  params: Promise<{ categoryId: string }>;
};

type MetadataProps = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({
  params,
}: CategoryIdPageProps): Promise<Metadata> {
  const { categoryId } = await params;

  const activeCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!activeCategory) {
    return {
      title: "Категория не найдена",
    };
  }

  return {
    title: `Видео в категории: ${activeCategory?.title}`,
  };
}

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params;
  const { videos } = await getVideos(categoryId);

  const activeCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!activeCategory) return notFound();

  const anotherCategories = VIDEO_CATEGORIES.filter(
    ({ id }) => id !== categoryId,
  );

  return <HomeScreen videos={videos} categories={anotherCategories} />;
}
