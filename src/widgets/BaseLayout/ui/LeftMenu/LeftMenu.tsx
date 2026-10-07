import Image from "next/image";
import Link from "next/link";

import AddVideo from "@/shared/assets/icons/add.svg";
import Home from "@/shared/assets/icons/home.svg";
import Profile from "@/shared/assets/icons/profile.svg";

import styles from "./LeftMenu.module.css";

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          <Image className={styles.icon} src={Home} alt={"home"} width={24} height={24} />
          Главная
        </Link>
        <Link href="/profile/1" className={styles.link}>
          <Image className={styles.icon} src={Profile} alt={"profile"} width={24} height={24} />
          Профиль
        </Link>

        <Link href="/editor/addVideo" className={styles.link}>
          <Image className={styles.icon} src={AddVideo} alt={"add-video"} width={24} height={24} />
          Добавить видео
        </Link>
        <Link href="/profile/1" className={styles.link}>
          <Image className={styles.icon} src={Profile} alt={"profile"} width={24} height={24} />
          Ваши видео
        </Link>
      </nav>
    </aside>
  );
};

export default LeftMenu;
