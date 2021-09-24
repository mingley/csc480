import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { ITask } from '../interfaces';


export interface TaskModalProps {
  task: ITask;
}

export function TaskModal(props: TaskModalProps) {
  const { task } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>View Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Title: {task.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{task.title}</ModalBody>
          <ModalFooter>Footer Here</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskModal;
