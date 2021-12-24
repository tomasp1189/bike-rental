/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Reservation from '../../../server/Reservation/Reservation';
import dbConnect from '../../../server/lib/dbConnect';
import ReservationList from '../../../components/organisms/User/UserList';
import services from '../../../server/User/services';

const ReservationPage = ({ reservations = [] }) => {
  const router = useRouter();

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4">
          Bike User List
        </Typography>
        <Typography variant="caption" color="GrayText">
          {router.query.id}
        </Typography>
      </Box>
      <ReservationList
        reservations={reservations}
        hideActions
        showStatus
        emptyMessage="This bike has never been rented!"
      />
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async function getServerSideProps({ query }) {
    /* find all the data in our database */
    await dbConnect();
    // fetch all users
    const usersResponse = await services.getAllUsers();
    const users = usersResponse.data;
    const userIds = usersResponse.data.map(user => user.user_id);
    // fetch all reservations for specific bike
    const result = await Reservation.find({
      isCancelled: false,
      bike: query?.id,
    }).populate('bike');
    // build reservation array by mapping to users by ownerId
    const reservations = result
      .filter(res => userIds.includes(res.ownerId))
      .map(doc => {
        const reservation = JSON.parse(JSON.stringify(doc));
        //  doc.toObject();
        reservation._id = reservation._id.toString();
        reservation.owner = users.find(
          user => user.user_id === reservation.ownerId,
        );
        return reservation;
      });

    return { props: { reservations } };
  },
});

ReservationPage.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
};

export default ReservationPage;
