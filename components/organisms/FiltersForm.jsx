import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/lab';
import { add, compareAsc } from 'date-fns';
import LocationAutocomplete from '../helpers/LocationAutocomplete';
import Select from '../molecules/Select';

const validationSchema = yup.object({
  startDate: yup.date(),
  endDate: yup
    .date()
    .when('startDate', startDate =>
      yup
        .date()
        .min(startDate, 'End Date must be after Start Date')
        .typeError('End Date is required'),
    ),
  rating: yup.number(),
  location: yup.object().nullable(),
  model: yup.string(),
  color: yup.string(),
});

const INITIAL_STATE = {
  startDate: new Date(),
  endDate: add(new Date(), { days: 1 }),
  rating: 0,
  location: null,
  model: '',
  color: '',
};

const FiltersForm = ({ onSubmit, colors, models }) => {
  const formik = useFormik({
    initialValues: INITIAL_STATE,
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
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={3}>
          <DatePicker
            shouldDisableDate={date => {
              const start = new Date();
              start.setUTCHours(0, 0, 0, 0);
              return compareAsc(date, start) < 0;
            }}
            label="From"
            value={formik.values.startDate}
            onChange={value => formik.setFieldValue('startDate', value)}
            renderInput={params => (
              <TextField sx={{ width: '100%' }} {...params} />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <DatePicker
            label="To"
            value={formik.values.endDate}
            shouldDisableDate={date =>
              compareAsc(date, formik.values.startDate) < 1
            }
            onChange={value => formik.setFieldValue('endDate', value)}
            renderInput={params => (
              <TextField sx={{ width: '100%' }} {...params} />
            )}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <LocationAutocomplete
            id="location"
            name="location"
            label="Location"
            onPlaceSelected={value => formik.setFieldValue('location', value)}
            value={formik.values.location}
          />
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
        <Grid item xs={4} sm={4} md={3}>
          <Select
            sx={{ width: '100%' }}
            label="Color"
            name="color"
            id="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            options={colors}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Select
            sx={{ width: '100%' }}
            label="Model"
            name="model"
            id="model"
            value={formik.values.model}
            onChange={formik.handleChange}
            options={models}
          />
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
          <Button color="primary" variant="outlined" fullWidth type="submit">
            Apply
          </Button>
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
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={() => formik.setValues(INITIAL_STATE)}
          >
            Clear filters
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

FiltersForm.propTypes = {
  onSubmit: PropTypes.func,
  colors: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
  models: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
};

export default FiltersForm;
