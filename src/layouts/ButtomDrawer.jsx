import styles from "./ButtomDrawer.module.css";
import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import {
  FaGift,
  FaCertificate,
  FaUniversity,
  FaMoneyBillWave,
  FaClock,
  FaGraduationCap,
  FaFileAlt,
  FaBriefcase,
  FaIdBadge,
  FaCheckCircle,
  FaUserTie,
  FaChalkboardTeacher,
  FaBook,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NestedHoverMenu from "../components/ui/NestedHoverMenu";
import { useNavigate } from "react-router-dom";

export default function ButtomDrawer({ sideDrawToggle, setSideDrawToggle }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const timeoutRef = useRef(null);
  const anchorRefs = useRef([]);
  const drawerRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setSideDrawToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSideDrawToggle]);

  const handleEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredIndex(null);
    }, 300);
  };

  const toggleMobileMenu = (index) => {
    if (activeMobileMenu === index) {
      setActiveMobileMenu(null);
    } else {
      setActiveMobileMenu(index);
    }
  };

  const navItems = [
    { label: "Dashboard", icon: <MdDashboard />, onClick: () => navigate("/") },
    { label: "Free Course Certificate", icon: <FaBook />, hasSubmenu: true },
    { label: "Short Term Certificate", icon: <FaClock />, hasSubmenu: true },
    {
      label: "Long Term Certificate",
      icon: <FaGraduationCap />,
      hasSubmenu: true,
    },
    {
      label: "Faculty Related Certificate",
      icon: <FaUserTie />,
      hasSubmenu: true,
    },
  ];

  // Submenus
  const menuItemsMap = {
    1: [
      {
        label: "Free",
        icon: <FaGift />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => navigate("/single/free"),
          },
          { label: "Bulk", icon: "📁", onClick: () => navigate("/bulk/free") },
        ],
      },
      {
        label: "ASDC",
        icon: <FaCertificate />,
        submenu: [
          { label: "Single", icon: "📄", onClick: () => navigate("/single/asdc") },
          { label: "Bulk", icon: "📁", onClick: () => alert("ASDC Bulk") },
        ],
      },
      {
        label: "College",
        icon: <FaUniversity />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => navigate("/single/college"),
          },
          { label: "Bulk", icon: "📁", onClick: () => alert("College Bulk") },
        ],
      },
      {
        label: "Paid",
        icon: <FaMoneyBillWave />,
        submenu: [
          { label: "Single", icon: "📄", onClick: () => navigate("/single/paid") },
          { label: "Bulk", icon: "📁", onClick: () => alert("Paid Bulk") },
        ],
      },
    ],
    2: [
      {
        label: "Short Term",
        icon: <FaClock />,
        submenu: [
          { label: "Single", icon: "📄", onClick: () => navigate("/single/shortterm") },
          { label: "Bulk", icon: "📁", onClick: () => alert("Short Bulk") },
        ],
      },
    ],
    3: [
      {
        label: "PGP",
        icon: <FaGraduationCap />,
        submenu: [
          { label: "Single", icon: "📄", onClick: () => navigate("/single/pgp") },
          { label: "Bulk", icon: "📁", onClick: () => alert("PGP Bulk") },
        ],
      },
      {
        label: "LOR",
        icon: <FaFileAlt />,
        submenu: [
          { label: "Single", icon: "📄", onClick: () => navigate("/single/lor")},
          { label: "Bulk", icon: "📁", onClick: () => alert("LOR Bulk") },
        ],
      },
      {
        label: "Internship",
        icon: <FaBriefcase />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => navigate("/single/internship"),
          },
          {
            label: "Bulk",
            icon: "📁",
            onClick: () => alert("Internship Bulk"),
          },
        ],
      },
      {
        label: "Bonafide",
        icon: <FaIdBadge />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => navigate("/single/bonafied"),
          },
          { label: "Bulk", icon: "📁", onClick: () => alert("Bonafide Bulk") },
        ],
      },
      {
        label: "Clearance",
        icon: <FaCheckCircle />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => navigate("/single/clearance"),
          },
          { label: "Bulk", icon: "📁", onClick: () => alert("Clearance Bulk") },
        ],
      },
    ],
    4: [
      {
        label: "Faculty One",
        icon: <FaUserTie />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => alert("Faculty1 Single"),
          },
          { label: "Bulk", icon: "📁", onClick: () => alert("Faculty1 Bulk") },
        ],
      },
      {
        label: "Faculty Two",
        icon: <FaChalkboardTeacher />,
        submenu: [
          {
            label: "Single",
            icon: "📄",
            onClick: () => alert("Faculty2 Single"),
          },
          { label: "Bulk", icon: "📁", onClick: () => alert("Faculty2 Bulk") },
        ],
      },
    ],
  };

  return (
    <>
      {/* Desktop version */}
      <div className={styles.buttoDdrawer}>
        <nav className={styles.navbar}>
          {navItems.map((item, index) => (
            <div
              ref={(el) => (anchorRefs.current[index] = el)}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              onClick={item.onClick} // Add onClick handler
              key={index}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.hasSubmenu && <FaChevronDown className={styles.chevron} />}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile version */}
      <div
        ref={drawerRef}
        className={clsx(
          styles.sideDrawer,
          sideDrawToggle ? styles.open : styles.close
        )}
      >
        <nav className={styles.navbar}>
          <div className={styles.cancel}>
            <FaTimes onClick={() => setSideDrawToggle(false)} />
          </div>

          {navItems.map((item, index) => (
            <div key={index} className={styles.mobileNavItem}>
              <div
                className={`${styles.mobileNavHeader} ${
                  activeMobileMenu === index ? styles.active : ""
                }`}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                    setSideDrawToggle(false);
                  } else if (item.hasSubmenu) {
                    toggleMobileMenu(index);
                  }
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
                {item.hasSubmenu && (
                  <FaChevronDown
                    className={`${styles.chevron} ${
                      activeMobileMenu === index ? styles.rotate : ""
                    }`}
                  />
                )}
              </div>

              {activeMobileMenu === index && menuItemsMap[index] && (
                <div className={styles.mobileSubmenu}>
                  {menuItemsMap[index].map((subItem, subIndex) => (
                    <div key={subIndex} className={styles.mobileSubmenuItem}>
                      <div className={styles.mobileSubmenuHeader}>
                        <span className={styles.icon}>{subItem.icon}</span>
                        <span className={styles.label}>{subItem.label}</span>
                        {subItem.submenu && (
                          <FaChevronDown className={styles.chevron} />
                        )}
                      </div>
                      {subItem.submenu && (
                        <div className={styles.mobileNestedSubmenu}>
                          {subItem.submenu.map((nestedItem, nestedIndex) => (
                            <div
                              key={nestedIndex}
                              className={styles.mobileNestedSubmenuItem}
                              onClick={(e) => {
                                e.stopPropagation();
                                nestedItem.onClick();
                                setSideDrawToggle(false);
                              }}
                            >
                              <span className={styles.icon}>
                                {nestedItem.icon}
                              </span>
                              <span className={styles.label}>
                                {nestedItem.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop hover menu */}
      {open && hoveredIndex !== null && menuItemsMap[hoveredIndex] && (
        <div
          onMouseEnter={() => handleEnter(hoveredIndex)}
          onMouseLeave={handleLeave}
        >
          <NestedHoverMenu
            anchorEl={anchorRefs.current[hoveredIndex]}
            closeMenu={() => {
              setOpen(false);
              setHoveredIndex(null);
            }}
            menuItems={menuItemsMap[hoveredIndex]}
          />
        </div>
      )}
    </>
  );
}
