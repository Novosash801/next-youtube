import styles from "./LeftMenu.module.css";

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav className={styles.nav}>
        <a>Главная</a>
        <a>Поиск</a>
        <a>Помощь</a>
      </nav>
    </aside>
  );
};

export default LeftMenu;
