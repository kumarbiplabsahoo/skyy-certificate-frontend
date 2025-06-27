import styles from "./ButtomDrawer.module.css";
import clsx from "clsx";
import {
  FaChevronDown,
  FaCertificate,
  FaBook,
  FaClock,
  FaGraduationCap,
  FaUserTie,
  FaTimes
} from "react-icons/fa";

export default function ButtomDrawer({sideDrawToggle,setSideDrawToggle}) {
  const navItems = [
    { label: "Certificate", icon: <FaCertificate />, active: true },
    { label: "Free Course Certificate", icon: <FaBook /> },
    { label: "Short Term Certificate", icon: <FaClock /> },
    { label: "Long Term Certificate", icon: <FaGraduationCap /> },
    { label: "Faculty Related Certificate", icon: <FaUserTie /> },
  ];

  return (
    <>
      <div className={styles.buttoDdrawer}>
        <nav className={styles.navbar}>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              <FaChevronDown className={styles.chevron} />
            </div>
          ))}
        </nav>
      </div>
      <div className={clsx(styles.sideDrawer,sideDrawToggle? styles.open:styles.close)}>
        <nav className={styles.navbar}>
          <div className={styles.cancel}>
          <FaTimes onClick={()=>setSideDrawToggle(false)}/>
        </div>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              <FaChevronDown className={styles.chevron} />
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
