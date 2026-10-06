import { ReactNode } from "react";

import Header from "../Header";
import LeftMenu from "../LeftMenu";

import styles from "./BaseLayout.module.css";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header profileId={"123"} />
      <LeftMenu />
      {children}
    </div>
  );
};

export default BaseLayout;
