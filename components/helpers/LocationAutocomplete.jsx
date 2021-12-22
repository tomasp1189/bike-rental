import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { usePlacesWidget } from 'react-google-autocomplete';

const LocationAutocomplete = ({
  name,
  id,
  helperText,
  error,
  label,
  onPlaceSelected,
}) => {
  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: place => onPlaceSelected && onPlaceSelected(place),
    options: {},
  });
  return (
    <TextField
      fullWidth
      color="secondary"
      variant="outlined"
      inputRef={materialRef}
      helperText={helperText}
      error={error}
      label={label}
      name={name}
      id={id}
    />
  );
};

LocationAutocomplete.propTypes = {
  onPlaceSelected: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
};

export default LocationAutocomplete;
