import { Metadata } from "next";

import HomeScreen from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { getVideos } from "@/shared/server/videos";

type MetadataProps = {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { categoryId } = await params;

  const activeCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!activeCategory) {
    return {
      title: `Неизвестная катеогрия видео`,
    };
  }

  return {
    title: `Видео в категории: ${activeCategory?.title}`,
  };
}

type CategoryIdPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params;
  const { videos } = await getVideos(categoryId);

  const anotherCategories = VIDEO_CATEGORIES.filter(
    ({ id }) => id !== categoryId,
  );

  return <HomeScreen videos={videos} categories={anotherCategories} />;
}
