import styles from "./ButtomDrawer.module.css";
import clsx from "clsx";
import {
  FaChevronDown,
  FaBook,
  FaClock,
  FaGraduationCap,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function ButtomDrawer({ sideDrawToggle, setSideDrawToggle }) {
  const navItems = [
    { label: "Free Course Certificate", icon: <FaBook />, active: true },
    { label: "Short Term Certificate", icon: <FaClock /> },
    { label: "Long Term Certificate", icon: <FaGraduationCap /> },
    { label: "Faculty Related Certificate", icon: <FaUserTie /> },
  ];

  return (
    <>
      <div className={styles.buttoDdrawer}>
        <nav className={styles.navbar}>
          <div className={styles.navItem}>
            <span className={styles.icon}><MdDashboard/></span>
            <span className={styles.label}>Dashboard</span>
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
      <div
        className={clsx(
          styles.sideDrawer,
          sideDrawToggle ? styles.open : styles.close
        )}
      >
        <nav className={styles.navbar}>
          <div className={styles.cancel}>
            <FaTimes onClick={() => setSideDrawToggle(false)} />
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}><MdDashboard/></span>
            <span className={styles.label}>Dashboard</span>
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
