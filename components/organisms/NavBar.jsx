import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import AuthActions from '../molecules/AuthActions';

const NavBar = props => {
  // const { user } = useUser();
  // const isManager = user['http://localhost:3000/roles'].includes('Manager');
  const router = useRouter();
  return (
    <AppBar position="fixed">
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
          <Button
            color="secondary"
            sx={{ my: 2, color: 'white', display: 'block' }}
            onClick={() => router.push('/bike')}
          >
            Bikes
          </Button>
          <Button
            color="secondary"
            sx={{ my: 2, color: 'white', display: 'block' }}
            onClick={() => router.push('/reservation')}
          >
            Reservations
          </Button>
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
    // add toolbar to push page downwards
  );
};

NavBar.propTypes = {};

export default NavBar;
