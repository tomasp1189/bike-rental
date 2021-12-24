import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const BikeCard = ({ model, color, rating, onClickReserve }) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (error) return <div>{error.message}</div>;
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" mb={0}>
          {model}
        </Typography>
        <Rating value={rating} size="small" sx={{ mb: 2 }} readOnly />
        <Typography>Color: {color}</Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        {user ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onClickReserve}
          >
            Reserve
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={() => !isLoading && router.push('/api/auth/login')}
          >
            {isLoading ? 'Loading...' : 'Login to make a reservation'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

BikeCard.propTypes = {
  model: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
  onClickReserve: PropTypes.func,
};

export default BikeCard;
