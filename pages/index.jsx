/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import dbConnect from '../server/lib/dbConnect';
import Bike from '../server/Bike/Bike';
import BikeCard from '../components/organisms/BikeCard';

const Index = ({ bikes = [] }) => (
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {/* Create a card for each pet */}
    {bikes.map(bike => (
      <Grid item key={bike._id} xs={4} sm={4} md={4}>
        <BikeCard model={bike.model} color={bike.color} />
      </Grid>
    ))}
  </Grid>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  /* find all the data in our database */
  await dbConnect();
  const result = await Bike.find({});
  const bikes = result.map(doc => {
    const bike = JSON.parse(JSON.stringify(doc));
    //  doc.toObject();
    bike._id = bike._id.toString();
    return bike;
  });

  return { props: { bikes } };
}

Index.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.object),
};

export default Index;
