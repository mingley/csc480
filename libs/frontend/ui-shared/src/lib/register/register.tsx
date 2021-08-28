import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './register.module.scss';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <Flex height="100vh" alignItems="center" justify="center">
      <Flex direction="column" background="gray.700" p={12} rounded={6}>
        <Heading mb={6}>registration</Heading>
        <FormControl id="first_name">
          <FormLabel>First Name</FormLabel>
          <Input mb={3} type="first_name" />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input mb={3} type="last_name" />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input mb={3} type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
          <FormHelperText mb={6}>Email/password will be used to login.</FormHelperText>
        </FormControl>
        <Button colorScheme="teal">
          <Link to="/register">Submit</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Register;
