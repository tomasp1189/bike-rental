/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Reservation from '../../../server/Reservation/Reservation';
import dbConnect from '../../../server/lib/dbConnect';
import ReservationList from '../../../components/organisms/Reservation/ReservationList';
import helpers from '../../../api/helpers';

// TODO: Add user details in page
const ReservationPage = ({ reservations = [] }) => {
  const router = useRouter();

  const { data: pendingReservations, isValidating } = useSWR(
    `/api/user/${router.query.id}/`,
    helpers.fetcher,
    {
      fallbackData: reservations,
    },
  );

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4">
          User Reservations
        </Typography>
        <Typography variant="caption" color="GrayText">
          {router.query.id}
        </Typography>
      </Box>
      {!pendingReservations || isValidating ? (
        <CircularProgress />
      ) : (
        <ReservationList
          reservations={pendingReservations}
          hideActions
          showStatus
          emptyMessage="This user hasn't made any reservations yet."
        />
      )}
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async function getServerSideProps({ query }) {
    /* find all the data in our database */
    await dbConnect();
    const result = await Reservation.find({
      isCancelled: false,
      ownerId: query?.id,
    }).populate('bike');
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
