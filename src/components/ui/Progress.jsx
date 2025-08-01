import OurLogo from "../../assets/icons/logo.png";
import styles from "../../assets/styles/ui/Progress.module.css";

export default function ProgressBarDialog({ loaderOpen, progress }) {
  if (!loaderOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <img className={styles.logoImage} src={OurLogo} alt="Logo" />
        <div className={styles.loaderBox}>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className={styles.progressText}>{`${Math.round(progress)}%`}</p>
      </div>
    </div>
  );
}
