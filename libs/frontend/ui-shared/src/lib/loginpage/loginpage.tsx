import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginpageProps {}

export function Loginpage(props: LoginpageProps) {
  const handleLogin = () => {
    console.log('login');
  };

  const { toggleColorMode } = useColorMode();

  const formBackground = useColorModeValue('gray.300', 'gray.700');

  return (
    <Flex height="100vh" alignItems="center" justify="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>welcome.</Heading>
        <Input placeholder="username"  mb={3} type="email" />
        <Input placeholder="password"  mb={3} type="password" />
        <Button colorScheme="teal" onClick={handleLogin} mb={3}>
          Log In
        </Button>
        <Button colorScheme="blue" mb={3}>
          <Link to="/register">Register</Link>
        </Button>
        <Button variant="outline" onClick={toggleColorMode}>
          Dark Mode?
        </Button>
      </Flex>
    </Flex>
  );
}

export default Loginpage;
