import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  bike: yup.string().required(),
  rating: yup.number().required(),
});

const ReviewForm = ({ bike, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      bike: bike?._id,
    },
    validationSchema,
    onSubmit,
  });

  const handleOnChangeRating = event => {
    if (Number.parseFloat(event.target.value) === formik.values.rating)
      return formik.setFieldValue('rating', 0);
    return formik.setFieldValue(
      'rating',
      Number.parseFloat(event.target.value),
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
          <TextField label="Bike" sx={{ width: '100%' }} value={bike.model} />
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
          }}
        >
          <Typography variant="caption">Rate</Typography>
          <Rating
            id="rating"
            name="rating"
            value={formik.values.rating}
            onChange={handleOnChangeRating}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sm={8}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func,
  bike: PropTypes.shape({
    _id: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default ReviewForm;
