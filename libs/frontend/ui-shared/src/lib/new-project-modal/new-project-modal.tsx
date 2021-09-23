import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { user as userAtom, projectboards as projectBoardAtom } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

/* eslint-disable-next-line */
export interface NewProjectModalProps {}

export function NewProjectModal(props: NewProjectModalProps) {
  const user = useRecoilValue(userAtom);

  const setProjectboards = useSetRecoilState(projectBoardAtom);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  interface FormInput {
    name: string;
  }

  const onSubmit = async (values: FormInput) => {
    //make new project
    const res = await axios.post(
      'http://localhost:3333/api/users/project/create',
      {
        userId: user.id,
        name: values.name,
      }
    );

    if (res.status === 200) {
      toast({
        title: 'Project created.',
        description: `We've created ${values.name} for you.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          onClose();
        },
      });
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


    const {id, name} = res.data;
    // set projectboards with new project
    const newProjectboard = {
      id,
      name
    }

    setProjectboards((projectboards) => [...projectboards, newProjectboard]);
  };

  return (
    <>
      <Button onClick={onOpen}>Create New Project</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name} mb={3}>
                <FormLabel htmlFor="name">Project Name</FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  {...register('name', {
                    required: 'Project name required',
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
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

export default NewProjectModal;
