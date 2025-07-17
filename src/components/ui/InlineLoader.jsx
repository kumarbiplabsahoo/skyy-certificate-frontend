import { useSelector } from "react-redux";
import styles from "../../assets/styles/ui/InlineLoader.module.css";

const InlineLoader = () => {
  const { loading } = useSelector((state) => state.dash); // Ensure correct key
  
  return loading ? (
    <div className={styles.inlineLoaderContainer}>
      <div className={styles.inlineLoader}></div>
    </div>
  ) : null;
};

export default InlineLoader;
