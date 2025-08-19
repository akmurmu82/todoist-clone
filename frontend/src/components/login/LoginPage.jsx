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
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../redux/slices/userSlice";
import GoogleSignIn from "../auth/GoogleSignIn";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIspasswordHidden] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const handleTogglePassword = () => {
    setIspasswordHidden(!isPasswordHidden);
  };

  const handleLogin = () => {
    setIsEmailInvalid(!email);
    setIsPasswordInvalid(!password);

    if (!email || !password) return;

    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        // Errors already handled in Redux state
      });
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google Sign-In Success:", response);
    // TODO: Send Google token to backend for verification
    // For now, just navigate to home
    navigate("/home");
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
      >
        <Box w={{ base: "100%", lg: "45%" }} mb={{ base: 8, lg: 0 }}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mr={8}>
            todoist
          </Text>

          <Text
            as={"h1"}
            py={{ base: 6, lg: 10 }}
            fontWeight={"bold"}
            fontSize={"3xl"}
          >
            Log in
          </Text>

          <Stack direction="column" spacing={4} w="full">
            <GoogleSignIn 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

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
                  setIsEmailInvalid(false);
                }}
                placeholder="Enter your email"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
              {isEmailInvalid && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

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
                    setIsPasswordInvalid(false);
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

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            <Button
              bg={"#e74c3c"}
              color={"#fff"}
              fontSize={"lg"}
              w="full"
              _hover={{ bg: "#db4c3e" }}
              isDisabled={loading}
              onClick={handleLogin}
            >
              {loading ? <Spinner size="sm" /> : "Log in"}
            </Button>

            <ChakraLink
              textDecoration="underline"
              fontSize="sm"
              color="blue.500"
              _hover={{ color: "blue.700" }}
            >
              Forgot your password?
            </ChakraLink>

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
