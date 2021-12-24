import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import LocationAutocomplete from '../../helpers/LocationAutocomplete';
import helpers from '../../../api/helpers';

const validationSchema = yup.object({
  id: yup.string(),
  model: yup.string('Enter model').required('Model is required'),
  color: yup.string('Enter color').required('Color is required'),
  location: yup.object().nullable().required('Location is required'),
});

const BikeForm = ({ id, model, color, location, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      model,
      color,
      id,
      location: null,
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const setLocation = async () => {
      const bikeLocation = await helpers.geocodeLatLng(
        location?.coordinates[1],
        location?.coordinates[0],
      );
      if (bikeLocation) formik.setFieldValue('location', bikeLocation);
    };

    if (location) {
      setLocation();
    }
  }, [location]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Model"
            id="model"
            name="model"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.model}
            error={formik.touched.model && Boolean(formik.errors.model)}
            helperText={formik.touched.model && formik.errors.model}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Color"
            id="color"
            name="color"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <LocationAutocomplete
            id="location"
            name="location"
            label="Location"
            onPlaceSelected={value => formik.setFieldValue('location', value)}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Grid>
        <Grid item xs={0} sm={4} md={6} />
        <Grid
          item
          xs={4}
          sm={4}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Button
            disabled={
              !formik.touched.location &&
              !formik.touched.color &&
              !formik.touched.model
            }
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {id ? 'Update' : 'Submit'}
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Button color="primary" fullWidth type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

BikeForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  id: PropTypes.string,
  model: PropTypes.string,
  color: PropTypes.string,
  location: PropTypes.shape({
    type: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default BikeForm;
