import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Navbar />
    </div>
  );
};

export default Header;
