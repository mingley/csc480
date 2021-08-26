import './register.module.scss';
import { VStack } from "@chakra-ui/react";


/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <VStack>
                <label>Username : </label>   
                 <input type="text" placeholder="Enter Email" name="email" required />  
                 <label>Password : </label>   
                 <input type="password" placeholder="Enter Password" name="password" required />  
                 <a href="/login-page"><button type="submit">Register</button> </a>
        </VStack>
  );
}

export default Register;
