import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiTypes } from '../../redux/types';
import { makeStyles, Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    top: theme.spacing(9),
    right: theme.spacing(1)
  }
}));

const Snackbar = () => {
  const classes = useStyles();
  const {
    ui: {
      snackbar: { isShow, message, status }
    }
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch({ type: uiTypes.HIDE_SNACKBAR });
  };

  return (
    <MuiSnackbar
      classes={{ anchorOriginTopRight: classes.snackbar }}
      open={isShow}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      onClose={handleClose}>
      <Alert severity={status} onClose={handleClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
