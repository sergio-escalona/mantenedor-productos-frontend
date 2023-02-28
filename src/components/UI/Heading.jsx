import { Box, Text } from '@chakra-ui/react';
import Helmet from 'react-helmet';

export default function Heading({ children, title }) {
  return (
    <Box mb="15px">
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <Text fontWeight={700} fontSize={24} color="brand.500">
        {children}
      </Text>
    </Box>
  );
}
