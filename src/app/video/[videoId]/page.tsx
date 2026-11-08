import { Suspense } from "react";
import { notFound } from "next/navigation";

import VideoScreen from "@/page/VideoPage";
import { getVideoById } from "@/shared/server/videos";

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
