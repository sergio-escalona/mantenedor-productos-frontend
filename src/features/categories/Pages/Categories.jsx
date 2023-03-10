import { Box } from '@chakra-ui/react';

//@components
import Categories from '../Components/Categories';
import { Heading } from '../../../components/UI';

export default function CategoriesMain() {
  return (
    <Box>
      <Heading>Categorias de productos</Heading>
      <Categories />
    </Box>
  );
}
