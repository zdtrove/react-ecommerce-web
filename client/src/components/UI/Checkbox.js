import React from 'react';
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

export default Checkbox;
