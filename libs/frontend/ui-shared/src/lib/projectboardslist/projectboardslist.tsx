import { Navbar } from '../..';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { MdWork, MdDeleteForever } from 'react-icons/md';
import NewProjectModal from '../new-project-modal/new-project-modal';

export function Projectboardslist() {
  const user = useRecoilValue(userAtom);
  const [projectboards, setProjectboards] = useRecoilState(projectBoardAtom);
  const setCurrentProjectSelection = useSetRecoilState(currentProjectAtom);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/users/project/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setProjectboards(res.data.projectboardsAndTasks.projects);
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
        <HStack spacing={100}>
          <Box>
            <Heading as="h1" size="lg">
              Tasks
            </Heading>
          </Box>
          <VStack>

          </VStack>
          <VStack divider={<StackDivider borderColor="gray.200" />}>
            <Heading as="h1" size="lg">
              Projects
            </Heading>
            <List spacing={3}>
              <VStack divider={<StackDivider borderColor="gray.200" />}>
                {projectboards?.map((projectboard) => (
                  <ListItem key={projectboard.id}>
                    <HStack spacing={5}>
                      <ListIcon as={MdWork} />
                      <Link
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
