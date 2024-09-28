import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  FaBook,
  FaChevronRight,
  FaCog,
  FaHistory,
  FaPrint,
  FaSignOutAlt,
  FaStar,
  FaSync,
  FaUserPlus,
} from "react-icons/fa";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom";

function ProfilePopover({ user, trigger, icons }) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    persistor.purge().then(() => {
      navigate("/");
    });
  };
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      {icons}
      <PopoverContent width="250px">
        <PopoverBody p={0}>
          <VStack align="stretch" spacing={0} divider={<Divider />}>
            <Box p={3}>
              <Text>{user.email}</Text>
              <Text fontSize="sm" color="gray.500">
                0/5 tasks
              </Text>
            </Box>
            <Option icon={FaCog} text="Settings" shortcut="O then S" />
            <Option icon={FaUserPlus} text="Add a team" />
            <Option icon={FaHistory} text="Activity log" shortcut="G then A" />
            <Option icon={FaPrint} text="Print" shortcut="Ctrl P" />
            <Option icon={FaBook} text="Resources" rightIcon={FaChevronRight} />
            <Option icon={FaStar} text="What's new" />
            <Option icon={FaStar} text="Upgrade to Pro" />
            <Option icon={FaSync} text="Sync" rightContent="33 seconds ago" />
            <Option
              icon={FaSignOutAlt}
              isDelete={true}
              text="Log out"
              handleClick={handleLogOut}
            />
            <Box p={3}>
              <Text fontSize="xs" color="gray.500">
                v6798 · Changelog
              </Text>
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function Option({ icon, text, shortcut, rightIcon, isDelete, handleClick }) {
  return (
    <Button
      variant="ghost"
      fontWeight="normal"
      justifyContent="space-between"
      width="100%"
      height="auto"
      py={2}
      onClick={handleClick}
    >
      <HStack color={isDelete ? "#db4c3e" : ""}>
        <Icon as={icon} />
        <Text>{text}</Text>
      </HStack>
      <HStack>
        {shortcut && (
          <Text fontSize="xs" color="gray.500">
            {shortcut}
          </Text>
        )}
        {rightIcon && <Icon as={rightIcon} />}
      </HStack>
    </Button>
  );
}

Option.propTypes = {
  icon: PropTypes.func,
  text: PropTypes.string,
  shortcut: PropTypes.string,
  rightIcon: PropTypes.func,
  isDelete: PropTypes.bool,
  handleClick: PropTypes.func,
};

ProfilePopover.propTypes = {
  user: PropTypes.object,
  trigger: PropTypes.object,
  icons: PropTypes.object,
};

export default ProfilePopover;
