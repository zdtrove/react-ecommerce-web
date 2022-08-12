import { Box, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  selectLightBox,
  selectLightBoxImage,
  selectLightBoxImageNext,
  selectLightBoxImagePrev,
  uiActions
} from 'redux/features/ui/slice';

const useStyles = makeStyles(() => ({
  lightBox: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999
  },
  hidden: {
    visibility: 'hidden'
  },
  closeLightBox: {
    position: 'absolute',
    top: 25,
    right: 25,
    color: 'white',
    backgroundColor: '#ddd6',
    '&:hover': {
      backgroundColor: '#9e9e9e'
    }
  }
}));

const LightBox = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const lightBox = useAppSelector(selectLightBox);
  const lightBoxImage = useAppSelector(selectLightBoxImage);
  const lightBoxImagePrev = useAppSelector(selectLightBoxImagePrev);
  const lightBoxImageNext = useAppSelector(selectLightBoxImageNext);
  const { hideLightBox, setLightBoxImage } = uiActions;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      className={clsx(classes.lightBox, {
        [classes.hidden]: !lightBox
      })}
    >
      <IconButton className={classes.closeLightBox} onClick={() => dispatch(hideLightBox())}>
        <CloseIcon />
      </IconButton>
      <button onClick={() => dispatch(setLightBoxImage(lightBoxImagePrev))}>Prev</button>
      <img src={lightBoxImage} alt="image" />
      <button onClick={() => dispatch(setLightBoxImage(lightBoxImageNext))}>Next</button>
    </Box>
  );
};

export default LightBox;
