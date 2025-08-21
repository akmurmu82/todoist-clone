import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const isAuthenticated = () => {
  const token = localStorage.getItem("todoistAuthToken");
  return !!token && token !== "undefined" && token !== "null";
};

const PrivateRoute = ({ element }) => {
  const { isAuthenticated: reduxAuth } = useSelector((state) => state.user);
  
  // Check both localStorage token and Redux state
  const authenticated = isAuthenticated() || reduxAuth;
  
  return authenticated ? element : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
