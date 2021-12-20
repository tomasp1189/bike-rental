import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';

const BikeCard = ({ model, color }) => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  if (error) return <div>{error.message}</div>;
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {model}
        </Typography>
        <Typography>Color: {color}</Typography>
      </CardContent>
      <CardActions>
        {user ? (
          <Button variant="contained" size="small" color="primary">
            Reserve
          </Button>
        ) : (
          <Button size="small" color="primary">
            {isLoading ? 'Loading...' : 'Login to make a reservation'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

BikeCard.propTypes = { model: PropTypes.string, color: PropTypes.string };

export default BikeCard;
