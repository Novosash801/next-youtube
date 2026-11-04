import HomePage from "@/page/HomePage";
import { getVideos } from "@/shared/server/videos";

const Home = async () => {
  const data = await getVideos();

  return <HomePage data={data} />;
};

export default Home;
