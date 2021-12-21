/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import dbConnect from '../server/lib/dbConnect';
import Reservation from '../server/Reservation/Reservation';
import BikeCard from '../components/organisms/BikeCard';
import Filters from '../components/organisms/Filters';

const Reservations = ({ reservations = [] }) => (
  <>
    <Filters />
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {/* Create a card for each pet */}
      {reservations.map(reservation => (
        <Grid item key={reservation._id} xs={4} sm={4} md={4}>
          <BikeCard model={reservation.model} color={reservation.color} />
        </Grid>
      ))}
    </Grid>
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  /* find all the data in our database */
  await dbConnect();
  const result = await Reservation.find({});
  const reservations = result.map(doc => {
    const reservation = JSON.parse(JSON.stringify(doc));
    //  doc.toObject();
    reservation._id = reservation._id.toString();
    return reservation;
  });

  return { props: { reservations } };
}

Reservations.propTypes = {
  reservations: PropTypes.arrayOf(PropTypes.object),
};

export default Reservations;
