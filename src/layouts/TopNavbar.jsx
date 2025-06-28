import styles from "./TopNavbar.module.css";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import ButtomDrawer from "./ButtomDrawer";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaBars } from "react-icons/fa";

export default function TopNavbar({ children }) {
  const [sideDrawToggle, setSideDrawToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or prefer-color-scheme for initial value
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return JSON.parse(savedMode);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

    // Toggle and persist dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    // Apply to document body
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const profile = {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Anna Bai",
    post: "Founder",
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

    // Set initial dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <>
      <div className={clsx(styles.container, isDarkMode ? styles.dark : "")}>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <FaBars
              className={sideDrawToggle ? styles.menuHide : styles.menus}
              onClick={() => setSideDrawToggle(true)}
            />
            <div className={styles.logo}>SKYYSKILL ACADEMY</div>
          </div>
          <div className={styles.right}>
            <div className={styles.iconBox} onClick={toggleFullscreen}>
              {isFullscreen ? (
                <MdFullscreenExit className={styles.icon} />
              ) : (
                <MdFullscreen className={styles.icon} />
              )}
            </div>
            <div className={styles.iconBox} onClick={toggleDarkMode}>
              {" "}
              {isDarkMode ? (
                <MdLightMode className={styles.icon} />
              ) : (
                <MdDarkMode className={styles.icon} />
              )}
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

      <ButtomDrawer
        sideDrawToggle={sideDrawToggle}
        setSideDrawToggle={setSideDrawToggle}
      />

      <div>{children}</div>
    </>
  );
}
