import { Box, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  selectLightBox,
  selectLightBoxImage,
  uiActions,
  selectLightBoxImageList
} from 'redux/features/ui/slice';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
  },
  nextPrev: {
    color: 'white',
    padding: 8,
    margin: '0 20px',
    '& .MuiSvgIcon-root': {
      fontSize: 50
    }
  }
}));

const LightBox = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const lightBox = useAppSelector(selectLightBox);
  const lightBoxImage = useAppSelector(selectLightBoxImage);
  const lightBoxImageList = useAppSelector(selectLightBoxImageList);
  const { hideLightBox, setLightBoxImage } = uiActions;

  const handlePrevLightBox = () => {
    if (lightBoxImageList) {
      const index = lightBoxImageList.findIndex((item) => item === lightBoxImage);
      if (index > 0) {
        dispatch(setLightBoxImage(lightBoxImageList[index - 1]));
      } else {
        dispatch(setLightBoxImage(lightBoxImageList[lightBoxImageList.length - 1]));
      }
    }
  };

  const handleNextLightBox = () => {
    if (lightBoxImageList) {
      const index = lightBoxImageList.findIndex((item) => item === lightBoxImage);
      if (index < lightBoxImageList.length - 1) {
        dispatch(setLightBoxImage(lightBoxImageList[index + 1]));
      } else {
        dispatch(setLightBoxImage(lightBoxImageList[0]));
      }
    }
  };

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
      <IconButton className={classes.nextPrev} onClick={handlePrevLightBox}>
        <NavigateBeforeIcon />
      </IconButton>
      <img src={lightBoxImage} alt="image" />
      <IconButton className={classes.nextPrev} onClick={handleNextLightBox}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default LightBox;
