import { useSelector } from 'react-redux';
import { makeStyles, Backdrop as MuiBackdrop, CircularProgress } from '@material-ui/core';
import { RootState } from 'redux/reducers/root.reducer';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1
  }
}));

const Backdrop = () => {
  const {
    ui: { backdrop }
  } = useSelector((state: RootState) => state);
  const classes = useStyles();

  return (
    <MuiBackdrop classes={{ root: classes.backdrop }} open={backdrop}>
      <CircularProgress />
    </MuiBackdrop>
  );
};

export default Backdrop;
