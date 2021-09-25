// @ts-nocheck
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
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
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Flex,
  Spacer,
  IconButton,
  useEditableControls,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  List,
  ListItem,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { ITask } from '../interfaces';
import debounce from 'lodash.debounce';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { TaskComment } from '.prisma/client';
import TaskModalSubmitComment from '../task-modal-submit-comment/task-modal-submit-comment';
import { task_comments as commentsAtom, current_task as taskAtom } from '../atoms';
import { useRecoilState } from 'recoil';

export interface TaskModalProps {
  task: ITask;
}

export function TaskModal(props: TaskModalProps) {
  const { task } = props;

  const [currentTask, setCurrentTask] = useRecoilState(taskAtom);

  const [comments, setComments] = useRecoilState(commentsAtom);

  useEffect(() => {

    setCurrentTask(task);

    console.log('task', currentTask);

    axios
      .get(`/api/users/project/task/${task.id}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [points, setPoints] = useState(task.points);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePointsChange = useCallback(
    debounce(
      (points: string) => {
        const newPoints = parseInt(points, 10);
        console.log(newPoints);
        setPoints(newPoints);
        axios
          .post('/api/users/project/task', {
            id: task.id,
            points: newPoints,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      200,
      { leading: true, trailing: false, maxWait: 200 }
    ),
    [setPoints]
  );

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <>
      <Button onClick={onOpen}>View Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignContent="center">
            <Box>Title: {task.title}</Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Points:
            <NumberInput
              value={points}
              onChange={(value) => {
                handlePointsChange(value);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            Description:
            <Editable
              defaultValue={task.content}
              fontSize="l"
              border="1px"
              rounded={5}
            >
              <Flex>
                <EditablePreview />
                <EditableInput />
                <Spacer />
                <EditableControls />
              </Flex>
            </Editable>
            <List m={2} spacing={3}>
              {comments?.map((comment) => (
                <ListItem key={comment.id}>
                  <Text fontSize="lg">{comment.content}</Text>
                </ListItem>
              ))}
            </List>
            <TaskModalSubmitComment task={currentTask}/>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskModal;
