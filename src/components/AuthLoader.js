import { useSelector } from "react-redux";
import MainLoader from "./ui/Loader";

const AuthLoader = () => {
  const { mainloading } = useSelector((state) => state.auth);
  return mainloading ? <MainLoader /> : null;
};

export default AuthLoader;