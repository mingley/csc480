import { Flex, Heading, Input, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';

export function Index() {

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const login = () => {
    console.log("login");
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} padding={12} rounded={6}>
        <Heading mb={6} alignSelf="center">Log In</Heading>
        <Input placeholder="username" variant="filled" mb={3} type="email" />
        <Input placeholder="password" variant="filled" mb={6} type="password" />
        <Button mb={6} colorScheme="teal" onClick={login}>Log In</Button>
        <Button onClick={toggleColorMode}>Dark Mode</Button>
      </Flex>
    </Flex>
  );
}

export default Index;
