import { Metadata } from "next";

import HomeScreen from "@/screen/HomeScreen";
import { getVideos } from "@/shared/server/videos";

export const metadata: Metadata = {
  title: "Видео в категории: ",
  description: "A simple youtube clone built with Next.js and TypeScript.",
};

type CategoryIdPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params;
  const { videos } = await getVideos(categoryId);

  return (
    <div>
      <HomeScreen videos={videos} />
    </div>
  );
}
