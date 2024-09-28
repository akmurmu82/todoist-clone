import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Example authentication function, replace it with your actual auth logic
const isAuthenticated = () => {
  // This should check if the user is authenticated (e.g., by checking a token in localStorage or Redux store)
  return !!localStorage.getItem("todoistAuthToken"); // Example check
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
