import styles from "../../assets/styles/ui/Breadcrumbs.module.css"; // customize or create this CSS module
import { useBreadcrumb } from "../../hooks/useBreadcrumb";

export default function Breadcrumbs() {
  const crumbs = useBreadcrumb();

  return (
    <div className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) => (
        <span key={index}>
          <span
            className={
              index === crumbs.length - 1
                ? styles.activeBreadcrumb
                : styles.breadcrumb
            }
          >
            {crumb}
          </span>
          {index < crumbs.length - 1 && (
            <span className={styles.separator}>&gt;</span>
          )}
        </span>
      ))}
    </div>
  );
}
