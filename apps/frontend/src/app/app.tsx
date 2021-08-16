import React, { useEffect, useState } from 'react';
import { Message } from '@group1/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div>{m.message} on the frontend</div>
    </div>
  );
};

export default App;
