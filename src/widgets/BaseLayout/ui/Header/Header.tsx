import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";

type HeaderProps = {
  profileId: string;
};

const Header = ({ profileId }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/youtube-logo-icon.svg"
          alt={"logo"}
          width={100}
          height={24}
        />
      </Link>

      <div className={styles.rightPart}>
        <Link href={`/editor/addVideo`} className={styles.addVideoLink}>
          Создать
        </Link>
        <Link href={`/profile/${profileId}`} className={styles.yourProfileLink}>
          <div className={styles.hiddenText}>Перейти в профиль</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
