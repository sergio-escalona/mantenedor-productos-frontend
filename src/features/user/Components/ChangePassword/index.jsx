import { Box } from '@chakra-ui/react';
//@components
import Form from './Form';

const ChangePassword = () => {
  return (
    <Box p={2} bg="white" borderRadius={{ base: 2, md: 4, lg: '16px' }}>
      <Form />
    </Box>
  );
};
export default ChangePassword;
