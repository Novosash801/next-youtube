import { Metadata } from "next";

import MyVideosScreen from "@/screen/MyVideosScreen";
import { getVideos } from "@/shared/server/videos";

export const metadata: Metadata = {
  title: "Мои видео",
};

const MyVideosPage = async () => {
  const userId = "12345";
  const { videos } = await getVideos(null, userId);
  return (
    <div>
      <MyVideosScreen videos={videos} />
    </div>
  );
};

export default MyVideosPage;
