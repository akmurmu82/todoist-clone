import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  InputRightElement,
  IconButton,
  InputGroup,
  FormErrorMessage,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

function LoginPage() {
  const [isPasswordHidden, setIspasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setIspasswordHidden(!isPasswordHidden);
  };

  const handleLogin = async () => {
    if (!email) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }

    if (!password) {
      setIsPasswordInvalid(true);
    } else {
      setIsPasswordInvalid(false);
    }

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${BaseBackendURL}/users/login`, {
        email,
        password,
      });
      if (res.data.status) {
        setIsLoading(false);
        const token = res.data.token;
        localStorage.setItem("todoistAuthToken", JSON.stringify(token));
        navigate(`/home`);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // Display the message returned by the server, or a generic error message
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        // Network error or no response received
        setErrorMessage("Network error. Please try again.");
      }
    }
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
            Log in
          </Text>

          {/* Buttons and Form */}
          <Stack direction="column" spacing={4} w="full">
            {/* Social Logins */}
            <Button
              variant="outline"
              fontSize={"lg"}
              w="full"
              aria-label="Continue with Google"
              _hover={{ bg: "gray.100" }}
            >
              Continue with Google
            </Button>

            <Button
              variant="outline"
              fontSize={"lg"}
              w="full"
              aria-label="Continue with Facebook"
              _hover={{ bg: "gray.100" }}
            >
              Continue with Facebook
            </Button>

            <Button
              variant="outline"
              fontSize={"lg"}
              w="full"
              aria-label="Continue with Apple"
              _hover={{ bg: "gray.100" }}
            >
              Continue with Apple
            </Button>

            {/* Email Input */}
            <FormControl isInvalid={isEmailInvalid}>
              <FormLabel htmlFor="email" mb={1} fontSize="sm">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null); // Reset error message when input changes
                }}
                placeholder="Enter your email"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
              {isEmailInvalid && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={isPasswordInvalid}>
              <FormLabel htmlFor="password" mb={1} fontSize="sm">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={isPasswordHidden ? "password" : "text"}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null); // Reset error message when input changes
                  }}
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
              {isPasswordInvalid && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>

            {/* Error Message */}
            {errorMessage && (
              <Text color="red.500" fontSize="sm">
                {errorMessage}
              </Text>
            )}

            {/* Log In Button */}
            <Button
              bg={"#e74c3c"}
              color={"#fff"}
              fontSize={"lg"}
              w="full"
              _hover={{ bg: "#db4c3e" }}
              isDisabled={isLoading}
              onClick={handleLogin}
            >
              {isLoading ? <Spinner /> : "Log in"}
            </Button>

            {/* Forgot Password Link */}
            <ChakraLink
              textDecoration="underline"
              fontSize="sm"
              color="blue.500"
              _hover={{ color: "blue.700" }}
            >
              Forgot your password?
            </ChakraLink>

            {/* Terms and Privacy Notice */}
            <Text fontSize="sm" color="gray.500" textAlign="center">
              By continuing with Google, Apple, or Email, you agree to
              Todoist&apos;s{" "}
              <ChakraLink
                href="#"
                textDecoration="underline"
                color="blue.500"
                _hover={{ color: "blue.700" }}
              >
                Terms of Service
              </ChakraLink>{" "}
              and{" "}
              <ChakraLink
                href="#"
                textDecoration="underline"
                color="blue.500"
                _hover={{ color: "blue.700" }}
              >
                Privacy Policy
              </ChakraLink>
              .
            </Text>

            <Divider />

            {/* Sign Up Link */}
            <Text textAlign="center">
              Don&apos;t have an account?{" "}
              <ChakraLink
                href="/auth/signup"
                color="blue.500"
                _hover={{ color: "blue.700" }}
              >
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>

        <Spacer />
        {/* Image Section */}
        <Image
          display={{ base: "none", lg: "block" }}
          w={"50%"}
          fit={"contain"}
          src="https://todoist.b-cdn.net/assets/images/44245fc51c3e2ab05ee6d92c13e2e08a.png"
          loading="lazy"
          alt="Todoist login illustration"
        />
      </Flex>
    </Box>
  );
}

export default LoginPage;
