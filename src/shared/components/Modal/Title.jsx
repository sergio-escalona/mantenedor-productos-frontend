import { Text } from '@chakra-ui/react';

export default function ModalTitle({ children }) {
  return (
    <Text fontSize={32} lineHeight="32px" fontWeight="700" color="brand.500">
      {children}
    </Text>
  );
}
