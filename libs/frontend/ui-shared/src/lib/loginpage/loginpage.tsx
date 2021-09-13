import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { user as userAtom } from '../atoms';

export function Loginpage() {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [user, setUser] = useRecoilState(userAtom);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { toggleColorMode } = useColorMode();

  const formBackground = useColorModeValue('gray.300', 'gray.700');

  async function onSubmit(values: any) {
    try {
      const res = await axios.post('http://localhost:3333/api/auth/login', {
        ...values,
      });
      if (res.status === 200) {
        console.log(res.data);
        setUser(res.data.user);
        localStorage.setItem('token', res.data.accessToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e: any) {
      const res = e.response.data;
      console.log('login error ', res.error);
      if (res.error) {
        toast({
          title: 'Error',
          description: `${res.error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>welcome.</Heading>
          <FormControl isInvalid={errors.email} mb={3}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              {...register('email', {
                required: 'Email required',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} mb={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              type="password"
              {...register('password', {
                required: 'Password required',
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
            mb={3}
          >
            Log In
          </Button>
          <Button colorScheme="blue" mb={3}>
            <Link to="/register">Register</Link>
          </Button>
          <Button variant="outline" onClick={toggleColorMode}>
            Dark Mode?
          </Button>
        </Flex>
      </form>
      {isLoggedIn ? <Redirect to="/project_list" /> : null}
    </Flex>
  );
}

export default Loginpage;
