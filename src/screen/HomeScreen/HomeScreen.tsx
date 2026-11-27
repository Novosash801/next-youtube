import Link from "next/link";

import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetAllVideosDto } from "@/shared/types/serverTypes";
import VideosList from "@/widgets/VideosLIst";

import styles from "./HomeScreen.module.css";

type HomeScreenProps = {
  videos: GetAllVideosDto["videos"];
  categories: typeof VIDEO_CATEGORIES;
};

const HomeScreen = ({ videos, categories }: HomeScreenProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesContainer}>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <Link
              href={category.id !== "all" ? `/${category.id}` : "/"}
              key={category.id}
              className={styles.categoryLink}
            >
              {category.title}
            </Link>
          ))}
      </div>

      <VideosList videos={videos} />
    </div>
  );
};

export default HomeScreen;
