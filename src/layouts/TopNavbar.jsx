import styles from "./TopNavbar.module.css";
import { FaExpand, FaMoon } from "react-icons/fa";
import ButtomDrawer from "./ButtomDrawer";
import { useState } from "react";
import clsx from "clsx";
export default function TopNavbar() {
  const [darkMode,setDarkMode]=useState(false);
  const profile = {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Bai",
    post: "Founder",
  };
  return (
    <>
      <div className={clsx(styles.container,darkMode? styles.dark:"")}>
        <div className={styles.navbar}>
          <div className={styles.logo}>SKYYSKILL ACADEMY</div>

          <div className={styles.right}>
            <FaExpand className={styles.icon} />
            <FaMoon className={styles.icon} onClick={()=>setDarkMode(!darkMode)}/>
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
                    ? `${profile.name.slice(0, 6)}...`
                    : profile.name}
                </h4>
                <p>{profile.post}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ButtomDrawer />
    </>
  );
}
