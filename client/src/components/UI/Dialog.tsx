import PropTypes from 'prop-types';
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

type MuiDialogProps = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (params: boolean) => void;
  title: string;
  children: React.ReactNode;
};

const MuiDialog = ({ show, setShow, title, children }: MuiDialogProps) => {
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

MuiDialog.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

export default MuiDialog;
