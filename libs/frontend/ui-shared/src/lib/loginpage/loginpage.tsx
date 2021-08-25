import './loginpage.module.scss';
import styled from 'styled-components'
import {Center, VStack} from "@chakra-ui/react"


const Container = styled.div`
    color:black;
    margin: 5px; 
    
`


/* eslint-disable-next-line */
export interface LoginpageProps {}

export function Loginpage(props: LoginpageProps) {
  return (
      
    <VStack spacing = "15px" h="400px">
    <img src='/Espailer.png' className="App-logo" alt="logo" />
            <h1>Espalier</h1> 
             <Container >   
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" name="username" required />  
               </Container>
                <Container>
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" name="password" required />  
                <Container>   
                    <a href="/Project-Boards-List"><input type="submit" value="Login"></input></a>  
                    <a href="/register"><input type="submit" value="Register"></input></a>   
                </Container>   
            </Container>
    </VStack>
  );
}

export default Loginpage;
