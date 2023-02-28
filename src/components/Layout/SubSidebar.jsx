import { Flex, Heading, Box } from '@chakra-ui/react';

export default function SubSidebar({ title }) {
  return (
    <>
      <Flex
        h={`${window.innerHeight}px`}
        w="100%"
        flexDir="column"
        borderRightRadius="10px"
        borderBottomEndRadius="10px"
        py={{ base: 3, md: 4, lg: 5 }}
      >
        <Heading size="md" fontWeight="normal">
          {title}
        </Heading>
        <Box>shhs</Box>
      </Flex>
    </>
  );
}
