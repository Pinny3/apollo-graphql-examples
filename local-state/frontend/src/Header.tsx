import * as React from "react";
import * as styles from "./Header.scss";
import BeerChooser from "./BeerChooser";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => (
  <header className={styles.Header}>
    {/* <div className={styles.UpperHeader}>{children}</div> */}
    <div className={styles.MainHeader}>
      <h1>Beer Rating</h1>
    </div>
    <BeerChooser />
  </header>
);

export default Header;
