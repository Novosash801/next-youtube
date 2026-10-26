import { Metadata } from "next";

import AddVideoPage from "@/page/AddVideoPage";

export const metadata: Metadata = {
  title: "Добавить видео",
};

function addVideoPage() {
  return (
    <div>
      <AddVideoPage />
    </div>
  );
}

export default addVideoPage;
