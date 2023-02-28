import { Box, Center, Image } from '@chakra-ui/react';
import { IMAGES } from '../../config/constants';

export default function Logo({ w, h, pb }) {
  return (
    <Box pb={pb || { base: 4, md: 10, lg: 30 }}>
      <Center>
        <Image
          src={IMAGES.LOGO.source}
          alt={IMAGES.LOGO.alt}
          w={w || { base: 50, md: 250 }}
          h={h || { base: 31, md: 150 }}
        />
      </Center>
    </Box>
  );
}
