import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import AuthActions from '../molecules/AuthActions';

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PedalBikeIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Bike Rental</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <AuthActions />
        </Box>
      </Toolbar>
    </AppBar>
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
