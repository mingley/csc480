import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
);
