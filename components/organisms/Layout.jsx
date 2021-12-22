import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';

import NavBar from './NavBar';

const Layout = ({ children }) => (
  <>
    <NavBar />
    <Container sx={{ my: 3 }}>{children}</Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
