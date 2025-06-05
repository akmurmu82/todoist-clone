import { Box, Flex, VStack, Skeleton, HStack } from "@chakra-ui/react";

const TodoItemSkeleton = () => {
    return (
        <Box borderBottomWidth={1} borderRadius="md" px={2} py={3} mb={2}>
            <Flex align="start">
                <Skeleton boxSize="24px" borderRadius="full" mr={3} mt={1} />
                <VStack align="start" spacing={1} flex={1}>
                    <Skeleton height="16px" width="70%" />
                    <Skeleton height="12px" width="90%" />
                    <HStack>
                        <Skeleton height="10px" width="40px" />
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
};

export default TodoItemSkeleton;
