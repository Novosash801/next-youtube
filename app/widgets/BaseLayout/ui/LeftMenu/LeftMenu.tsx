import styles from "./LeftMenu.module.css";

const LeftMenu = () => {
  return (
    <aside className={styles.leftMenu}>
      <nav>
        <a href="http://">Главная</a>
        <a href="http://">Поиск</a>
        <a href="http://">Помощь</a>
      </nav>
    </aside>
  );
};

export default LeftMenu;
