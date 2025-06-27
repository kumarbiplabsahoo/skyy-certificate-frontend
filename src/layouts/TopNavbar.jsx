import styles from "./TopNavbar.module.css";
import { FaExpand, FaMoon } from "react-icons/fa";
import ButtomDrawer from "./ButtomDrawer";
import { useState } from "react";
import clsx from "clsx";
import { FaBars } from "react-icons/fa";
export default function TopNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [sideDrawToggle,setSideDrawToggle]=useState(false);
  const profile = {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Bai",
    post: "Founder",
  };
  return (
    <>
      <div className={clsx(styles.container, darkMode ? styles.dark : "")}>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <FaBars className={sideDrawToggle? styles.menuHide:styles.menus} onClick={()=>setSideDrawToggle(true)}/>
            <div className={styles.logo}>SKYYSKILL ACADEMY</div>
          </div>
          <div className={styles.right}>
            <div className={styles.iconBox}>
              <FaExpand className={styles.icon} />
            </div>
            <div className={styles.iconBox}>
              {" "}
              <FaMoon
                className={styles.icon}
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>
            <div className={styles.profile}>
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {profile.name?.[0].toUpperCase()}
                </div>
              )}
              <div>
                <h4>
                  {profile.name?.length > 6
                    ? `${profile.name.slice(0, 11)}...`
                    : profile.name}
                </h4>
                <p>{profile.post}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ButtomDrawer sideDrawToggle={sideDrawToggle} setSideDrawToggle={setSideDrawToggle}/>
    </>
  );
}
