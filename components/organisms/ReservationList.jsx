import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ReservationCard from './ReservationCard';
import ConfirmationDialog from './ConfirmationDialog';

const ReservationList = ({ reservations }) => {
  const [isVisible, setIsVisible] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const contentType = 'application/json';

  const postData = async values => {
    try {
      const res = await fetch(`/api/reservation/${values.id}/cancel`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      setIsVisible(false);
    } catch (error) {
      console.log('Failed create reservation');
    }
  };

  const handleOnClose = () => {
    setIsVisible(false);
  };
  const handleOnClickConfirm = () => {
    postData({ id: selectedReservation._id });
  };
  const handleOnClickCancel = reservation => () => {
    setSelectedReservation(reservation);
    setIsVisible(true);
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* Create a card for each pet */}
        {reservations.map(reservation => (
          <Grid item key={reservation._id} xs={4} sm={4} md={4}>
            <ReservationCard
              id={reservation._id}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              bike={reservation.bike}
              onClickCancel={handleOnClickCancel(reservation)}
            />
          </Grid>
        ))}
      </Grid>
      <ConfirmationDialog
        open={isVisible}
        title="Cancel Reservation"
        body="Are you sure you want to cancel this reservation?"
        onClose={handleOnClose}
        onClickCancel={handleOnClose}
        onClickConfirm={handleOnClickConfirm}
      />
    </>
  );
};

ReservationList.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
};

export default ReservationList;
