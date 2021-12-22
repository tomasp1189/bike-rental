import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import BikeCard from './BikeCard';
import ReservationForm from '../Reservation/ReservationForm';
import FormModal from '../../molecules/FormModal';

const BikeList = ({ bikes }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const contentType = 'application/json';

  const postData = async form => {
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      setIsVisible(false);
      setSelectedBike(null);
    } catch (error) {
      console.log('Failed create reservation');
    }
  };

  const handleOnSubmitReservation = values => {
    postData(values);
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
