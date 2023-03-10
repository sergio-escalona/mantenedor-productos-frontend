//@components
import { Box, useDisclosure } from '@chakra-ui/react';
import routes from './routes';
import MobileNav from './MobileNav';
import SmoothSIdebar from './SmoothSidebar';

export default function Layout({ children }) {
  const { onOpen } = useDisclosure();

  return (
    <Box width="100%" h="100%" bg="#F7F8F9" display="flex" position="relative">
      <SmoothSIdebar routes={routes} />
      <main style={{ width: '100%' }}>
        <Box h="100%" px={{ base: 1, md: 2, lg: '18px', xl: 3 }}>
          <Box>
            <MobileNav onOpen={onOpen} />
            <Box px={{ base: 1, lg: 2 }} width="100% ">
              {children}
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
