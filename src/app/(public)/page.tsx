import { Suspense } from "react";

import HomeScreen from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { getVideos } from "@/shared/server/videos";

const HomePage = async () => {
  const { videos, categories } = await getVideos();

  const searchedCategories = VIDEO_CATEGORIES.filter(({ id }) => categories.includes(id));

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomeScreen videos={videos} categories={searchedCategories} />
    </Suspense>
  );
};

export default HomePage;
