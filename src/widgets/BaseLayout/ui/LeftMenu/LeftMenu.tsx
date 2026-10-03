import Link from "next/link";

import styles from "./LeftMenu.module.css";

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.nav}>
        <Link href="/editor/addVideo">Добавить видео</Link>
        <Link href="/profile/1">Добавить профиль</Link>
      </nav>
    </aside>
  );
};

export default LeftMenu;
