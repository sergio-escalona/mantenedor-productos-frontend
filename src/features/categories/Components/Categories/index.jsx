import { Box } from '@chakra-ui/react';
//@components
import List from './List';

const Categories = () => {
  return (
    <Box p={2} bg="white" borderRadius={{ base: 2, md: 4, lg: '16px' }}>
      <List />
    </Box>
  );
};
export default Categories;
