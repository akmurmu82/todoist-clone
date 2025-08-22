import {
  Box,
  Button,
  ButtonSpinner,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
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
const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function CreateProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  console.log("user:", user);
  const toast = useToast();
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState(user.email);
  const navigate = useNavigate();

  let token = localStorage.getItem("todoistAuthToken") || "";

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
    
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Function to handle image upload
  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_unsigned_preset"); // replace with your actual preset
    data.append("cloud_name", "your_cloud_name"); // replace with your cloud name

    setImageUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        data
      );

      console.log("Uploaded Image URL:", res.data.secure_url);
      setProfilePic(res.data.secure_url);
      // Optionally, you can also update the user profile with the new image URL
      // dispatch(updateUser({ ...user, profilePic: res.data.secure_url }));
      toast({
        title: "Image uploaded successfully",
        status: "success",
          position: "top",
        duration: 3000,
      });

    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageUploading(false);
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
            {profilePic && (
              <Image src={profilePic} alt="Preview" boxSize="100px" objectFit="cover" mt={2} />
            )}
            <FormControl p={2} borderRadius={"md"} border={"1px solid #f1f1f1"}>
              <Input
                id="email"
                type="file"
                name="email"
                accept="image/*"
                // onChange={(e) => setProfilePic(e.target.value)}
                onChange={(e) => handleImageUpload(e.target.files[0])}
                border={"none"}
                placeholder="Enter your email"
                _focus={{ borderColor: "gray.400", boxShadow: "outline" }}
              />
            </FormControl>

            {/* Uploading Image Indicator */}
            {imageUploading && (
              <Flex align="center" gap={2}>
                <ButtonSpinner size="sm" color="red.400" />
                <Text fontSize="sm">Uploading image...</Text>
              </Flex>
            )}

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
              isDisabled={!profilePic || imageUploading}
              bg="#e74c3c"
              color="#fff"
              fontSize="lg"
              w="full"
              _hover={{ bg: "#db4c3e" }}
              aria-label="Log in"
              onClick={handleUpdateProfile}
            >
              {isLoading ? (
                <HStack spacing={2}>
                  <Spinner size="sm" />
                  <Text>Updating profile...</Text>
                </HStack>
              ) : imageUploading ? (
                <HStack spacing={2}>
                  <Spinner size="sm" />
                  <Text>Uploading image...</Text>
                </HStack>
              ) : (
                "Continue"
              )}
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
