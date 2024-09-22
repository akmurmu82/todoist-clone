import { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Checkbox,
  Icon,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaRegCalendar,
  FaPencilAlt,
  FaRegCommentAlt,
  FaEllipsisH,
  FaProjectDiagram,
  FaSun,
  FaRegCalendarAlt,
  FaRedo,
  FaClock,
  FaFlag,
  FaBell,
  FaCheckCircle,
  FaArrowRight,
  FaCopy,
  FaLink,
  FaTrash,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { RiSofaLine } from "react-icons/ri";
import { RxValueNone } from "react-icons/rx";

export default function TaskItem({
  title,
  description,
  isCompleted,
  priority,
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Box
      borderBottomWidth={1}
      py={2}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Flex align="start">
        <Checkbox
          size="lg"
          colorScheme="green"
          mr={3}
          mt={1}
          isChecked={isCompleted}
        />
        <VStack align="start" spacing={1} flex={1}>
          <Text fontWeight="medium">{title}</Text>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
          <HStack>
            <Icon as={FaRegCalendar} color="orange.500" boxSize={3} />
            <Text fontSize="xs" color="orange.500">
              Tomorrow
            </Text>
          </HStack>
        </VStack>
        {isHovering && (
          <HStack spacing={1}>
            <IconButton
              aria-label="Edit task"
              icon={<FaPencilAlt />}
              size="sm"
              variant="ghost"
            />
            <IconButton
              aria-label="Comment on task"
              icon={<FaRegCommentAlt />}
              size="sm"
              variant="ghost"
            />
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button size="sm" variant="ghost">
                  <Icon as={FaEllipsisH} />
                </Button>
              </PopoverTrigger>
              <PopoverContent width="250px">
                <PopoverBody p={0}>
                  <VStack align="stretch" spacing={0} divider={<Divider />}>
                    <Option icon={FaPencilAlt} text="Edit" shortcut="Ctrl E" />
                    <Option
                      icon={FaProjectDiagram}
                      text="Go to project"
                      shortcut="G"
                    />

                    <VStack align="stretch" p={2} spacing={1}>
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        Due date
                      </Text>
                      <HStack>
                        <Tooltip label="Tomorrow" placement="top">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={FaSun} />}
                            flex={1}
                          />
                        </Tooltip>
                        <Tooltip label="Weekend" placement="top">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={RiSofaLine} />}
                            flex={1}
                          />
                        </Tooltip>
                        <Tooltip label="Next week" placement="top">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={FaRedo} />}
                            flex={1}
                          />
                        </Tooltip>
                        <Tooltip label="No date" placement="top">
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={RxValueNone} />}
                          />
                        </Tooltip>
                      </HStack>
                    </VStack>

                    <VStack align="stretch" p={2} spacing={1}>
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        Priority
                      </Text>
                      <HStack>
                        <Button
                          size="sm"
                          variant="ghost"
                          leftIcon={<Icon as={FaFlag} color="red.500" />}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          leftIcon={<Icon as={FaFlag} color="orange.500" />}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          leftIcon={<Icon as={FaFlag} color="blue.500" />}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          leftIcon={<Icon as={FaFlag} color="gray.500" />}
                        />
                      </HStack>
                    </VStack>

                    <Option icon={FaBell} text="Reminders" />
                    <Option
                      icon={FaCheckCircle}
                      text="Complete recurring task"
                      rightIcon={FaArrowRight}
                    />
                    <Option
                      icon={FaArrowRight}
                      text="Move to..."
                      shortcut="M"
                    />
                    <Option icon={FaCopy} text="Duplicate" />
                    <Option
                      icon={FaLink}
                      text="Copy link to task"
                      shortcut="Ctrl C"
                    />
                    <Option
                      icon={FaTrash}
                      text="Delete"
                      isDelete={1}
                      shortcut="Ctrl D"
                      // handleClick={handleDeleteTodo}
                    />
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

function Option({ icon, text, shortcut, rightIcon, isDelete, handleClick }) {
  return (
    <Button
      variant="ghost"
      fontWeight={"thin"}
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
  rightIcon: PropTypes.string,
  isDelete: PropTypes.bool,
  handleClick: PropTypes.func,
};
TaskItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isCompleted: PropTypes.bool,
  priority: PropTypes.string,
};
