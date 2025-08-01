import { useParams } from "react-router-dom";

const RouteTypeWrapper = ({ children }) => {
  const { type } = useParams();
  return children(type);
};

export default RouteTypeWrapper;
