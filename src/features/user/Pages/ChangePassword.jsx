import { Box } from '@chakra-ui/react';
import { Heading } from '../../../components/UI';

//@components
import ChangePassword from '../Components/ChangePassword';

export default function ChangePasswordMain() {
  return (
    <Box>
      <Heading>Cambiar contraseña</Heading>
      <ChangePassword />
    </Box>
  );
}
