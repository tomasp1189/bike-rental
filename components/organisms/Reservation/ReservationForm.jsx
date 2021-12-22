import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/lab';
import { add, compareAsc } from 'date-fns';

const validationSchema = yup.object({
  startDate: yup.date().required(),
  endDate: yup
    .date()
    .required()
    .when('startDate', startDate =>
      yup
        .date()
        .min(startDate, 'End Date must be after Start Date')
        .typeError('End Date is required'),
    ),
  bike: yup.string().required(),
});

const ReservationForm = ({ bike, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
      bike: bike._id,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
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
            renderInput={params => (
              <TextField sx={{ width: '100%' }} {...params} />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
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
        <Grid item xs={4} sm={4} md={6}>
          <TextField label="Bike" sx={{ width: '100%' }} value={bike.model} />
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

ReservationForm.propTypes = {
  onSubmit: PropTypes.func,
  bike: PropTypes.shape({
    _id: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default ReservationForm;
