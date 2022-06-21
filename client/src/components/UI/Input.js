import React from 'react';
import { TextField, InputAdornment, useTheme, useMediaQuery } from '@material-ui/core';

const Input = ({ variant, fullWidth, margin, type, error, startIcon, endIcon, ...rest }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const adornment = () => {
    const result = {};
    result.startAdornment = startIcon && (
      <InputAdornment position="start">{startIcon}</InputAdornment>
    );
    result.endAdornment = endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>;

    return { InputProps: result };
  };

  return (
    <TextField
      variant={variant || 'outlined'}
      fullWidth={fullWidth || true}
      margin={margin ? margin : matches ? 'normal' : 'dense'}
      type={type || 'text'}
      size={matches ? 'medium' : 'small'}
      {...((startIcon || endIcon) && adornment())}
      {...(error && { error: true, helperText: error })}
      {...rest}
    />
  );
};

export default Input;
