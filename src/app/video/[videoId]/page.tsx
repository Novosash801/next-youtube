type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;
  console.log("videoId", videoId);

  return <div>video: {videoId}</div>;
}

export default VideoPage;
