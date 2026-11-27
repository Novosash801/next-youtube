'use client"';

import { GetAllVideosDto } from "@/shared/types/serverTypes";
import VideosList from "@/widgets/VideosLIst";

type MyVideoScreenProps = {
  videos: GetAllVideosDto["videos"];
};

const MyVideosScreen = ({ videos }: MyVideoScreenProps) => {
  return <VideosList videos={videos} />;
};

export default MyVideosScreen;
