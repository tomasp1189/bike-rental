import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, Typography } from '@mui/material';

const FormModal = ({ children, open = false, onClose, title }) => (
  <Modal sx={{ px: 2, py: 4 }} open={open} onClose={onClose}>
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
        {title}
      </Typography>
      {children}
    </Paper>
  </Modal>
);

FormModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormModal;
