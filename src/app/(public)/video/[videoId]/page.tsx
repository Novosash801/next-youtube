import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import VideoScreen from "@/screen/VideoScreen";
import { getVideoById } from "@/shared/server/videos";

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { videoId } = await params;
  const video = await getVideoById(videoId);

  if (!video) {
    return {
      title: "Видео не найдено",
    };
  }

  return {
    title: video.title,
  };
}

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;
  const video = await getVideoById(videoId);

  if (!video) {
    notFound();
  }

  return (
    <div>
      <Suspense fallback={<div>Загрузка...</div>}>
        <VideoScreen video={video} />
      </Suspense>
    </div>
  );
}

export default VideoPage;
