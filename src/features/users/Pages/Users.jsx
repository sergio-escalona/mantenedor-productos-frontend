import { Box } from '@chakra-ui/react';
import { Heading } from '../../../components/UI';

//@components
import Users from '../Components/Users';

export default function UsersMain() {
  return (
    <Box>
      <Heading>Usuarios</Heading>
      <Users />
    </Box>
  );
}
