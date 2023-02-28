//@libs
import { useEffect, useState } from 'react';

//@hooks
import useFetchOne from '../../../../shared/hooks/useFetchOne';

//@components
import {
  Flex,
  IconButton,
  Text,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { FiEdit as EditIcon } from 'react-icons/fi';
import Modal from '../../../../shared/components/Modal';
import Form from './Form';

const EditUser = ({ id }) => {
  const theme = useTheme();
  const [enabledQuery, setEnabledQuery] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const { data } = useFetchOne(
    'users',
    id,
    {
      enabled: enabledQuery,
      refresh: onToggle,
    },
    'app'
  );

  const onToggleModal = () => {
    setEnabledQuery(true);
    onToggle();
  };

  useEffect(() => {
    if (!isOpen) {
      setEnabledQuery(false);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <>
      <IconButton
        onClick={onToggleModal}
        bg="transparent"
        aria-label="edit button"
        icon={<EditIcon size={18} color={theme.colors.brand[500]} />}
      />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onToggle}
          title={
            <Flex textColor="green.700" justify="space-between">
              <Text fontWeight={700}>Editar Usuario</Text>
              <Flex
                alignItems="center"
                px={1}
                mr={5}
                bg="green.100"
                borderRadius={8}
              >
                <Text fontSize={'xs'}>Código:{id}</Text>
              </Flex>
            </Flex>
          }
          size="4xl"
        >
          <Form isOpen={isOpen} onClose={onToggle} type="UPDATE" data={data} />
        </Modal>
      )}
    </>
  );
};
export default EditUser;
