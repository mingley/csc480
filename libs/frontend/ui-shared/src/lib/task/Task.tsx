import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from '../column/Column';
import { Box, Text, VStack } from '@chakra-ui/react';

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   padding: 8px;
//   margin-bottom: 8px;
//   border-radius: 2px;
//   background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
// `;

export interface TaskProps {
  task: ITask;
}

export function Task(props: TaskProps) {
  return (
    <Box borderWidth="1px" p={2} m={2} maxHeight="10%" maxWidth="100%" rounded={6} backgroundColor="Highlight">
      <VStack>
        <Text fontSize="2xl">{props?.task.title}</Text>
        <Text fontSize="md" noOfLines={2}>{props?.task.content}</Text>
      </VStack>
    </Box>
    // <Draggable draggableId={props.task.id} index={props.index}>
    //     {(provided, snapshot) => (

    //         //this is the contaianer for the task
    //         <Container
    //             {...provided.draggableProps}
    //             {...provided.dragHandleProps}
    //             ref={provided.innerRef}
    //             isDragging={snapshot.isDragging}
    //         >
    //              <div><h3>{props.task.title}</h3></div>
    //             {props.task.content}
    //         </Container>
    //     )}
    // </Draggable>
  );
}

export default Task;
