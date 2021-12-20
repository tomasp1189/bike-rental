import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';

const AuthActions = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <Button
          sx={{ color: 'common.white', borderColor: 'common.white' }}
          variant="outlined"
          color="secondary"
          size="small"
          href="/api/auth/logout"
        >
          Logout
        </Button>
      ) : (
        <Button
          sx={{ color: 'common.white', borderColor: 'common.white' }}
          variant="outlined"
          color="secondary"
          size="small"
          href="/api/auth/login"
        >
          Login
        </Button>
      )}
    </div>
  );
};

AuthActions.propTypes = {};

export default AuthActions;
