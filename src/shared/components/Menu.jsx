import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useTheme,
} from '@chakra-ui/react';
import { FiMoreVertical as MoreIcon } from 'react-icons/fi';

const CustomMenu = ({ options, currentItem }) => {
  const theme = useTheme();

  return (
    <Menu placement="left-start">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            bg="transparent"
            icon={<MoreIcon size={18} color={theme.colors.brand[500]} />}
          />

          <MenuList
            outline="none"
            w={isOpen ? 'auto' : 0}
            minW={isOpen ? 'auto' : 0}
            px={0}
            m={0}
            py={3}
          >
            {options.map(option => (
              <MenuItem
                py={2}
                w={isOpen ? 'auto' : 0}
                outline="none"
                m={0}
                fontSize={13}
                lineHeight="16px"
                alignItems="center"
                onClick={() => option.onClick(currentItem)}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default CustomMenu;
