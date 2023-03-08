import {
  Box,
  Flex,
  Center,
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiChevronRight } from 'react-icons/fi';
import { logout, useAuthDispatch, useAuthState } from '../../context';

export default function MobileNav({ onOpen, children, ...rest }) {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <Flex
      px={{ base: 1, md: 2 }}
      height="70px"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="gray200"
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      zIndex={2}
      {...rest}
    >
      <Box>{children}</Box>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              p={2}
              borderColor="#F1F4F8"
              borderWidth={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Center px="15px">
                  {user && (
                    <Flex
                      borderRadius="md"
                      cursor="pointer"
                      alignItems="center"
                      py={1}
                      borderWidth={1}
                      borderColor="transparent"
                    >
                      <Avatar size="sm" bg="brand.500" />
                      <Box pl={2}>
                        <Text
                          lineHeight="16px"
                          color="brand.500"
                          fontWeight={700}
                          fontSize={12}
                          textOverflow="ellipsis"
                          maxW="110px"
                          overflow="hidden"
                          whiteSpace="nowrap"
                        >
                          {`${user?.first_name} ${user?.last_name}`}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                </Center>
                <Box display={{ base: 'none', md: 'flex' }} color="brand.500">
                  <FiChevronRight />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate(`/change-password`)}>
                Cambiar contraseña
              </MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
