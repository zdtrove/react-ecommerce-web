import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { Fragment, useEffect } from 'react';
import { categoryActions, selectCategories } from 'redux/features/category/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from './UI';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import LaptopIcon from '@material-ui/icons/Laptop';
import SettingsIcon from '@material-ui/icons/Settings';
import TvIcon from '@material-ui/icons/Tv';
import KitchenIcon from '@material-ui/icons/Kitchen';
import WatchIcon from '@material-ui/icons/Watch';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useGlobalStyles } from 'theme';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: 15,
    top: 64,
    left: 'auto',
    right: 0,
    position: 'fixed',
    width: '100%',
    columnGap: 5,
    '& .MuiButtonBase-root': {
      minWidth: 130,
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.antiquewhite.main,
      fontWeight: 700,
      '&:hover': {
        color: theme.palette.chartreuse.main
      }
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.green.main
    }
  },
  parentCategory: {
    position: 'relative'
  },
  childrenCategory: {
    position: 'absolute',
    top: 40,
    left: 5,
    minWidth: 400,
    display: 'flex',
    background: theme.palette.primary.main,
    borderRadius: 5
  }
}));

const Menu = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const handleIcon = (name?: string) => {
    switch (name) {
      case 'Smartphone': {
        return <SmartphoneIcon />;
      }
      case 'Laptop': {
        return <LaptopIcon />;
      }
      case 'Tablet': {
        return <TabletAndroidIcon />;
      }
      case 'Tv': {
        return <TvIcon />;
      }
      case 'Kitchen': {
        return <KitchenIcon />;
      }
      case 'Settings': {
        return <SettingsIcon />;
      }
      case 'Watch': {
        return <WatchIcon />;
      }

      default: {
        return <SettingsIcon />;
      }
    }
  };

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      {categories.map((cat) => (
        <div key={cat._id} className={classes.parentCategory}>
          <Button
            startIcon={handleIcon(cat.icon)}
            endIcon={cat.children?.length ? <ArrowDropDownIcon /> : <></>}
            text={cat.name.toUpperCase()}
          />
          {cat.children?.length ? (
            <div className={clsx(classes.childrenCategory, globalClasses.boxShadow)}>
              {cat.children.map((item) => (
                <Fragment key={item._id}>
                  <div>
                    <List>
                      <ListItem>
                        <Typography>{item.name}</Typography>
                      </ListItem>
                    </List>
                    {item.children?.length ? (
                      <List>
                        {item.children.map((item1) => (
                          <ListItem key={item1._id}>
                            <Typography>{item1.name}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </Box>
  );
};

export default Menu;
