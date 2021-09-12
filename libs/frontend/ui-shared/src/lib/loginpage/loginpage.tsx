import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import register from '../register/register';
import axios from 'axios';

/* eslint-disable-next-line */
export interface LoginpageProps {}

export function Loginpage(props: LoginpageProps) {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const { toggleColorMode } = useColorMode();

  const formBackground = useColorModeValue('gray.300', 'gray.700');

  async function onSubmit(values: any) {
    try {
      const res = await axios.post('http://localhost:3333/api/auth/login', {
        ...values,
      });
      console.log('login success ', res.data);
    } catch (e: any) {
      const res = e.response.data;
      console.log('login error ', res.error);
      if (res.error) {
        setError('email', {
          type: 'server',
          message: 'Username not found. Please register for access.',
        });
      }
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>welcome.</Heading>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              mb={3}
              type="email"
              {...register('email', {
                required: 'This is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              mb={3}
              type="password"
              {...register('password', {
                required: 'This is required',
                minLength: {
                  value: 8,
                  message: 'Minimum length should be 8',
                },
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
    </Flex>
  );
}

export default Loginpage;
