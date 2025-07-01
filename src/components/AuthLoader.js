import { useSelector } from "react-redux";
import MainLoader from "./ui/Loader";

const AuthLoader = () => {
  const { loading } = useSelector((state) => state.auth);
  return loading ? <MainLoader /> : null;
};

export default AuthLoader;