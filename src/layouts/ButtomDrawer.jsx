import styles from "./ButtomDrawer.module.css";
import {
  FaChevronDown,
  FaCertificate,
  FaBook,
  FaClock,
  FaGraduationCap,
  FaUserTie,
} from "react-icons/fa";

export default function ButtomDrawer() {
  const navItems = [
    { label: "Certificate", icon: <FaCertificate />, active: true },
    { label: "Free Course Certificate", icon: <FaBook /> },
    { label: "Short Term Certificate", icon: <FaClock /> },
    { label: "Long Term Certificate", icon: <FaGraduationCap /> },
    { label: "Faculty Related Certificate", icon: <FaUserTie /> },
  ];

  return (
    <div className={styles.drawer}>
      <nav className={styles.navbar}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            <FaChevronDown className={styles.chevron} />
          </div>
        ))}
      </nav>
    </div>
  );
}
