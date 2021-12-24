import React, { useCallback, useMemo } from 'react';
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
import { compareAsc, format } from 'date-fns';

const ReservationCard = ({
  bike,
  id,
  startDate,
  endDate,
  isCancelled,
  onClickCancel,
  onClickAddReview,
  hideActions,
  showStatus,
}) => {
  const { user, isLoading } = useUser();

  const isCompletedReservation = useMemo(
    () => compareAsc(new Date(endDate), new Date()) < 1,
    [endDate],
  );
  const hasReviewed = useMemo(
    () => !!bike?.reviews?.find(review => review.ownerId === user?.sub),
    [endDate],
  );

  const renderAction = useCallback(() => {
    if (!user)
      return (
        <Button size="small" color="primary">
          {isLoading ? 'Loading...' : 'Login to make a reservation'}
        </Button>
      );
    if (!isCompletedReservation)
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onClickCancel}
        >
          Cancel Reservation
        </Button>
      );
    if (!hasReviewed)
      return (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onClickAddReview}
        >
          Add Review
        </Button>
      );
    return (
      <Typography variant="body2">
        You have already reviewed this bike!
      </Typography>
    );
  }, [
    user,
    isCompletedReservation,
    isLoading,
    hasReviewed,
    onClickAddReview,
    onClickCancel,
  ]);

  const renderStatus = useCallback(() => {
    let status = 'pending';
    if (isCancelled) status = 'cancelled';
    if (isCompletedReservation) status = 'completed';
    if (hasReviewed) status = 'reviewed';
    return (
      <Typography variant="body2">
        <b>Status:</b> {status}
      </Typography>
    );
  });
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
        {showStatus && renderStatus()}

        <Box mt={2}>
          <Typography gutterBottom color="GrayText">
            Bike details:
          </Typography>
          <Typography color="GrayText" variant="body2">
            Model: {bike?.model}
          </Typography>
          <Rating
            value={bike?.averageRating}
            size="small"
            sx={{ mb: 0 }}
            readOnly
          />
          <Typography color="GrayText" variant="body2">
            Color: {bike?.color}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2 }}>{!hideActions && renderAction()}</CardActions>
    </Card>
  );
};

ReservationCard.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isCancelled: PropTypes.bool,
  bike: PropTypes.shape({
    model: PropTypes.string,
    color: PropTypes.string,
    averageRating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({ ownerId: PropTypes.string, rate: PropTypes.number }),
    ),
  }),
  onClickCancel: PropTypes.func,
  onClickAddReview: PropTypes.func,
  hideActions: PropTypes.bool,
  showStatus: PropTypes.bool,
};

export default ReservationCard;
