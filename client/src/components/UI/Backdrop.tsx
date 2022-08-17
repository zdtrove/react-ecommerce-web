import { makeStyles, Backdrop as MuiBackdrop } from '@material-ui/core';
import { useAppSelector } from 'redux/hook';
import { selectBackdrop } from 'redux/features/ui/slice';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1
  }
}));

const Backdrop = () => {
  const backdrop = useAppSelector(selectBackdrop);
  const classes = useStyles();

  return <MuiBackdrop classes={{ root: classes.backdrop }} open={backdrop}></MuiBackdrop>;
};

export default Backdrop;
