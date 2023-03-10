//@components
import { Box, Center, SimpleGrid, GridItem } from '@chakra-ui/react';
import { IMAGES } from '../../../../config/constants';

export default function AuthWrapper({ children }) {
  return (
    <Box h="100%">
      <SimpleGrid
        columns={12}
        spacing={5}
        py={{ base: 1, md: 2, lg: 3 }}
        h="100%"
        px={{ base: 1, md: 3, lg: 3 }}
      >
        <GridItem
          display={{ base: 'none', lg: 'block' }}
          colSpan={{ base: 12, md: 12, lg: 8 }}
        >
          <Box h="100%">
            <Box
              borderColor="red.500"
              bgImage={IMAGES.AUTH_BG.source}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              borderRadius={{ base: '10px', md: '15px', lg: '20px' }}
              h="100%"
              w="100%"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 12, lg: 4 }}>
          <Center h="100%">
            <Box>{children}</Box>
          </Center>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
