import React, { useMemo, useState } from 'react';
// import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from '@emotion/react';

import AuthActions from '../molecules/AuthActions';

const NavBar = () => {
  const theme = useTheme();
  const { user } = useUser();
  const router = useRouter();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const isManager = user?.['http://localhost:3000/roles'].includes('Manager');

  const navigationItems = useMemo(() => {
    if (!isManager)
      return [
        <Button
          key="/bike"
          color={matches ? 'secondary' : 'primary'}
          sx={{ my: { xs: 0, md: 2 }, display: 'block' }}
          onClick={() => router.push('/bike')}
        >
          Bikes
        </Button>,
        user && (
          <Button
            key="/reservation"
            color={matches ? 'secondary' : 'primary'}
            sx={{ my: { xs: 0, md: 2 }, display: 'block' }}
            onClick={() => router.push('/reservation')}
          >
            Reservations
          </Button>
        ),
      ];

    return [
      <Button
        key="/admin/user"
        color={matches ? 'secondary' : 'primary'}
        sx={{ my: { xs: 0, md: 2 }, display: 'block' }}
        onClick={() => router.push('/admin/user')}
      >
        Users
      </Button>,
      <Button
        key="/admin/bike"
        color={matches ? 'secondary' : 'primary'}
        sx={{ my: { xs: 0, md: 2 }, display: 'block' }}
        onClick={() => router.push('/admin/bike')}
      >
        Bikes
      </Button>,
    ];
  }, [user, matches, router, isManager]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navigationItems.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  {[item]}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PedalBikeIcon sx={{ mr: 2 }} />
            <Typography variant="h6">
              {isManager ? 'Admin Panel' : 'Bike Rental'}
            </Typography>
          </Box>
          <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
            {navigationItems}
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
      {/* need the extra toolbar to push content down */}
      <Toolbar
        sx={{
          height: '69px',
        }}
      />
    </>
  );
};

NavBar.propTypes = {};

export default NavBar;
