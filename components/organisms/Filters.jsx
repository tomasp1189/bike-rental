import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useSWR from 'swr';

import FiltersForm from './FiltersForm';
import ConditionalWrapper from '../helpers/ConditionalWrapper';
import helpers from '../../api/helpers';

const Filters = ({ onSubmit }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const { data: models } = useSWR('/api/bike/allModels', helpers.fetcher);
  const { data: colors } = useSWR('/api/bike/allColors', helpers.fetcher);

  const handleSubmit = useCallback(
    values => {
      onSubmit(values);
      if (!matches) setIsVisible(false);
    },
    [matches, onSubmit],
  );

  const handleFilter = () => setIsVisible(prev => !prev);

  const wrapper = useCallback(
    children => (
      <Modal
        sx={{ px: 2, py: 4 }}
        open
        onClose={() => {
          setIsVisible(false);
        }}
      >
        {children}
      </Modal>
    ),
    [],
  );
  return (
    <Box sx={{ my: 2 }}>
      <Button sx={{ mb: 1 }} variant="contained" onClick={handleFilter}>
        Filter
      </Button>
      {/* use modal with portal on mobile */}

      {isVisible && (
        <ConditionalWrapper wrapper={wrapper} condition={!matches}>
          <Paper
            sx={{
              px: { xs: 3, lg: 2 },
              pt: { xs: 4, lg: 2 },
              pb: { xs: 5, lg: 2 },
            }}
          >
            {!matches && (
              <Typography variant="h5" sx={{ mb: 2 }}>
                Filters:
              </Typography>
            )}
            <FiltersForm
              onSubmit={handleSubmit}
              colors={colors.map(color => ({ label: color, value: color }))}
              models={models.map(model => ({ label: model, value: model }))}
            />
          </Paper>
        </ConditionalWrapper>
      )}
    </Box>
  );
};

Filters.propTypes = { onSubmit: PropTypes.func };

export default Filters;
