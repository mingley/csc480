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
  Button,
  Flex,
  Heading,
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
        setProjectboards(res.data.project);
      });
  }, [projectboards, setProjectboards, user]);

  const deleteProject = (id: string) => {
    axios
      .delete(`http://localhost:3333/api/users/project/${id}`)
      .then((res) => {
        setProjectboards(projectboards.filter((project) => project.id !== id));
      });
  };

  return (
    <>
      <Navbar />
      <Flex height="80vh" alignItems="center" justify="center">
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Heading mb={5} size="md">
            Welcome {user.id}! Here are your project boards:
          </Heading>
          <List spacing={3}>
            <VStack divider={<StackDivider borderColor="gray.200" />}>
              {projectboards?.map((projectboard) => (
                <ListItem key={projectboard.id}>
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
                  <ListIcon
                    as={MdDeleteForever}
                    onClick={() => deleteProject(projectboard.id)}
                  />
                </ListItem>
              ))}
            </VStack>
          </List>
          <NewProjectModal />
        </VStack>
      </Flex>
    </>
  );
}

export default Projectboardslist;
