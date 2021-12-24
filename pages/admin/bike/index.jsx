/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import bikeApi from '../../../api/bikeApi';
import withAuth from '../../../components/hoc/withAuth';
import FormModal from '../../../components/molecules/FormModal';
import BikeForm from '../../../components/organisms/Bike/BikeForm';
import ConfirmationDialog from '../../../components/organisms/ConfirmationDialog';
import helpers from '../../../api/helpers';

const createColumns = (onView, onUpdate, onDelete) => [
  { field: 'model', headerName: 'Model', minWidth: 200, flex: 1 },
  { field: 'color', headerName: 'Color', minWidth: 200, flex: 1 },
  {
    field: 'averageRating',
    headerName: 'Average Rating',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'reviews',
    headerName: 'Number of reviews',
    minWidth: 80,
    flex: 1,
    valueGetter: params => params.row?.reviews?.length || 0,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 200,
    flex: 1,
    renderCell: params => (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={onView(params)}
        >
          View
        </Button>
        <IconButton
          aria-label="update"
          variant="contained"
          color="primary"
          size="small"
          sx={{ ml: 2 }}
          onClick={onUpdate(params)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          variant="contained"
          color="primary"
          size="small"
          sx={{ ml: 2 }}
          onClick={onDelete(params)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

// TODO Reuse code! This page is almost identical to the admins/user one.
const AdminBikePage = ({ users = [] }) => {
  const [selectedBike, setSelectedBike] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);

  const router = useRouter();

  const { data, mutate, isValidating, error } = useSWR(
    '/api/bike/',
    helpers.fetcher,
    {
      fallbackData: users,
    },
  );

  if (error) return <div>{error.message}</div>;

  const handleOnAdd = () => {
    setFormIsVisible(true);
  };
  const handleOnView = params => () => {
    router.push(`/admin/user/${params.id}/`);
  };
  const handleOnUpdate = params => () => {
    setSelectedBike(params?.row);
    setFormIsVisible(true);
  };
  const handleOnDelete = params => () => {
    setSelectedBike(params?.row);
    setDeleteIsVisible(true);
  };
  const handleOnClose = () => {
    setSelectedBike(null);
    setFormIsVisible(false);
  };
  const handleOnCloseConfirmation = () => {
    setSelectedBike(null);
    setDeleteIsVisible(false);
  };
  const handleOnConfirmDelete = () => {
    bikeApi.deleteBike(selectedBike?.id, () => {
      setSelectedBike(null);
      setDeleteIsVisible(false);
      mutate();
    });
  };
  const handleOnSubmitUser = values => {
    const callback = () => {
      setSelectedBike(null);
      setFormIsVisible(false);
      mutate();
    };
    if (selectedBike?.id) bikeApi.updateBike(values, callback);
    else
      bikeApi.createBike(values, () => {
        setSelectedBike(null);
        setFormIsVisible(false);
        mutate();
      });
  };
  return (
    <>
      <Typography component="h1" variant="h4" mb={4}>
        Bikes
      </Typography>
      {!data || isValidating ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: { xs: '80vh', md: '50vh' }, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              mb: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleOnAdd}>
              Add Bike
            </Button>
          </Box>
          <DataGrid
            rows={data.map(bike => ({ ...bike, id: bike._id }))}
            columns={createColumns(
              handleOnView,
              handleOnUpdate,
              handleOnDelete,
            )}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // onRowClick={handleOnRowClick}
          />
        </Box>
      )}
      <FormModal
        title={selectedBike ? 'Update Bike' : 'Create Bike'}
        open={formIsVisible}
        onClose={handleOnClose}
      >
        <BikeForm
          onSubmit={handleOnSubmitUser}
          onCancel={handleOnClose}
          id={selectedBike?.id}
          model={selectedBike?.model}
          color={selectedBike?.color}
          location={selectedBike?.location}
        />
      </FormModal>
      <ConfirmationDialog
        open={deleteIsVisible}
        title="Delete User"
        body={`Are you sure you want to delete user ${selectedBike?.id}?`}
        onClickConfirm={handleOnConfirmDelete}
        onClickCancel={handleOnCloseConfirmation}
      />
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async function getServerSideProps() {
    /* find all the data in our database */

    // const users = await auth0.all(session.accessToken);

    return { props: { users: [] } };
  },
});

AdminBikePage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default withAuth(AdminBikePage);
