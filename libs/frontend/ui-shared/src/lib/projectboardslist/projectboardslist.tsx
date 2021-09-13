import { Navbar } from '../..';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { user as userAtom, projectboards as projectBoardAtom } from '../atoms';
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
import { MdWork } from 'react-icons/md';
import NewProjectModal from '../new-project-modal/new-project-modal';

export function Projectboardslist() {
  const user = useRecoilValue(userAtom);
  const [projectboards, setProjectboards] = useRecoilState(projectBoardAtom);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/users/projectboards/${user.id}`)
      .then((res) => {
        setProjectboards(res.data.project);
      });
  }, [projectboards, setProjectboards, user]);

  return (
    <>
      <Navbar />
      <Flex height="80vh" alignItems="center" justify="center">
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Heading mb={5} size="md">
            Welcome {user.id}! Here are your project boards:
          </Heading>
          <List spacing={3}>
            {projectboards?.map((projectboard) => (
              <ListItem key={projectboard.id}>
                <ListIcon as={MdWork} />
                <Link to={`/projectboard/${projectboard.id}`}>
                  {projectboard.name}
                </Link>
              </ListItem>
            ))}
          </List>
          <NewProjectModal />
        </VStack>
      </Flex>
    </>
  );
}

export default Projectboardslist;
