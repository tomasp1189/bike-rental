import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import UserCard from './UserCard';

const UserList = ({ reservations, showStatus, emptyMessage }) => (
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {reservations?.length > 0 ? (
      reservations.map(reservation => (
        <Grid item key={reservation._id} xs={4} sm={4} md={4}>
          <UserCard
            id={reservation._id}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            bike={reservation.bike}
            isCancelled={reservation.isCancelled}
            owner={reservation.owner}
            showStatus={showStatus}
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
);

UserList.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
  showStatus: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

export default UserList;
