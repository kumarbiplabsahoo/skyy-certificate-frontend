import styles from "./TopNavbar.module.css";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import ButtomDrawer from "./ButtomDrawer";
import BasicMenu from "../components/ui/menuItem";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { FaBars } from "react-icons/fa";
import profileImage from "../assets/images/profile.jpeg";
import roundLogo from "../assets/icons/whiteicon.png";
import { UseAuth } from "../hooks/useAuth";

export default function TopNavbar({ children }) {
  const { setlogout } = UseAuth();
  const [sideDrawToggle, setSideDrawToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or prefer-color-scheme for initial value
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) return JSON.parse(savedMode);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Toggle and persist dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    // Apply to document body
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const profile = {
    email: "abbabai@gmail.com",
  };

  // toggle menu for profile icon
  const toggleMenu = (e) => {
    e.stopPropagation(); // avoid triggering document listener
    setAnchorEl(e.currentTarget); // 👈 set the clicked button as anchor
    setOpen((prev) => !prev);
  };
  const closeMenu = () => setOpen(false); //close profile menu
  const handleProfile = () => alert("profile handling");
  // items for profile menu
  const defaultMenuItems = [
    { icon: <FaUserCircle />, label: "Profile", onClick: handleProfile },

    {
      icon: <BsChatDots />,
      label: "message",
    },
    {
      icon: <FiSettings />,
      label: "Setting",
    },

    { divider: true },
    {
      icon: <FiLogOut />,
      label: "Logout",
      danger: true,
      onClick: setlogout,
    },
  ];
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
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
            <div>
              <img
                src={roundLogo}
                alt="skyskill logo"
                className={styles.roundLogo}
              />
            </div>
            <div className={styles.logo}>SKYYSKILL ACADEMY</div>
          </div>
          <div className={styles.logo}>LMS</div>

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
            <div className={styles.profile} onClick={toggleMenu}>
              <img src={profileImage} alt="Profile" className={styles.avatar} />
              <div>
                <h4>
                  {profile.email?.length > 6
                    ? `${profile.email.slice(0, 15)}...`
                    : profile.email}
                </h4>
                <p>Admin</p>
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
      {open && (
        <BasicMenu
          anchorEl={anchorEl}
          menuRef={menuRef}
          closeMenu={closeMenu}
          menuItems={defaultMenuItems}
        />
      )}
    </>
  );
}
