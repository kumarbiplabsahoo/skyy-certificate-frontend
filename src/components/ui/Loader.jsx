import { useSelector } from "react-redux";
import styles from "../../assets/styles/ui/Loader.module.css";

const MainLoader = () => {
  const isLoading = useSelector((state) => state.auth.loading); // Ensure correct key

  return isLoading ? (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  ) : null;
};

export default MainLoader;
