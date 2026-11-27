import { Metadata } from "next";

import MyVideosScreen from "@/screen/MyVideosScreen";

export const metadata: Metadata = {
  title: "Мои видео",
};

const MyVideosPage = () => {
  return (
    <div>
      <MyVideosScreen userId={userId} />
    </div>
  );
};

export default MyVideosPage;
