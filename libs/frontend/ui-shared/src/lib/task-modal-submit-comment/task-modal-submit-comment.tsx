import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  toast,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ITask } from '../interfaces';
import { user as userAtom } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { task_comments as commentsAtom } from '../atoms';


/* eslint-disable-next-line */
export interface TaskModalSubmitCommentProps {
  task: ITask;
}

type FormValues = {
  comment: string;
};

export function TaskModalSubmitComment(props: TaskModalSubmitCommentProps) {
  const { task } = props;

  const setComments = useSetRecoilState(commentsAtom);

  const toast = useToast();

  const user = useRecoilValue(userAtom);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      const res = await axios.post('/api/users/project/task/comment', {
        taskId: task.id,
        comment: data.comment,
        userId: user.id,
      });
      if (res.status === 200) {
        setComments((prev) => [...prev, res.data]);
        toast({
          title: 'Success',
          description: 'Comment submitted.',
          status: 'success',
          duration: 1000,
          isClosable: true,
          onCloseComplete: () => {
            console.log('closed');
          },
        });
      }
    } catch (e: any) {
      const res = e.response.data;
      console.log('login error ', res.error);
      if (res.error) {
        toast({
          title: 'Error',
          description: `${res.error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) =>
    console.log(errors, e);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormControl>
        <FormLabel>Add a comment</FormLabel>
        <Input {...register('comment')} />
        <Button type="submit" mt={2}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

export default TaskModalSubmitComment;
