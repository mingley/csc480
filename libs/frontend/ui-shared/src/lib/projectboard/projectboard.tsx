import React, { useState } from 'react';
import styled from 'styled-components';
import dataset from '../dataset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Navbar } from '../..';
import AddColumnForm from '../add-column-form/AddColumnForm';
import Column from '../column/Column';
import InviteForm from '../invite-form/InviteForrm';
import { Box, Button, Flex } from '@chakra-ui/react';

const Container = styled.div`
  display: flex;
`;

// const Button = styled.button`
//   height: 30%;
//   width: 7%;
//   font-size: 60%;
//   background-color: Black;
//   color: white;
//   border-radius: 5px;
//   cursor: pointer;
//   box-shadow: 0px 2px 2px lightgray;
//   transition: ease background-color 250ms;
//   transition: ease color 250ms;
//   &:hover {
//     cursor: default;
//     color: black;
//     background-color: white;
//     opacity: 0.7;
//   }
// `;

const Projectboard = ({ match }) => {
  const name = match.params.name;

  const workspace = dataset.find((workspace) => workspace.name === name);
  console.log(workspace);

  const [data, setData] = useState(workspace.data);
  const [isOpen, setIsOpen] = useState(false);
  const [inviteFormisOpen, inviteFormsetIsOpen] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) {
      return;
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //If you're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    //Anything below this happens if you're dragging tasks
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //If dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    //If dropped in a different column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const addColumn = () => {
    setIsOpen(!isOpen);
    console.log('You have added a Column');
  };

  const inviteUser = () => {
    inviteFormsetIsOpen(!inviteFormisOpen);
    console.log('You have added a user');
  };

  const columns = [
    { title: 'To Do', id: 'column-1' },
    { title: 'In Progress', id: 'column-2' },
    { title: 'Done', id: 'column-3' },
  ];

  return (
    <Box>
      <Navbar />
      <Flex
        borderWidth="2px"
        borderColor="gray.200"
        height="80vh"
        direction="row"
        background="gray.700"
        rounded={6}
      >
        {columns.map((column) => {
          // return <Column key={column.id} column={column} tasks={tasks} />
          return (
            <Box
              key={column.id}
              width="20%"
              background="ActiveBorder"
              borderWidth="1px"
              p={2}
            >
              {column.title}
            </Box>
          );
        })}
      </Flex>
      <Flex alignItems="center" justify="end" p={2}>
        <Button onClick={addColumn} mr={2}>Add Column</Button>
        <Button onClick={inviteUser}>Invite User</Button>
      </Flex>
      {isOpen && (
        <AddColumnForm setIsOpen={setIsOpen} data={data} setData={setData} />
      )}
      {inviteFormisOpen && (
        <InviteForm
          setIsOpen={inviteFormsetIsOpen}
          data={data}
          setData={setData}
        />
      )}
    </Box>
  );
};

export default Projectboard;

// <>
//   {isOpen && <AddColumnForm
//   handleClose={addColumn}
// />}
// {inviteFormisOpen && <InviteForm
//   handleClose={inviteUser}
// />}
// <h2>{name}</h2>
// <Button onClick={addColumn}>Add Column</Button>
// <Button onClick={inviteUser}>Invite User</Button>
// <DragDropContext onDragEnd={onDragEnd}>
//   <Droppable droppableId='all-columns' direction='horizontal' type='column'>
//     {(provided) => (
//       <Container {...provided.droppableProps} ref={provided.innerRef}>
//         {data.columnOrder.map((id, index) => {
//           const column = data.columns[id]
//           const tasks = column.taskIds.map(taskId => data.tasks[taskId])

//           return <Column key={column.id} column={column} tasks={tasks} index={index} />
//         })}
//         {provided.placeholder}
//       </Container>
//     )}
//   </Droppable>
// </DragDropContext>
// </>
