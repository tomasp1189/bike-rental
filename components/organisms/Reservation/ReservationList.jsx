import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import ReservationCard from './ReservationCard';
import ReviewForm from './ReviewForm';
import ConfirmationDialog from '../ConfirmationDialog';
import FormModal from '../../molecules/FormModal';

const ReservationList = ({ reservations }) => {
  const [isVisible, setIsVisible] = useState(null);
  const [addReviewIsVisible, setAddReviewIsVisible] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const contentType = 'application/json';

  const postData = async reservationId => {
    try {
      const res = await fetch(`/api/reservation/${reservationId}/cancel`, {
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
      setSelectedReservation(null);
    } catch (error) {
      console.log('Failed create reservation');
    }
  };
  const postReview = async values => {
    try {
      const res = await fetch(`/api/bike/${values.id}/review`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          review: {
            rate: values.rating,
          },
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      setAddReviewIsVisible(false);
      setSelectedReservation(null);
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
  const handleOnClickAddReview = reservation => () => {
    setSelectedReservation(reservation);
    setAddReviewIsVisible(true);
  };
  const handleOnClickSubmitReview = values => {
    postReview({ id: values.bike, rating: values.rating });
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
                onClickCancel={handleOnClickCancel(reservation)}
                onClickAddReview={handleOnClickAddReview(reservation)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={4} sm={8} md={12}>
            <Typography>
              You have no pending reservations,{' '}
              <Link href="/bike">make your first one!</Link>
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
};

export default ReservationList;
