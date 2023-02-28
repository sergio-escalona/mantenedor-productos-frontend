//@libs
import { FiPlus as AddIcon } from 'react-icons/fi';

//@components
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Button, Modal } from '../../../../shared/components';
import Form from './Form';

const CreateCategory = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex h={{ xl: '100%' }} justify="flex-end" mt={2}>
        <Button
          leftIcon={<AddIcon size={22} color="white" />}
          onClick={onToggle}
        >
          Crear
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onToggle}
        title={
          <Flex direction="column" textColor="green.700">
            <Text fontSize="xs">Crear nueva</Text>
            <Text fontWeight={700}>Categoría</Text>
          </Flex>
        }
        size="4xl"
      >
        <Form isOpen={isOpen} onClose={onToggle} type="CREATE" />
      </Modal>
    </>
  );
};
export default CreateCategory;
