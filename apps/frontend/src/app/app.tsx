import { useEffect, useState } from 'react';
// import { Message } from '@group1/api-interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Routes } from '@group1/frontend/ui-shared';

export const App = () => {
  // const [m, setMessage] = useState<Message>({ message: '' });

  // useEffect(() => {
  //   fetch('/api')
  //     .then((r) => r.json())
  //     .then(setMessage);
  // }, []);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
