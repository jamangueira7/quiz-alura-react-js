import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';


const GlobalStyle = createGlobalStyle`
 
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
