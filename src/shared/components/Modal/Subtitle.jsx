import { Text } from '@chakra-ui/react';

export default function ModalSubtitle({ children }) {
  return (
    <Text fontSize={14} lineHeight="16px" color="brand.500">
      {children}
    </Text>
  );
}
