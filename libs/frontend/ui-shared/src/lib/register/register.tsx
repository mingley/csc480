import './register.module.scss';


/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <div>
                <label>Username : </label>   
                 <input type="text" placeholder="Enter Email" name="email" required />  
                 <label>Password : </label>   
                 <input type="password" placeholder="Enter Password" name="password" required />  
                 <a href="/login-page"><button type="submit">Register</button> </a>
        </div>
  );
}

export default Register;
