import React, { useEffect, useState } from 'react';
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
  onBlur,
  value,
}) => {
  const [tempValue, setTempValue] = useState(value?.formatted_address || '');
  // used to reset the controlled TextField component value when form is cleared
  useEffect(() => setTempValue(value?.formatted_address || ''), [value]);

  const handleOnPlaceSelect = place => {
    if (onPlaceSelected) onPlaceSelected(place);
    setTempValue(place?.formatted_address);
  };

  const { ref: materialRef } = usePlacesWidget({
    // apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: handleOnPlaceSelect,
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
      onChange={event => setTempValue(event.target.value)}
      onBlur={onBlur}
      value={tempValue}
    />
  );
};

LocationAutocomplete.propTypes = {
  onBlur: PropTypes.func,
  onPlaceSelected: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.shape({
    address_components: PropTypes.arrayOf(PropTypes.object),
    formatted_address: PropTypes.string,
    geometry: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.func,
        lng: PropTypes.func,
      }),
    }),
    place_id: PropTypes.string,
    html_attributions: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default LocationAutocomplete;
