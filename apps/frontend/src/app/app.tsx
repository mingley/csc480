import React, { useEffect, useState } from 'react';
import { Message } from '@group1/api-interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {Routes} from '@group1/frontend/ui-shared';


export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
    <div style={{ textAlign: 'center', display: "None"}}>
      <div>{m.message} on the frontend</div>
    </div>
    <Routes/>
    </>
  );
};

export default App;
