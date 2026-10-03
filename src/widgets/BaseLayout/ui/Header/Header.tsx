import Image from "next/image";
import Link from "next/link";

import logo from "./image.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image className={styles.logo} src={logo} alt={"logo"} width={50} />
      </Link>
    </div>
  );
};

export default Header;
