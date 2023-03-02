import { Box } from '@chakra-ui/react';
//@components
import Graphs from './Graphs';

const Home = () => {
  return (
    <Box p={2} bg="white" borderRadius={{ base: 2, md: 4, lg: '16px' }}>
      <Graphs />
    </Box>
  );
};
export default Home;
