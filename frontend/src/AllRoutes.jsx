import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import LandingSection from "./components/LandingSection";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/onboard/SignupPage";
import Home from "./components/home/Home";
import CreateProfile from "./components/onboard/CreateProfile";
import UseCase from "./components/onboard/UseCase";
import PrivateRoute from "./ProtectRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingSection />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />

      {/* Protected routes */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route
        path="/onboard/create-profile"
        element={<PrivateRoute element={<CreateProfile />} />}
      />
      <Route
        path="/onboard/use-case"
        element={<PrivateRoute element={<UseCase />} />}
      />
    </Routes>
  );
}

AllRoutes.propTypes = {
  props: PropTypes.any,
};

export default AllRoutes;
