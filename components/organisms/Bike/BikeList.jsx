import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import BikeCard from './BikeCard';
import ReservationForm from '../Reservation/ReservationForm';
import FormModal from '../../molecules/FormModal';
import apiClient from '../../../helpers/apiClient';

const BikeList = ({ bikes }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const handleOnSubmitReservation = values => {
    apiClient.postReservation(values, () => {
      setIsVisible(false);
      setSelectedBike(null);
    });
  };
  const handleOnClickReserve = bike => () => {
    setSelectedBike(bike);
    setIsVisible(true);
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* Create a card for each pet */}
        {bikes.map(bike => (
          <Grid item key={bike._id} xs={4} sm={4} md={4}>
            <BikeCard
              model={bike.model}
              color={bike.color}
              rating={bike.averageRating}
              onClickReserve={handleOnClickReserve(bike)}
            />
          </Grid>
        ))}
      </Grid>
      <FormModal
        open={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        title="Reservation"
      >
        <ReservationForm
          bike={selectedBike}
          onSubmit={handleOnSubmitReservation}
        />
      </FormModal>
    </>
  );
};

BikeList.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.object),
};

export default BikeList;
