import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { project_columns as columnAtom } from '../atoms';

/* eslint-disable-next-line */
export interface NewTaskModalProps {
  columnId: string;
}

export function NewTaskModal(props: NewTaskModalProps) {

  const columnId = props.columnId;

  const [columns, setColumns] = useRecoilState(columnAtom);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    const { title, content } = values;
    //make new project
    const res = await axios.post('/api/users/project/task/create', {
      title,
      content,
      columnId,
    });

    if (res.status === 200) {
      toast({
        title: 'Task.',
        description: `We've created ${values.title} for you.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
        },
      });

      const index = columns.findIndex((column) => column.id === columnId);

      const editColumn = {
        ...columns[index],
        tasks: [...columns[index].tasks, res.data],
      };

      const newColumns = [...columns];
      newColumns[index] = editColumn;

      setColumns(newColumns);
    } else {
      toast({
        title: 'Error creating project.',
        description: `Something went wrong.`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add New Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title} mb={3}>
                <FormLabel htmlFor="title">Task title</FormLabel>
                <Input
                  id="title"
                  placeholder="title"
                  {...register('title', {
                    required: 'Task title required',
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.content} mb={3}>
                <FormLabel htmlFor="content">Task content</FormLabel>
                <Input
                  id="content"
                  placeholder="content"
                  {...register('content', {
                    required: 'Task content required',
                  })}
                />
                <FormErrorMessage>
                  {errors.content && errors.content.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isSubmitting}
              >
                Create
              </Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewTaskModal;
