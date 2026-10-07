import Image from "next/image";

import NotFoundImage from "@/shared/assets/img/not-found.gif";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFound}>
        <Image
          className={styles.image}
          src={NotFoundImage}
          width={500}
          alt={"not-found"}
        />
        <h1 className={styles.title}>404 - Страница не найдена</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
