import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Box
      px={{ base: "20px", md: "50px", lg: "200px" }}
      py={4}
      bg="white"
      textAlign={"left"}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ lg: "center" }}
      >
        <Box w={{ base: "100%", lg: "50%" }} mb={{ base: 8, lg: 0 }}>
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
            <Button variant="outline" fontSize={"lg"} w="full">
              Continue with Google
            </Button>

            <Button variant="outline" fontSize={"lg"} w="full">
              Continue with Facebook
            </Button>

            <Button variant="outline" fontSize={"lg"} w="full">
              Continue with Apple
            </Button>

            <FormControl p={2} borderRadius={"md"} border={"1px solid #f1f1f1"}>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                border={"none"}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl p={2} borderRadius={"md"} border={"1px solid #f1f1f1"}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                border={"none"}
                placeholder="Enter your password"
              />
            </FormControl>

            <Button bg={"#db4c3e"} color={"#fff"} fontSize={"lg"} w="full">
              Log in
            </Button>

            <Link style={{ textDecoration: "underline", fontSize: "sm" }}>
              Forgot your password?
            </Link>

            <Text fontSize="sm" color="gray.500" textAlign="center">
              By continuing with Google, Apple, or Email, you agree to
              Todoist&apos;s{" "}
              <Link
                style={{ textDecoration: "underline" }}
                href="#"
                color="blue.500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                style={{ textDecoration: "underline" }}
                href="#"
                color="blue.500"
              >
                Privacy Policy
              </Link>
              .
            </Text>

            <Divider />

            <Text textAlign="center">
              Don&apos;t have an account?{" "}
              <Link href="#" color="blue.500">
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>

        <Image
          display={{ base: "none", lg: "block" }}
          w={"50%"}
          fit={"contain"}
          src="https://todoist.b-cdn.net/assets/images/44245fc51c3e2ab05ee6d92c13e2e08a.png"
        />
      </Flex>
    </Box>
  );
}

LoginPage.propTypes = {
  props: PropTypes.any,
};

export default LoginPage;
