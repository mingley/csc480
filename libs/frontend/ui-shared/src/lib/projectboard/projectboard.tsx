/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { dataset } from '../dataset';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Navbar } from '../..';
import AddColumnForm from '../add-column-form/AddColumnForm';
import Column from '../column/Column';
import InviteForm from '../invite-form/InviteForrm';
import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  user as userAtom,
  current_project as currentProjectAtom,
  project_columns as projectColumnsAtom,
} from '../atoms';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NewTaskModal from '../new-task-modal/new-task-modal';

// @ts-ignore
const Projectboard = () => {
  function removeItemAtIndex(arr: any, index: any) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

  // @ts-ignore
  const { projectId } = useParams();

  const user = useRecoilValue(userAtom);

  const currentProject = useRecoilValue(currentProjectAtom);
  const [columns, setColumns] = useRecoilState(projectColumnsAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [inviteFormisOpen, inviteFormsetIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/users/project/${projectId}/columns`)
      .then((res) => {
        console.log(res.data);
        setColumns(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setColumns, currentProject, projectId]);

  const addColumn = () => {
    setIsOpen(!isOpen);
    console.log('You have added a Column');
  };

  const inviteUser = () => {
    inviteFormsetIsOpen(!inviteFormisOpen);
    console.log('You have added a user');
  };

  const deleteTask = (taskId: string, columnId: string) => {
    axios
      .delete(`/api/users/project/task/${taskId}`)
      .then((res) => {
        console.log(res);
        // find column and remove task
        const index = columns.findIndex((column) => column.id === columnId);

        const newColumns = columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: removeItemAtIndex(
                column.tasks,
                column.tasks.findIndex((task) => task.id === taskId)
              ),
            };
          } else {
            return column;
          }
        });
        setColumns(newColumns);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDragEnd = (
    result: DropResult,
    columns: { [x: string]: any },
    setColumns: { (value: any): void; (arg0: any): void }
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

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
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Flex
                direction="column"
                p={2}
                alignItems="center"
                key={columnId}
                border="2px"
                height="100%"
                width="100%"
              >
                <Heading>
                  {
                    // @ts-ignore
                    column.title
                  }
                </Heading>
                <Box m={1}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      // column tasks
                      return (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          background={
                            snapshot.isDraggingOver ? 'blue.100' : 'gray.700'
                          }
                          p={2}
                          width="100%"
                        >
                          {
                            // @ts-ignore
                            column.tasks?.map(
                              (
                                task: {
                                  id: string;
                                  content: string;
                                  title: string;
                                  status: string;
                                },
                                index: number
                              ) => {
                                return (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          mb={1}
                                          p={5}
                                          width="100%"
                                          height="100%"
                                          border="1px"
                                          backgroundColor={
                                            snapshot.isDragging
                                              ? 'blue.100'
                                              : 'gray.700'
                                          }
                                        >
                                          <Box as="h2" m={3}>
                                            Title: {task.title}
                                          </Box>
                                          <Box as="h6">
                                            Content: {task.content}
                                          </Box>
                                          <Box>
                                            <Button
                                              onClick={() =>
                                                deleteTask(task.id, column.id)
                                              }
                                            >
                                              Delete me
                                            </Button>
                                          </Box>
                                        </Box>
                                      );
                                    }}
                                  </Draggable>
                                );
                              }
                            )
                          }
                          {provided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Box>
                <NewTaskModal columnId={column.id} />
              </Flex>
            );
          })}
        </DragDropContext>
      </Flex>
      <Flex alignItems="center" justify="end" p={2}>
        <Button onClick={addColumn} mr={2}>
          Add Column
        </Button>
        <Button onClick={inviteUser}>Invite User</Button>
      </Flex>
    </Box>
  );
};

export default Projectboard;
