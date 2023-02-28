import { ReactNode } from 'react';
import {
  Box,
  VStack,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  Text,
  MenuList,
} from '@chakra-ui/react';
import { FiMenu, FiChevronRight } from 'react-icons/fi';
import { useAuthState } from '../../context';
import SubSidebar from './SubSidebar';

export default function MobileNav({ onOpen, children, ...rest }) {
  const { institution } = useAuthState();

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
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  pr={3}
                >
                  <Text fontSize="sm" fontWeight="700" color="brand.500">
                    Usuario Logueado
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {institution?.name}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronRight />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <SubSidebar title="Sample" />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
