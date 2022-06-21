import React from 'react';
import { makeStyles, Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '90%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 500,
      maxWidth: 500
    },
    '& .MuiDialogContent-root::-webkit-scrollbar': {
      display: 'none'
    },
    '& .MuiDialogContent-root': {
      padding: `${theme.spacing(2)}px ${theme.spacing(1.5)}px`,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
      }
    }
  },
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const MuiDialog = ({ show, setShow, title, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.root }} open={show}>
      <DialogTitle>
        {title}
        <IconButton aria-label="close" className={classes.closeBtn} onClick={() => setShow(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default MuiDialog;
