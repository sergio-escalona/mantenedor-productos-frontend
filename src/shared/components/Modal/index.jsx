import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from '@chakra-ui/react';

const CustomModal = ({ isOpen, onClose, size, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

CustomModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  size: '2xl',
  title: 'titulo modal',
};

export default CustomModal;
