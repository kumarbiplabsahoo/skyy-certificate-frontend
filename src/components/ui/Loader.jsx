import styles from "../../assets/styles/ui/Loader.module.css";

const MainLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default MainLoader;
