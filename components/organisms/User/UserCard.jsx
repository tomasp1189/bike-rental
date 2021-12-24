import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { compareAsc, format } from 'date-fns';

const UserCard = ({
  bike,
  id,
  startDate,
  endDate,
  isCancelled,
  owner,
  showStatus,
}) => {
  const { user } = useUser();

  const isCompletedReservation = useMemo(
    () => compareAsc(new Date(endDate), new Date()) < 1,
    [endDate],
  );
  const hasReviewed = useMemo(
    () => !!bike?.reviews?.find(review => review.ownerId === user?.sub),
    [bike?.reviews, user?.sub],
  );

  const renderStatus = useCallback(() => {
    let status = 'pending';
    if (isCancelled) status = 'cancelled';
    if (isCompletedReservation) status = 'completed';
    if (hasReviewed) status = 'reviewed';
    return (
      <Typography variant="body2" color="GrayText">
        <b>Status:</b> {status}
      </Typography>
    );
  });
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2" mb={0}>
          {owner?.name}
        </Typography>
        <Typography variant="caption">{owner?.user_id}</Typography>

        <Box mt={2}>
          <Typography variant="h6" component="h4" mb={0} color="GrayText">
            Reservation
          </Typography>
          <Typography variant="caption" color="GrayText">
            {id}
          </Typography>
          <Typography variant="body2" mt={1} color="GrayText">
            <b>Start date:</b> {format(new Date(startDate), 'EE, dd MMM yyyy')}
          </Typography>
          <Typography variant="body2" color="GrayText">
            <b>End date:</b> {format(new Date(endDate), 'EE, dd MMM yyyy')}
          </Typography>
          {showStatus && renderStatus()}
        </Box>
      </CardContent>

      {/* <CardActions sx={{ p: 2 }}>{!hideActions && renderAction()}</CardActions> */}
    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isCancelled: PropTypes.bool,
  owner: PropTypes.shape({
    name: PropTypes.string,
    user_id: PropTypes.string,
  }),
  bike: PropTypes.shape({
    model: PropTypes.string,
    color: PropTypes.string,
    averageRating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({ ownerId: PropTypes.string, rate: PropTypes.number }),
    ),
  }),
  showStatus: PropTypes.bool,
};

export default UserCard;
