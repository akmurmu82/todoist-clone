// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar2";
import LandingSection from "./components/navbar/LandingSection";

function App() {
  return (
    <Box>
      <Navbar />
      <LandingSection />
    </Box>
  );
}

export default App;
