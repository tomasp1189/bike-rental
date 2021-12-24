/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@mui/material';
import useSWR from 'swr';
import { add } from 'date-fns';

import dbConnect from '../server/lib/dbConnect';
import Filters from '../components/organisms/Filters';
import BikeList from '../components/organisms/Bike/BikeList';
import services from '../server/Bike/services';
import helpers from '../api/helpers';

const Index = ({ bikes = [] }) => {
  const [query, setQuery] = useState('');

  const { data, mutate, isValidating } = useSWR(
    `/api/bike/?${query}`,
    helpers.fetcher,
    {
      fallbackData: bikes,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  const handleFilterSubmit = values => {
    const queryString = Object.keys(values)
      .map(key => {
        if (key.includes('date')) return `${key}=${values[key].toISOString()}`;
        if (key.includes('location')) {
          if (values[key]) {
            const { geometry } = values[key];
            const coordinates = [
              geometry.location.lng(),
              geometry.location.lat(),
            ];
            return `${key}=${coordinates.join(',')}`;
          }
        }
        return `${key}=${values[key]}`;
      })
      .join('&');

    setQuery(queryString);
    mutate();
  };

  return (
    <>
      <Typography component="h1" variant="h4" mb={4}>
        Available Bikes
      </Typography>
      <Filters onSubmit={handleFilterSubmit} />
      {!data || isValidating ? <CircularProgress /> : <BikeList bikes={data} callback={mutate} />}
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const startDate = new Date();
  const endDate = add(new Date(), { days: 1 });
  const result = await services.searchAvailableBikes(
    startDate.toISOString(),
    endDate.toISOString(),
  );
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
