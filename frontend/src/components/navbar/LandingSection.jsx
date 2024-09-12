import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

function LandingSection() {
  return (
    <Box px={20} py={16} bg="white">
      <Flex
        alignItems="center"
        justify="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Left Section: Text and CTA */}
        <VStack align="flex-start" spacing={6} maxW="lg">
          {/* Main Heading */}
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            color="gray.800"
            textAlign={{ base: "center", md: "left" }}
          >
            Organize your work and life, finally.
          </Heading>

          {/* Subheading */}
          <Text
            fontSize="lg"
            color="gray.600"
            textAlign={{ base: "center", md: "left" }}
          >
            Simplify life for both you and your team with the world’s #1 task
            manager and to-do list app.
          </Text>

          {/* Reviews & Ratings */}
          <HStack spacing={2} alignItems="center">
            <Text fontWeight="bold" color="gray.800">
              374K+{" "}
            </Text>
            <Text color="gray.600">★★★★★</Text>
            <Text color="gray.600">reviews from</Text>
            <Image src="/apple-icon.png" alt="Apple Store" boxSize="20px" />
            <Image src="/playstore-icon.png" alt="Play Store" boxSize="20px" />
          </HStack>

          {/* Call to Action Button */}
          <Button colorScheme="red" size="lg" px={6}>
            Start for free
          </Button>
        </VStack>

        {/* Right Section: Application Screenshot */}
        <Box mt={{ base: 10, md: 0 }} maxW="lg">
          <Image
            src="https://res.cloudinary.com/imagist/image/fetch/q_auto,f_auto,c_scale,w_1536/https%3A%2F%2Ftodoist.com%2Fstatic%2Fhome-teams%2Fintro%2Fwide%2Fheaderui.en.png" // Replace with actual path of the image
            alt="App Preview"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingSection;
