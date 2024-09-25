import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Image,
  VStack,
  Flex,
  Icon,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import todoisLogo from "../../assets/icons8-todoist-logo-120.png";
import axios from "axios";
import { useState } from "react";
import { FaUser, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
const BaseBackendURL = import.meta.env.VITE_BASE_BACKEND_URL;

const UseCase = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const [accountType, setAccountType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cases = [
    { title: "Personal", icon: FaUser },
    { title: "Work", icon: FaBriefcase },
    { title: "Education", icon: FaGraduationCap },
  ];

  const handleUpdateProfile = async () => {
    console.log(accountType);
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${BaseBackendURL}/users/update/${user._id}`,
        {
          accountType,
        }
      );
      if (res.data.status) {
        console.log(res.data);
        dispatch(updateUser(res.data.data));
        setIsLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <Flex
        h={"100vh"}
        w={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <Image alt="asdf" src={todoisLogo}></Image>
          <Spinner color="red" />
        </Box>
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
      >
        <Box w={{ base: "100%", lg: "45%" }} mb={{ base: 8, lg: 0 }}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mr={8}>
            todoist
          </Text>

          <VStack spacing={6} align="stretch" py={{ base: 6, lg: 10 }}>
            <Heading as="h1" size="lg" textAlign="center">
              How do you plan to use Todoist?
            </Heading>
            <Text textAlign="center">Choose all that apply.</Text>

            <Stack spacing={4}>
              {cases.map(({ title, icon }, ind) => (
                <Cases
                  key={ind}
                  title={title}
                  icon={icon}
                  accountType={accountType}
                  setAccountType={setAccountType}
                />
              ))}
            </Stack>

            <Button
              colorScheme="red"
              size="lg"
              width="full"
              onClick={handleUpdateProfile}
            >
              Launch Todoist
            </Button>
          </VStack>
        </Box>
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
};

export default UseCase;

function Cases({ title, icon, accountType, setAccountType }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleToggle() {
    // Toggle the checkbox
    setIsChecked(!isChecked);

    // Add to accountType if checked, remove if unchecked
    if (!isChecked) {
      setAccountType((prev) => [...prev, title]);
    } else {
      setAccountType((prev) => prev.filter((item) => item !== title));
    }

    // console.log(accountType);
  }

  return (
    <Flex
      align="center"
      border="2px"
      borderColor={isChecked ? "red.300" : "gray.200"}
      borderRadius="md"
      p={4}
      _hover={{ borderColor: "red.300", cursor: "pointer" }} // Make the flex clickable
      justifyContent={"space-between"}
      onClick={handleToggle} // The whole flex now triggers toggle
    >
      <Flex align="center">
        <Icon as={icon} boxSize={5} color="red.500" mr={4} />
        <Text>{title}</Text>
      </Flex>
      <Checkbox
        colorScheme="red"
        isChecked={isChecked}
        pointerEvents="none" // Prevent user interaction on checkbox itself
      />
    </Flex>
  );
}
