import { isAuthenticated } from "../../../utils/isAuthenticated";
import { Navigate } from "react-router-dom";

const NotProtectedRoute = ({ component: Component }) => {
  return !isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

export default NotProtectedRoute;
