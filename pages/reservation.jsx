/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { CircularProgress, Typography } from '@mui/material';

import Reservation from '../server/Reservation/Reservation';
import dbConnect from '../server/lib/dbConnect';
import ReservationList from '../components/organisms/Reservation/ReservationList';
import apiClient from '../helpers/apiClient';

const ReservationPage = ({ reservations = [] }) => {
  const { data: pendingReservations, isValidating } = useSWR(
    '/api/reservation?cancelled=false&pending=true',
    apiClient.fetcher,
    {
      fallbackData: reservations,
    },
  );
  const { data: completedReservations, isValidating: isValidatingCompleted } =
    useSWR(
      '/api/reservation?cancelled=false&pending=false',
      apiClient.fetcher,
      {},
    );

  return (
    <>
      <Typography component="h1" variant="h4" mb={4}>
        Pending Reservations
      </Typography>
      {!pendingReservations || isValidating ? (
        <CircularProgress />
      ) : (
        <ReservationList reservations={pendingReservations} />
      )}
      <Typography component="h2" variant="h4" mt={4} mb={4}>
        Completed Reservations
      </Typography>
      {!completedReservations || isValidatingCompleted ? (
        <CircularProgress />
      ) : (
        <ReservationList reservations={completedReservations} />
      )}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async function getServerSideProps() {
    /* find all the data in our database */
    await dbConnect();
    const result = await Reservation.find({ isCancelled: false });
    const reservations = result.map(doc => {
      const reservation = JSON.parse(JSON.stringify(doc));
      //  doc.toObject();
      reservation._id = reservation._id.toString();
      return reservation;
    });

    return { props: { reservations } };
  },
});

ReservationPage.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
};

export default ReservationPage;
