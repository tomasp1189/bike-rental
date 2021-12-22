import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectBase,
} from '@mui/material';

const Select = ({ name, id, label, value, onChange, options, sx }) => (
  <FormControl sx={sx}>
    <InputLabel id={`${label}-select-helper-label`}>{label}</InputLabel>
    <SelectBase
      labelId={`${label}-select-helper-label`}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      label={label}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map(option => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectBase>
  </FormControl>
);

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

export default Select;
