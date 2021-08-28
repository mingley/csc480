import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../task/Task';
import AddTaskForm from '../add-task-from/AddTaskForm';
import { Box, Heading, Stack, VStack } from '@chakra-ui/react';
// import TaskList from '../task-list/TaskList';

export interface ColumnProps {
  column: any;
  tasks: any;
}

export interface ITask {
  id: string;
  title: string;
  content: string;
}

export function Column(props: ColumnProps) {
  return (
    <Box width="20%" background="ActiveBorder" borderWidth="1px" p={2}>
      <Stack spacing={3}>
        <Heading p={2}>{props.column.title}</Heading>
        <Box>
          {props.tasks.map((task: ITask) => (
            <Task key={task.id} task={task} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

export default Column;
