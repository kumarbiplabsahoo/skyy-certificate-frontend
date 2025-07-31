import { useSelector } from "react-redux";
import styles from "../../assets/styles/ui/InlineLoader.module.css";

const InlineLoader = () => {
  const { innerloading } = useSelector((state) => state.auth); // Ensure correct key
  
  return innerloading ? (
    <div className={styles.inlineLoaderContainer}>
      <div className={styles.inlineLoader}></div>
    </div>
  ) : null;
};

export default InlineLoader;
