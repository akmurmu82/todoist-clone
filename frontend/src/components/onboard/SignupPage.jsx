import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  InputRightElement,
  IconButton,
  InputGroup,
  FormErrorMessage,
  useToast,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import GoogleAuthButton from "../login/GoogleAuthButton";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function SignupPage() {
  const { user } = useSelector((state) => state.user);
  console.log("user:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isPasswordHidden, setIspasswordHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let token = localStorage.getItem("todoistAuthToken") || "";

  const handleTogglePassword = () => {
    setIspasswordHidden(!isPasswordHidden);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      // if(email)
      let res = await axios.post(`${BaseBackendURL}/auth/register`, {
        email,
        password,
      });

      if (res.data.status) {
        toast({
          position: "top",
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
        });
        token = res.data.token;
        console.log(res, res.data);
        localStorage.setItem("todoistAuthToken", JSON.stringify(token));
        dispatch(updateUser(res.data.newUser));

        // setTimeout(() => {
        navigate(`/onboard/create-profile`);
        // window.location.href = "http://localhost:5173/onboard/create-profile";
        // }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Sign-In Success:", response);
    // TODO: Send Google token to backend for verification
    // For now, just navigate to profile creation
    navigate("/onboard/create-profile");
  };

  const handleGoogleError = (error) => {
    console.error("Google Sign-In Error:", error);
  };

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
            Sign up
          </Text>

          {/* Buttons and Form */}
          <Stack direction="column" spacing={4} w="full">
            {/* Social Logins */}
            <Box position="relative">
              <Button
                variant="outline"
                fontSize={"lg"}
                w="full"
                leftIcon={<FaFacebook />}
                aria-label="Continue with Facebook"
                isDisabled
                opacity={0.6}
                cursor="not-allowed"
              >
                Continue with Facebook
              </Button>
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                colorScheme="orange"
                fontSize="xs"
                borderRadius="full"
                px={2}
              >
                Coming Soon
              </Badge>
            </Box>

            <Box position="relative">
              <Button
                variant="outline"
                fontSize={"lg"}
                w="full"
                leftIcon={<FaApple />}
                aria-label="Continue with Apple"
                isDisabled
                opacity={0.6}
                cursor="not-allowed"
              >
                Continue with Apple
              </Button>
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                colorScheme="orange"
                fontSize="xs"
                borderRadius="full"
                px={2}
              >
                Coming Soon
              </Badge>
            </Box>

            <GoogleAuthButton />

            {/* Email Input */}
            <FormControl
              isInvalid={email === ""}
              p={2}
              borderRadius={"md"}
              border={"1px solid #f1f1f1"}
            >
              <FormLabel htmlFor="email" mb={1} fontSize="sm">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                border={"none"}
                placeholder="Enter your email"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
              {email == "" ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : null}
            </FormControl>

            {/* Password Input */}
            <FormControl
              isInvalid={password === ""}
              p={2}
              borderRadius={"md"}
              border={"1px solid #f1f1f1"}
            >
              <FormLabel htmlFor="password" mb={1} fontSize="sm">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={isPasswordHidden ? "password" : "text"}
                  border={"none"}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={
                      isPasswordHidden ? "Hide password" : "Show password"
                    }
                    icon={isPasswordHidden ? <VscEye /> : <VscEyeClosed />}
                    onClick={handleTogglePassword}
                  />
                </InputRightElement>
              </InputGroup>
              {password == "" ? (
                <FormErrorMessage>password is required.</FormErrorMessage>
              ) : null}
            </FormControl>

            {/* Signup In Button */}
            <Button
              bg={"#e74c3c"}
              color={"#fff"}
              fontSize={"lg"}
              w="full"
              _hover={{ bg: "#db4c3e" }}
              aria-label="Log in"
              onClick={handleSignup}
            >
              {isLoading ? <Spinner /> : "Sign up with Email"}
            </Button>

            {/* Terms and Privacy Notice */}
            <Text fontSize="sm" color="gray.500" textAlign="center">
              By continuing with Google, Apple, or Email, you agree to
              Todoist&apos;s{" "}
              <ChakraLink
                href="#"
                textDecoration="underline"
                color="blue.500"
                _hover={{ color: "blue.700" }}
                aria-label="Terms of Service"
              >
                Terms of Service
              </ChakraLink>{" "}
              and{" "}
              <ChakraLink
                href="#"
                textDecoration="underline"
                color="blue.500"
                _hover={{ color: "blue.700" }}
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </ChakraLink>
              .
            </Text>

            <Divider />

            {/* Sign Up Link */}
            <Text textAlign="center">
              Already signed up?{" "}
              <ChakraLink
                href="/auth/login"
                color="blue.500"
                _hover={{ color: "blue.700" }}
              >
                Go to login
              </ChakraLink>
            </Text>
          </Stack>
        </Box>

        {/* <Spacer /> */}
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

SignupPage.propTypes = {
  props: PropTypes.any,
};

export default SignupPage;

// Warning messages on reload
// hero image alignment
// padding of input boxes
