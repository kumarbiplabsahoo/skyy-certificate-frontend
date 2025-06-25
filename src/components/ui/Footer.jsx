import React from "react";
import styles from "../../assets/styles/ui/Footer.module.css";

const Footer = ({ academyName, brandName, currentYear,...pros }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          &copy; {currentYear || new Date().getFullYear()}{" "}
          {academyName || "Skyyskill Academy"}. Crafted with{" "}
          <span className={styles.heart}>❤️</span> by {brandName}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
