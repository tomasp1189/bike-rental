import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import ReservationCard from './ReservationCard';
import ReviewForm from './ReviewForm';
import ConfirmationDialog from '../ConfirmationDialog';
import FormModal from '../../molecules/FormModal';
import reservationApi from '../../../api/reservationApi';

const ReservationList = ({
  reservations,
  hideActions,
  showStatus,
  emptyMessage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addReviewIsVisible, setAddReviewIsVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleOnClose = () => {
    setIsVisible(false);
  };
  const handleOnClickConfirm = () => {
    reservationApi.cancelReservation(selectedReservation._id, () => {
      setIsVisible(false);
      setSelectedReservation(null);
    });
  };
  const handleOnClickCancel = reservation => () => {
    setSelectedReservation(reservation);
    setIsVisible(true);
  };
  const handleOnClickAddReview = reservation => () => {
    setSelectedReservation(reservation);
    setAddReviewIsVisible(true);
  };
  const handleOnClickSubmitReview = values => {
    reservationApi.addReview({ id: values.bike, rating: values.rating }, () => {
      setAddReviewIsVisible(false);
      setSelectedReservation(null);
    });
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* Create a card for each pet */}
        {reservations?.length > 0 ? (
          reservations.map(reservation => (
            <Grid item key={reservation._id} xs={4} sm={4} md={4}>
              <ReservationCard
                id={reservation._id}
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                bike={reservation.bike}
                isCancelled={reservation.isCancelled}
                onClickCancel={handleOnClickCancel(reservation)}
                onClickAddReview={handleOnClickAddReview(reservation)}
                showStatus={showStatus}
                hideActions={hideActions}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={4} sm={8} md={12}>
            <Typography>
              {emptyMessage || (
                <span>
                  You have no pending reservations,{' '}
                  <Link href="/bike">make one!</Link>
                </span>
              )}
            </Typography>
          </Grid>
        )}
      </Grid>
      <ConfirmationDialog
        open={isVisible}
        title="Cancel Reservation"
        body="Are you sure you want to cancel this reservation?"
        onClose={handleOnClose}
        onClickCancel={handleOnClose}
        onClickConfirm={handleOnClickConfirm}
      />
      <FormModal
        open={addReviewIsVisible}
        onClose={() => {
          setAddReviewIsVisible(false);
        }}
        title="Reservation"
      >
        <ReviewForm
          onSubmit={handleOnClickSubmitReview}
          bike={selectedReservation?.bike}
        />
      </FormModal>
    </>
  );
};

ReservationList.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
  hideActions: PropTypes.bool,
  showStatus: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

export default ReservationList;
