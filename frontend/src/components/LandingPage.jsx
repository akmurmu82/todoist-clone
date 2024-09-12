import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "red.500",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function TodoistLanding() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" px={4}>
        <Flex
          as="header"
          py={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={8}>
            <Image
              src="https://todoist.com/_next/static/images/logo_full_1048x256_075db33c78b596be411ee5d629a6d01c.png"
              alt="Todoist"
              h="8"
            />
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <Menu>
                <MenuButton as={Link} rightIcon={<ChevronDown />}>
                  Features
                </MenuButton>
                <MenuList>
                  <MenuItem>How it works</MenuItem>
                  <MenuItem>For teams</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                </MenuList>
              </Menu>
              <NavLink>For Teams</NavLink>
              <NavLink>Pricing</NavLink>
              <Menu>
                <MenuButton as={Link} rightIcon={<ChevronDown />}>
                  Resources
                </MenuButton>
                <MenuList>
                  <MenuItem>Integrations</MenuItem>
                  <MenuItem>Getting Started</MenuItem>
                  <MenuItem>Help Center</MenuItem>
                  <MenuItem>Productivity Methods</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
          <HStack spacing={4}>
            <Button
              colorScheme="gray"
              variant="ghost"
              display={{ base: "none", md: "inline-flex" }}
            >
              Log in
            </Button>
            <Button
              colorScheme="red"
              display={{ base: "none", md: "inline-flex" }}
            >
              Start for free
            </Button>
            <IconButton
              icon={<MenuIcon />}
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
            />
          </HStack>
        </Flex>
      </Container>

      <Box as="main" flex={1}>
        <Container maxW="container.xl" py={[12, 24]} px={4}>
          <Grid
            templateColumns={["1fr", null, "1fr 1fr"]}
            gap={[6, 12]}
            alignItems="center"
          >
            <VStack align="start" spacing={6} justifyContent="center">
              <Heading
                as="h1"
                size="3xl"
                lineHeight="1.2"
                color="gray.800"
                fontWeight="bold"
              >
                Organize your work and life, finally.
              </Heading>
              <Text fontSize="xl" color={textColor}>
                Become focused, organized, and calm with Todoist. The world&apos;s #1
                task manager and to-do list app.
              </Text>
              <Button size="lg" colorScheme="red" px={8}>
                Start for free
              </Button>
            </VStack>
            <Box>
              <Image
                src="https://todoist.com/_next/static/images/hero@2x_1c58e5a4b4d1edf5a46f53da64e2b9f4.png"
                alt="Todoist App"
                w="full"
                objectFit="cover"
              />
            </Box>
          </Grid>
        </Container>

        <Box bg="gray.50" py={[12, 24]}>
          <Container maxW="container.xl" px={4}>
            <VStack spacing={12} align="start">
              <Heading as="h2" size="2xl" color="gray.800" fontWeight="bold">
                Free up your mental space
              </Heading>
              <Grid templateColumns={["1fr", null, "repeat(3, 1fr)"]} gap={8}>
                <VStack align="start" spacing={4}>
                  <Image
                    src="https://todoist.com/_next/static/images/home-organize-667c3db5f8c97c845c790e2f31a7b9a4.jpg"
                    alt="Organize"
                    w="full"
                    rounded="lg"
                  />
                  <Heading
                    as="h3"
                    size="lg"
                    color="gray.800"
                    fontWeight="semibold"
                  >
                    Clear your thoughts
                  </Heading>
                  <Text color={textColor} fontSize="lg">
                    Let Todoist capture your tasks, projects, and goals so your
                    mind is free to focus on the right things.
                  </Text>
                </VStack>
                <VStack align="start" spacing={4}>
                  <Image
                    src="https://todoist.com/_next/static/images/home-prioritize-2b1c1f8f4b8c4a9d97c4d0f1a4c0f8e1.jpg"
                    alt="Prioritize"
                    w="full"
                    rounded="lg"
                  />
                  <Heading
                    as="h3"
                    size="lg"
                    color="gray.800"
                    fontWeight="semibold"
                  >
                    Focus on what&apos;s important
                  </Heading>
                  <Text color={textColor} fontSize="lg">
                    Reach that mental clarity you&apos;ve been longing for. Your
                    to-do lists are automatically sorted into Today, Upcoming,
                    and custom Filter views to help you focus.
                  </Text>
                </VStack>
                <VStack align="start" spacing={4}>
                  <Image
                    src="https://todoist.com/_next/static/images/home-collaborate-1b30e7a4c9bd6d2b3fa5aae6d3067a76.jpg"
                    alt="Collaborate"
                    w="full"
                    rounded="lg"
                  />
                  <Heading
                    as="h3"
                    size="lg"
                    color="gray.800"
                    fontWeight="semibold"
                  >
                    Get it all done
                  </Heading>
                  <Text color={textColor} fontSize="lg">
                    Start your day feeling calm and in control. Todoist learns
                    how you work and adapts to your needs, ensuring you
                    accomplish more every day.
                  </Text>
                </VStack>
              </Grid>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl" py={[12, 24]} px={4}>
          <VStack spacing={8} align="center" textAlign="center">
            <Heading as="h2" size="2xl" color="gray.800" fontWeight="bold">
              Achieve peace of mind with Todoist
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="3xl">
              Join millions of people who organize work and life with Todoist.
            </Text>
            <Button size="lg" colorScheme="red" px={8}>
              Start for free
            </Button>
          </VStack>
        </Container>
      </Box>

      <Box bg="gray.50" py={12}>
        <Container maxW="container.xl" px={4}>
          <Flex
            as="footer"
            direction={["column", "row"]}
            align={["center", "start"]}
            justify="space-between"
            wrap="wrap"
            gap={8}
          >
            <VStack align="start" spacing={4}>
              <Image
                src="https://todoist.com/_next/static/images/logo_full_1048x256_075db33c78b596be411ee5d629a6d01c.png"
                alt="Todoist"
                h="8"
              />
              <Text fontSize="sm" color={textColor}>
                © 2023 Doist Inc. All rights reserved.
              </Text>
            </VStack>
            <HStack spacing={8} align="start" wrap="wrap">
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" color="gray.700">
                  Features
                </Text>
                <Link fontSize="sm" color={textColor}>
                  How it works
                </Link>
                <Link fontSize="sm" color={textColor}>
                  For teams
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Pricing
                </Link>
              </VStack>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" color="gray.700">
                  Resources
                </Text>
                <Link fontSize="sm" color={textColor}>
                  Download apps
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Help center
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Productivity methods
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Integrations
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Channel partners
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Developer API
                </Link>
              </VStack>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" color="gray.700">
                  Company
                </Text>
                <Link fontSize="sm" color={textColor}>
                  About us
                </Link>
                <Link fontSize="sm" color={textColor}>
                  We&apos;re hiring!
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Blog
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Press
                </Link>
                <Link fontSize="sm" color={textColor}>
                  Twist
                </Link>
              </VStack>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
