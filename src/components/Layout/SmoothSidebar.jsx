//@components
import { useLocation } from 'react-router-dom';
import { Box, IconButton, useTheme } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  Sidebar,
  sidebarClasses,
  menuClasses,
  useProSidebar,
} from 'react-pro-sidebar';
import Icon from '../../shared/components/Icon';
import { useAuthDispatch, useAuthState } from '../../context';
import { changeNavbarStatus } from '../../context/actions';
import { Logo } from '../../shared/components';

export default function SmoothSIdebar({ routes }) {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useAuthDispatch();
  const { collapseSidebar, collapsed } = useProSidebar();
  const { sidebarCollapse } = useAuthState();

  const handleSidebarCollapse = () => {
    changeNavbarStatus(dispatch, !collapsed);
    collapseSidebar();
  };

  return (
    <>
      <Sidebar
        collapsedWidth="72px"
        breakPoint="lg"
        width="200px"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            position: 'relative',
            borderRightWidth: 0,
            outline: 'none',
            overflow: 'unset',
            boxShadow: '4px 0px 8px rgba(0, 113, 97, 0.08)',
            backgroundColor: 'white',
            zIndex: 9,
          },
        }}
        defaultCollapsed={sidebarCollapse}
      >
        <IconButton
          aria-label="collapse sidebar"
          position="absolute"
          right={'-12px'}
          w="24px"
          minW="24px"
          bg="white"
          _hover={{
            backgroundColor: 'whtte',
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.25)',
          }}
          _focus={{
            boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.25) !important',
          }}
          p={0}
          h="24px"
          top="10px"
          zIndex={9}
          color="brand.500"
          borderRadius="8px"
          boxShadow="0px 8px 25px rgba(0, 0, 0, 0.25)"
          icon={
            collapsed ? (
              <FaChevronRight size={15} />
            ) : (
              <FaChevronLeft size={15} />
            )
          }
          onClick={handleSidebarCollapse}
        />
        <Box
          bg="white"
          boxShadow="4px 0px 8px rgba(0, 113, 97, 0.08)"
          display="flex"
          position="relative"
          flexDirection="column"
          overflowX="hidden"
          h="100%"
        >
          <Box
            h="140px"
            minH="140px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="0 5px"
          >
            <Logo pb={{ base: 0 }} w={{ base: '80px' }} h={{ base: '60px' }} />
          </Box>

          <Menu
            rootStyles={{
              [`.${menuClasses.menuItemRoot}`]: {
                marginBottom: '5px',
                height: '45px',
              },
              [`.${menuClasses.button}`]: {
                paddingRight: '9px',
                borderRadius: '8px',
                paddingLeft: '9px',
                height: '45px',
                fontSize: 14,
              },

              [`.${menuClasses.button}:hover`]: {
                backgroundColor: theme.colors.brand[500],
              },
              [`.${menuClasses.active} .ps-active`]: {
                backgroundColor: theme.colors.brand[500],
              },
              [`.${menuClasses.active} .ps-active span`]: {
                backgroundColor: 'transparent',
                color: 'white',
                fontWeight: '700',
              },

              [`.${menuClasses.button}:hover span`]: {
                color: 'white',
                fontWeight: '700',
              },
              [`.${menuClasses.icon}`]: {
                paddingRight: '11px',
                marginRight: '0 !important',
              },
              [`.${menuClasses.label}`]: {
                color: '#7D797A',
              },
            }}
          >
            <Box px="15px">
              {routes.map(route => (
                <MenuItem
                  active={location.pathname === route.path}
                  href={route.path}
                  key={`route-${route.name}-menuItem`}
                  icon={<Icon name={route.iconName} size={20} />}
                >
                  {route.name}
                </MenuItem>
              ))}
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </>
  );
}
