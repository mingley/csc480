import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import './register.module.scss';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {

  const [isRegistered, setIsRegistered] = useState(false);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    try {
      const res = await axios.post('http://localhost:3333/api/auth/register', {
        ...values,
      });
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          setIsRegistered(true);
        },
      });
    } catch (e: any) {
      const res = e.response.data;
      if (res.error.includes('Unique constraint')) {
        toast({
          title: 'Error',
          description: 'Email already exists. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      console.log('registration error', res.error);
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" background="gray.700" p={12} rounded={6}>
          <Heading mb={6}>registration</Heading>
          <FormControl isInvalid={errors.firstName} mb={3}>
            <FormLabel>First Name</FormLabel>
            <Input
              id="first_name"
              type="text"
              {...register('firstName', {
                required: 'Name is required',
              })}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.lastName} mb={3}>
            <FormLabel>Last Name</FormLabel>
            <Input
              id="last_name"
              type="text"
              {...register('lastName', {
                required: 'Name is required',
              })}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} mb={3}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
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
          <FormControl isInvalid={errors.password} mb={3}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password required',
                minLength: {
                  value: 8,
                  message: 'Minimum length should be 8',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            <FormHelperText mb={6}>
              Email/password will be used to login.
            </FormHelperText>
          </FormControl>
          <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </Flex>
      </form>
      {isRegistered && <Redirect to="/login" />}
    </Flex>
  );
}

export default Register;
