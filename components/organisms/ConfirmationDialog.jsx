import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ConfirmationDialog = ({
  title,
  body,
  onClickCancel,
  onClickConfirm,
  onClose,
  open,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{body}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickCancel}>Cancel</Button>
      <Button onClick={onClickConfirm}>Ok</Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickConfirm: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default ConfirmationDialog;
