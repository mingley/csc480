import { Navbar } from '../..';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
  user as userAtom,
  projectboards as projectBoardAtom,
  current_project as currentProjectAtom,
} from '../atoms';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  StackDivider,
  VStack,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { MdWork, MdDeleteForever } from 'react-icons/md';
import NewProjectModal from '../new-project-modal/new-project-modal';
import { ITask } from '../interfaces';

export function Projectboardslist() {
  const user = useRecoilValue(userAtom);
  const [projectboards, setProjectboards] = useRecoilState(projectBoardAtom);
  const setCurrentProjectSelection = useSetRecoilState(currentProjectAtom);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/users/project/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setProjectboards(res.data.projectboardsAndTasks.projects);
        setTasks(res.data.projectboardsAndTasks.assigned_tasks);
      });
  }, [setProjectboards, user]);

  const deleteProject = (id: string) => {
    axios
      .delete(`http://localhost:3333/api/users/project/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setProjectboards(
            projectboards.filter((project) => project.id !== id)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <Flex height="80vh" alignItems="start" justify="center" overflow="auto">
        <HStack spacing={100} divider={<StackDivider borderColor="gray.200" />}>
          <VStack divider={<StackDivider borderColor="gray.200" />}>
            <Heading as="h1" size="lg">
              Tasks
            </Heading>
            <List spacing={3}>
              {tasks?.map((task: ITask) => (
                <ListItem key={task.id}>
                  <ListIcon as={MdWork} />
                  <Link as={RouterLink} to={`/task/${task.id}`}>
                    {task.content}
                  </Link>
                </ListItem>
              ))}
            </List>
          </VStack>
          <VStack divider={<StackDivider borderColor="gray.200" />}>
            <Heading as="h1" size="lg">
              Projects
            </Heading>
            <List spacing={3}>
              <VStack divider={<StackDivider borderColor="gray.200" />}>
                {projectboards?.map((projectboard) => (
                  <ListItem key={projectboard.id}>
                    <HStack spacing={10}>
                      <Link
                        as={RouterLink}
                        to={`/project/${projectboard.id}`}
                        onClick={() =>
                          setCurrentProjectSelection({
                            id: projectboard.id,
                            name: projectboard.name,
                          })
                        }
                      >
                        {projectboard.name}
                      </Link>
                      <Button onClick={() => deleteProject(projectboard.id)}>
                        <Icon as={MdDeleteForever} />
                      </Button>
                    </HStack>
                  </ListItem>
                ))}
              </VStack>
            </List>
            <NewProjectModal />
          </VStack>
        </HStack>
      </Flex>
    </>
  );
}

export default Projectboardslist;
