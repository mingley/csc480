import './projectboardslist.module.scss';
import { Navbar } from '../..';
import { Link} from 'react-router-dom';
import dataset from '../dataset.js'

/* eslint-disable-next-line */
export interface ProjectboardslistProps {}

export function Projectboardslist(props: ProjectboardslistProps) {
  return (
    <>
    <Navbar />
    <h1>Your Projects:</h1>
    {
        dataset.map((projectBoard, key) => (
            <Link className="article-list-item" key={key} to={`/projectBoard/${projectBoard.name}`}>
                <h3>{projectBoard.name}</h3>
            </Link>
        ))
    }   
    </>
  );
}

export default Projectboardslist;
