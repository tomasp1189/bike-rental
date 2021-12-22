/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { CircularProgress, Typography } from '@mui/material';

import Reservation from '../server/Reservation/Reservation';
import dbConnect from '../server/lib/dbConnect';
import ReservationList from '../components/organisms/ReservationList';

const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data);

const ReservationPage = ({ reservations = [] }) => {
  const { data, isValidating } = useSWR(
    '/api/reservation?cancelled=false',
    fetcher,
    {
      fallbackData: reservations,
      // revalidateOnFocus: false,
      // revalidateOnMount: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
      // refreshInterval: 0,
    },
  );

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        fontSize={{ xs: '2.25rem', md: '3.75rem' }}
        mb={4}
      >
        Pending Reservations
      </Typography>
      {!data || isValidating ? (
        <CircularProgress />
      ) : (
        <ReservationList reservations={data} />
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
