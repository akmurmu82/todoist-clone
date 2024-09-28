import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  // useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import todoisLogo from "../../assets/icons8-todoist-logo-120.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function CreateProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log("user:", user);
  // const toast = useToast();
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState(user.email);
  const navigate = useNavigate();

  let token = localStorage.getItem("todoistAuthToken") || "";
  // if (token) {
  //   console.log("user has token");
  // } else {
  //   console.log("user has no token");
  // }

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      let res = await axios.patch(
        `${BaseBackendURL}/users/update/${user._id}`,
        {
          name,
          profilePic,
        }
      );
      if (res.data.status) {
        console.log(res.data);
        dispatch(updateUser(res.data.data));
        setIsLoading(false);
        navigate("/onboard/use-case");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <Flex
        h={"100vh"}
        w={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Image alt="asdf" src={todoisLogo}></Image>
        <Spinner color="red" />
      </Flex>
    );

  return (
    <Box
      px={{ base: "10px", md: "40px", lg: "200px" }}
      py={4}
      bg="white"
      textAlign={"left"}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ lg: "center" }}
        justify={"space-between"}
        // justify={{ base: "flex-end", lg: "space-between" }}
      >
        <Box w={{ base: "100%", lg: "45%" }} mb={{ base: 8, lg: 0 }}>
          {/* Logo */}
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mr={8}>
            todoist
          </Text>

          {/* Heading */}
          <Text
            as={"h1"}
            py={{ base: 6, lg: 10 }}
            fontWeight={"bold"}
            fontSize={"3xl"}
          >
            Create your profile
          </Text>

          {/* Buttons and Form */}
          <Stack direction="column" spacing={4} w="full">
            {/* Email Input */}
            <FormControl p={2} borderRadius={"md"} border={"1px solid #f1f1f1"}>
              <Input
                id="email"
                type="file"
                name="email"
                onChange={(e) => setProfilePic(e.target.value)}
                border={"none"}
                placeholder="Enter your email"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
            </FormControl>

            {/* Name Input */}
            <FormControl p={2} borderRadius={"md"} border={"1px solid #f1f1f1"}>
              <FormLabel htmlFor="name" mb={1} fontSize="sm">
                Name
              </FormLabel>
              <Input
                id="name"
                p={0}
                type="text"
                value={name}
                border={"none"}
                name="password"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
            </FormControl>

            {/* Log In Button */}
            <Button
              bg={"#e74c3c"}
              color={"#fff"}
              fontSize={"lg"}
              w="full"
              _hover={{ bg: "#db4c3e" }}
              aria-label="Log in"
              onClick={handleUpdateProfile}
            >
              Continue
            </Button>
          </Stack>
        </Box>

        {/* Image Section */}
        <video
          autoPlay
          loop
          muted
          style={{
            width: "50%",
            height: "auto",
          }}
          loading="lazy"
          alt="Todoist login illustration"
        >
          <source
            src="https://todoist.b-cdn.net/assets/video/69a00ecf3b2aedf11010987593926c2e.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Flex>
    </Box>
  );
}

CreateProfile.propTypes = {
  props: PropTypes.any,
};

export default CreateProfile;

// Warning messages on reload
// hero image alignment
