import { Box } from '@chakra-ui/react';
import { Heading } from '../../../components/UI';

//@components
import Products from '../Components/Products';

export default function ProductsMain() {
  return (
    <Box>
      <Heading>Productos</Heading>
      <Products />
    </Box>
  );
}
