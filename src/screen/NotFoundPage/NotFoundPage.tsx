import Image from "next/image";
import Link from "next/link";

import Logo from "@/shared/assets/icons/youtube-icon.svg";
import NotFoundImage from "@/shared/assets/img/monkey.png";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFound}>
        <Image
          unoptimized
          className={styles.image}
          src={NotFoundImage}
          alt={"not-found"}
        />
        <p>Эта страница недоступна</p>
        <p>Подсказать что-то ?</p>

        <Link href="/" className={styles.link}>
          <Image src={Logo} alt={"Логотип компании"} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
