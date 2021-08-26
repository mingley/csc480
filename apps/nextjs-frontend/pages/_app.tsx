import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider resetCSS>
          <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default CustomApp;
