import { makeStyles, Snackbar as MuiSnackbar, SnackbarCloseReason } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { selectSnackbar, uiActions } from 'redux/features/ui/uiSlice';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    top: theme.spacing(9),
    right: theme.spacing(1)
  }
}));

const Snackbar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isShow, message, status } = useAppSelector(selectSnackbar);

  const handleClose = (event: React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch({ type: uiActions.hideSnackbar });
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
      onClose={handleClose}
    >
      <Alert severity={status} onClose={handleClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
