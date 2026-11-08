import { Suspense } from "react";

import HomePage from "@/page/HomePage";
import { getVideos } from "@/shared/server/videos";

const Home = async () => {
  const data = await getVideos();

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomePage data={data} />
    </Suspense>
  );
};

export default Home;
