import VideoScreen from "@/screen/VideoPage";

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  return (
    <div>
      <VideoScreen videoId={videoId} />
    </div>
  );
}

export default VideoPage;
