import AddVideoPage from "@/screen/AddVideoPage";
import { Metadata } from "next";

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
