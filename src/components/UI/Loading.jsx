//@components
import { Center, CircularProgress } from '@chakra-ui/react';

function Loading() {
  return (
    <Center h="100vh" width="100%">
      <CircularProgress isIndeterminate color="brand.500" />
    </Center>
  );
}
export default Loading;
