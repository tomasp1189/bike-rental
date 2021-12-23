import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Select from '../../molecules/Select';

const validationSchema = yup.object({
  id: yup.string(),
  email: yup
    .string('Enter email')
    .email('Enter a valid email')
    .required('Email is required'),
  name: yup.string('Enter name').required('Name is required'),
  lastName: yup.string('Enter last name').required('Last name is required'),
  role: yup.string(),
});

const UserForm = ({ id, email, name, lastName, role, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      email,
      name,
      lastName,
      id,
      role,
    },
    validationSchema,
    onSubmit,
  });
  console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Email"
            id="email"
            name="email"
            sx={{ width: '100%' }}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid> */}
        <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Email"
            id="email"
            name="email"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Name"
            id="name"
            name="name"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <TextField
            label="Last Name"
            id="lastName"
            name="lastName"
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <Select
            disabled={!!id}
            sx={{ width: '100%' }}
            label="Role"
            name="role"
            id="role"
            value={formik.values.color}
            onChange={formik.handleChange}
            options={[
              { value: 'rol_hEW39wdBWRpaxw0u', label: 'Manager' },
              { value: 'rol_3df3Oew6DebXJgTK', label: 'User' },
            ]}
          />
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
          <Button
            disabled={
              !formik.touched.lastName &&
              !formik.touched.name &&
              !formik.touched.email
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

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
};

export default UserForm;
