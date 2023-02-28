import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

export default function NoRows({ children }) {
  return (
    <Box gridColumn="1/-1">
      <Center h="100%">
        {typeof children === 'string' ? (
          <Text fontSize={14} opacity={0.5}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Center>
    </Box>
  );
}
