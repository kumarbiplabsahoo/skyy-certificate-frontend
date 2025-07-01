// NestedHoverMenu.jsx
import { useEffect, useRef, useState } from "react";
import styles from "../../assets/styles/ui/NestedHoverMenu.module.css";

export default function NestedHoverMenu({
  anchorEl,
  menuItems = [],
  closeMenu,
}) {
  const menuRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState(null);

  useEffect(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [anchorEl]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, closeMenu]);

  if (!position) return null;

  return (
    <div
      className={styles.menuWrapper}
      ref={menuRef}
      style={{ top: position.top, left: position.left, position: "absolute" }}
    >
      <div className={styles.dropdownMenu}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.menuItem} ${item.danger ? styles.danger : ""}`}
            onMouseEnter={(e) => {
              if (item.submenu) {
                const parentRect = menuRef.current.getBoundingClientRect();
                const itemRect = e.currentTarget.getBoundingClientRect();
                setOpenSubmenu(index);
                setSubmenuPosition({
                  top: itemRect.top - parentRect.top,
                  left: itemRect.right - parentRect.left,
                });
              } else {
                setOpenSubmenu(null);
              }
            }}
            onClick={() => {
              item.onClick?.();
              closeMenu?.();
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
            {item.submenu && <span className={styles.arrow}>▶</span>}
          </div>
        ))}
      </div>

      {openSubmenu !== null && menuItems[openSubmenu]?.submenu && (
        <div
          className={styles.submenuWrapper}
          style={{
            top: submenuPosition.top,
            left: submenuPosition.left,
            position: "absolute",
          }}
        >
          <div className={styles.dropdownMenu}>
            {menuItems[openSubmenu].submenu.map((sub, subIdx) => (
              <div
                key={subIdx}
                className={`${styles.menuItem} ${
                  sub.danger ? styles.danger : ""
                }`}
                onClick={() => {
                  sub.onClick?.();
                  closeMenu?.();
                }}
              >
                <span className={styles.icon}>{sub.icon}</span>
                <span>{sub.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
