// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar2";
import AllRoutes from "./AllRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/signup" ||
    location.pathname === "/onboard/create-profile" ||
    location.pathname === "/onboard/use-case";
    location.pathname === "/home";

  return (
    <Box>
      {/* {!isAuthPage && <Navbar />} */}
      <AllRoutes />
    </Box>
  );
}

export default App;
