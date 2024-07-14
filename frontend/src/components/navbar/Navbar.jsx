import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
// import PropTypes from "prop-types";

const MotionInputGroup = motion(InputGroup);

// function CustomIcon({ icon }) {
//   return (
//     <Icon
//       cursor={"pointer"}
//       color="#fff"
//       _hover={{
//         bg: "grey",
//         color: "black", // Change the icon color on hover
//       }}
//       p={5}
//       as={icon}
//     />
//   );
// }

// CustomIcon.propTypes = {
//   icon: PropTypes.elementType.isRequired,
// };

function Navbar() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Flex
      bg={"#db4c3e"}
      p={5}
      fontSize={"x-large"}
      h={"70px"}
      color={"#fff"}
      justifyContent={"space-between"}
      pr={10}
      pl={10}
    >
      <Flex gap={5} alignItems={"center"}>
        <Icon  h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={FaBars} />
        <Icon h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={MdHome} />
        <MotionInputGroup
          borderRadius={5}
          w={"300px"}
          bg="#fff"
          animate={{ width: isFocused ? "600px" : "300px" }}
          transition={{ duration: 0.5 }}
        >
          <InputLeftElement pointerEvents="none">
            <Icon as={FaMagnifyingGlass} color="gray.300" />
          </InputLeftElement>
          <InputRightElement pointerEvents="none">
            <Icon as={RxCross2} color="gray.300" />
          </InputRightElement>
          <Input
            type="text"
            placeholder="Search"
            color="grey"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </MotionInputGroup>
      </Flex>
      <Flex gap={5} alignItems={"center"}>
        <Icon h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={FaPlus} />
        <Icon h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={FaBell} />
        <Icon h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={FaInfoCircle} />
        <Icon h={10} w={10} p={2} borderRadius={5}  _hover={{bg: '#ab3b30'}} as={FaUser} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
