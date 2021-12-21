/* eslint-disable no-underscore-dangle */
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@mui/material';

import dbConnect from '../server/lib/dbConnect';
import Bike from '../server/Bike/Bike';
import BikeCard from '../components/organisms/BikeCard';
import Filters from '../components/organisms/Filters';
import useSWR from 'swr';

const filterReducer = (prevState, action) => {
  // TODO Validate field values here or using useForm hook
  switch (action.type) {
    case 'error':
      return {
        ...prevState,
        status: 'failure',
        error: action.payload,
      };
    case 'start':
      return { ...prevState, status: 'pending' };
    case 'setStartDate':
      return { ...prevState, status: 'successful', startDate: action.payload };
    case 'setEndDate':
      return { ...prevState, status: 'successful', endDate: action.payload };
    case 'setRating':
      return { ...prevState, status: 'successful', rating: action.payload };
    case 'success':
      return { ...prevState, status: 'successful' };

    default:
      return prevState;
  }
};

const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data);

const Index = ({ bikes = [] }) => {
  const [query, setQuery] = useState('');

  const { data, error, mutate } = useSWR(`/api/bike/?${query}`, fetcher, {
    fallbackData: bikes,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const handleFilterSubmit = values => {
    const queryString = Object.keys(values)
      .map(key => {
        if (key.includes('date')) return `${key}=${values[key].toISOString()}`;
        return `${key}=${values[key]}`;
      })
      .join('&');

    console.log(queryString);
    setQuery(queryString);
    mutate();
  };

  return (
    <>
      <Filters onSubmit={handleFilterSubmit} />
      {!data ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* Create a card for each pet */}
          {data.map(bike => (
            <Grid item key={bike._id} xs={4} sm={4} md={4}>
              <BikeCard model={bike.model} color={bike.color} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

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
