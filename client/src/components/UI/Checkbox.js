import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox
} from '@material-ui/core';

const Checkbox = ({ label, error, ...rest }) => {
  return (
    <FormControl {...(error && { error: true })}>
      <FormControlLabel control={<MuiCheckbox {...rest} />} label={label} />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string
};

export default Checkbox;
