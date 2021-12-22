import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/lab';
import { add, compareAsc } from 'date-fns';
import LocationAutocomplete from '../helpers/LocationAutocomplete';

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
});

const FiltersForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
      rating: 0,
    },
    validationSchema,
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={3}>
          <DatePicker
            sx={{ width: '100%' }}
            shouldDisableDate={date => {
              const start = new Date();
              start.setUTCHours(0, 0, 0, 0);
              return compareAsc(date, start) < 0;
            }}
            label="From"
            value={formik.values.startDate}
            onChange={value => formik.setFieldValue('startDate', value)}
            renderInput={params => <TextField {...params} />}
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
            renderInput={params => <TextField {...params} />}
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
            onChange={formik.handleChange}
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

FiltersForm.propTypes = { onSubmit: PropTypes.func };

export default FiltersForm;
