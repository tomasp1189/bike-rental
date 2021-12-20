import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UserProvider } from '@auth0/nextjs-auth0';

import theme from '../styles/theme';
import Layout from '../components/organisms/Layout';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <title>Pet Care App</title>
    </Head>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  </>
);
// eslint-disable-next-line react/forbid-prop-types
MyApp.propTypes = { Component: PropTypes.node, pageProps: PropTypes.any };

export default MyApp;
