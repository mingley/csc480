import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { Task } from '@prisma/client';
import register from '../register/register';


/* eslint-disable-next-line */
export interface TaskModalProps {
  task: {
    id: string;
    content: string;
    title: string;
    status: string;
    points: number;
  };
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
        <ModalHeader>Create a New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task.title}
        </ModalBody>
        <ModalFooter>Footer Here</ModalFooter>
      </ModalContent>
    </Modal>
  </>
  );
}

export default TaskModal;
