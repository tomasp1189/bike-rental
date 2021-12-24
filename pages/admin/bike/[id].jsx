/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import { CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Reservation from '../../../server/Reservation/Reservation';
import dbConnect from '../../../server/lib/dbConnect';
import ReservationList from '../../../components/organisms/Reservation/ReservationList';
import helpers from '../../../api/helpers';

const ReservationPage = ({ reservations = [] }) => {
  const router = useRouter();
  console.log(router.query.id);
  const { data: pendingReservations, isValidating } = useSWR(
    `/api/user/${router.query.id}/`,
    helpers.fetcher,
    {
      fallbackData: reservations,
    },
  );

  return (
    <>
      <Typography component="h1" variant="h4" mb={4}>
        User Reservations
      </Typography>
      {!pendingReservations || isValidating ? (
        <CircularProgress />
      ) : (
        <ReservationList
          reservations={pendingReservations}
          hideActions
          showStatus
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
    console.log(result);
    return { props: { reservations } };
  },
});

ReservationPage.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
};

export default ReservationPage;
