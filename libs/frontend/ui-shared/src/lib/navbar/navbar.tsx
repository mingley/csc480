import './navbar.module.scss';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';

const nav = styled.div`
  display: inline;
  color: white;
`;

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("logout");
  }

  return (
    <Flex direction="row" justify="center" alignItems="center">
      <Box p="2">
        <Heading size="md">Espalier</Heading>
      </Box>
      <Spacer />
      <Box p="2">
        <Button colorScheme="teal" mr="4">
          <Link to="/project_list"> Projects </Link>
        </Button>
        <Button colorScheme="teal" onClick={logout}>
          <Link to="/login">Logout</Link>
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;
