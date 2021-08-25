import './register.module.scss';
import {Center} from "@chakra-ui/react"


/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <Center bg="white" h="600px" color="black">
       <div >
         <h1>Register For Espalier</h1>
          <label>Username : </label>   
          <input type="text" placeholder="Enter Email" name="email" required />  
          <label>Password : </label>   
         <input type="password" placeholder="Enter Password" name="password" required />  
          <a href="/login-page"><button type="submit">Register</button> </a>
      </div>
    </Center>
   
  );
}

export default Register;
