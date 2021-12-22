import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { format } from 'date-fns';

const ReservationCard = ({ bike, id, startDate, endDate, onClickCancel }) => {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" mb={0}>
          Reservation
        </Typography>
        <Typography variant="caption">{id}</Typography>
        <Typography variant="body2" mt={1}>
          <b>Start date:</b> {format(new Date(startDate), 'EE, dd MMM yyyy')}
        </Typography>
        <Typography variant="body2">
          <b>End date:</b> {format(new Date(endDate), 'EE, dd MMM yyyy')}
        </Typography>

        <Box mt={2}>
          <Typography gutterBottom color="GrayText">
            Bike details:
          </Typography>
          <Typography color="GrayText" variant="body2">
            Model: {bike.model}
          </Typography>
          <Rating value={bike?.rating} size="small" sx={{ mb: 0 }} />
          <Typography color="GrayText" variant="body2">
            {bike.color}
          </Typography>
          <Typography color="GrayText" variant="body2">
            Color: {bike?.color}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        {user ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onClickCancel}
          >
            Cancel Reservation
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

ReservationCard.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  bike: PropTypes.shape({
    model: PropTypes.string,
    color: PropTypes.string,
    rating: PropTypes.number,
  }),
  onClickCancel: PropTypes.func,
};

export default ReservationCard;
