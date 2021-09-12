import { Navbar } from '../..';
import { Link } from 'react-router-dom';
import { dataset } from '../dataset.js';
import { useEffect } from 'react';
import axios from 'axios';
import { userState } from '../dataset';
import { useRecoilValue } from 'recoil';

export function Projectboardslist() {

  const user = useRecoilValue(userState);

  useEffect(() => {
    // axios.get('http://localhost:5000/api/');
    console.log(user);
  }, [user]);

  return (
    <>
      <Navbar />
      <h1>Your Projects:</h1>
      {dataset.map((projectBoard, key) => (
        <Link
          className="article-list-item"
          key={key}
          to={`/projectBoard/${projectBoard.name}`}
        >
          <h3>{projectBoard.name}</h3>
        </Link>
      ))}
    </>
  );
}

export default Projectboardslist;
