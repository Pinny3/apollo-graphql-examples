import * as React from "react";
import * as styles from "./Footer.scss";

const GITHUB_REPO = "https://github.com/nilshartmann/apollo-graphql-examples";

interface FooterProps {}
const Footer = () => (
  <footer className={styles.Footer}>
    <a href={GITHUB_REPO} target="_blank">
      {GITHUB_REPO}
    </a>
  </footer>
);

export default Footer;