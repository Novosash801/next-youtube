import { Metadata } from "next";

import AddVideoScreen from "@/screen/AddVideoScreen/ui";

export const metadata: Metadata = {
  title: "Добавить видео",
};

function addVideoPage() {
  return (
    <div>
      <AddVideoScreen />
    </div>
  );
}

export default addVideoPage;
