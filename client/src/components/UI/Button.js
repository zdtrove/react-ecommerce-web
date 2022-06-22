import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

const Button = ({ text, size, color, variant, onClick, ...other }) => {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'small'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}>
      {text}
    </MuiButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
