import { Suspense } from "react";

import HomeScreen from "@/screen/HomeScreen";
import { getVideos } from "@/shared/server/videos";

const HomePage = async () => {
  const { videos, categories } = await getVideos();

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomeScreen videos={videos} categories={categories} />
    </Suspense>
  );
};

export default HomePage;
