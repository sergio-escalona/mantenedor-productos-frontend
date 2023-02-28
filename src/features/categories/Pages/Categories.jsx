import { Box } from '@chakra-ui/react';
import { Heading } from '../../../components/UI';

//@components
import Categories from '../Components/Categories';

export default function CategoriesMain() {
  return (
    <Box>
      <Heading>Categorias de productos</Heading>
      <Categories />
    </Box>
  );
}
