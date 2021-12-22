import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Paper, Typography } from '@mui/material';
import BikeCard from './BikeCard';
import ReservationForm from '../molecules/ReservationForm';

const BikeList = ({ bikes }) => {
  const [isVisible, setIsVisible] = useState(null);
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
      {isVisible && (
        <Modal
          sx={{ px: 2, py: 4 }}
          open
          onClose={() => {
            setIsVisible(false);
          }}
        >
          <Paper
            sx={{
              width: '90%',
              maxWidth: { xs: '100%', md: '50%' },
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              px: { xs: 3, md: 4 },
              pt: { xs: 4, md: 4 },
              pb: { xs: 5, md: 6 },
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Reservation
            </Typography>
            <ReservationForm
              bike={selectedBike}
              onSubmit={handleOnSubmitReservation}
            />
          </Paper>
        </Modal>
      )}
    </>
  );
};

BikeList.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.object),
};

export default BikeList;
