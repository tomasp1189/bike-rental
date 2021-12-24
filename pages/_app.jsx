import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { ToastContainer } from 'react-toastify';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Script from 'next/script';

import theme from '../styles/theme';
import Layout from '../components/organisms/Layout';
import ErrorBoundary from '../components/organisms/ErrorBoundary';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

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
    <Script
      type="text/javascript"
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
    />
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ErrorBoundary>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
          <ToastContainer />
        </ErrorBoundary>
      </LocalizationProvider>
    </ThemeProvider>
  </>
);
MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
};

export default MyApp;
