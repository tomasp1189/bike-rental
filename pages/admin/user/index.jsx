/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';

import apiClient from '../../../api/local';
import withAuth from '../../../components/hoc/withAuth';
import FormModal from '../../../components/molecules/FormModal';
import UserForm from '../../../components/organisms/User/UserForm';
import ConfirmationDialog from '../../../components/organisms/ConfirmationDialog';

const createColumns = (onView, onUpdate, onDelete) => [
  { field: 'user_id', headerName: 'ID', minWidth: 200, flex: 1 },
  { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
  { field: 'given_name', headerName: 'First name', minWidth: 150, flex: 1 },
  { field: 'family_name', headerName: 'Last name', minWidth: 150, flex: 1 },
  {
    field: 'actions',
    headerName: 'Action',
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={onUpdate(params)}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={onDelete(params)}
        >
          Delete
        </Button>
      </>
    ),
  },
];

const AdminUsersPage = ({ users = [] }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);

  const router = useRouter();

  const { data, mutate, isValidating, error } = useSWR(
    '/api/user/',
    apiClient.fetcher,
    {
      fallbackData: users,
    },
  );

  console.log(data);
  if (error) return <p>error</p>;

  const handleOnAdd = () => {
    setFormIsVisible(true);
  };
  const handleOnView = params => () => {
    router.push(`/admin/user/${params.id}/`);
  };
  const handleOnUpdate = params => () => {
    setSelectedUser(params?.row);
    setFormIsVisible(true);
  };
  const handleOnDelete = params => () => {
    setSelectedUser(params?.row);
    setDeleteIsVisible(true);
  };
  const handleOnClose = () => {
    setSelectedUser(null);
    setFormIsVisible(false);
  };
  const handleOnCloseConfirmation = () => {
    setSelectedUser(null);
    setDeleteIsVisible(false);
  };
  const handleOnConfirmDelete = () => {
    apiClient.deleteUser(selectedUser?.id, () => {
      setSelectedUser(null);
      setDeleteIsVisible(false);
      mutate();
    });
  };
  const handleOnSubmitUser = values => {
    const callback = () => {
      setSelectedUser(null);
      setFormIsVisible(false);
      mutate();
    };
    if (selectedUser?.id) apiClient.updateUser(values, callback);
    else
      apiClient.postUser(values, () => {
        setSelectedUser(null);
        setFormIsVisible(false);
        mutate();
      });
  };
  return (
    <>
      <Typography component="h1" variant="h4" mb={4}>
        Users
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
              Add User
            </Button>
          </Box>
          <DataGrid
            rows={data.map(user => ({ ...user, id: user.user_id }))}
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
        title={selectedUser ? 'Update User' : 'Create User'}
        open={formIsVisible}
        onClose={handleOnClose}
      >
        <UserForm
          onSubmit={handleOnSubmitUser}
          onCancel={handleOnClose}
          id={selectedUser?.id}
          name={selectedUser?.given_name}
          lastName={selectedUser?.family_name}
          email={selectedUser?.email}
        />
      </FormModal>
      <ConfirmationDialog
        open={deleteIsVisible}
        title="Delete User"
        body={`Are you sure you want to delete user ${selectedUser?.id}?`}
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

AdminUsersPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default withAuth(AdminUsersPage);
