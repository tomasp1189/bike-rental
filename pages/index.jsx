/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';

import dbConnect from '../server/lib/dbConnect';
import Bike from '../server/Bike/Bike';
import Filters from '../components/organisms/Filters';
import BikeList from '../components/organisms/BikeList';

const fetcher = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data);

const Index = ({ bikes = [] }) => {
  const [query, setQuery] = useState('');

  const { data, mutate, isValidating } = useSWR(
    `/api/bike/?${query}`,
    fetcher,
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
      <Filters onSubmit={handleFilterSubmit} />
      {!data || isValidating ? <CircularProgress /> : <BikeList bikes={data} />}
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
