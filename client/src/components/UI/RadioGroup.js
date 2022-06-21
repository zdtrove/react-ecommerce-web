import React from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio
} from '@material-ui/core';

const RadioGroup = ({ label, items, ...rest }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row {...rest}>
        {items &&
          items.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio color="primary" />}
              label={item}
            />
          ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
