import './navbar.module.scss';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const nav = styled.div`
    display:inline;
    color: white;
`;

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <nav>
        <ul id="navMenu">
            <li>
               <Link to="/Project-Boards-List"> Projects </Link>
            </li>
            <li>
                <Link to="/login-page">logout</Link>
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;
