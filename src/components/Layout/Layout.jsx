import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Menu,
  MenuItem,
  Sidebar,
  sidebarClasses,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';

import routes from './routes';
// import SidebarChakra from '@/components/Layout/Sidebar';
import MobileNav from './MobileNav';
import { useState } from 'react';
import styled from '@emotion/styled';
import {
  FaAccessibleIcon,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import SmoothSIdebar from './SmoothSidebar';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export default function Layout({ children }) {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
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
