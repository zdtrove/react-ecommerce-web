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
import { useHistory } from 'react-router-dom';

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
    zIndex: 999,
    '& .MuiButtonBase-root': {
      minWidth: 135,
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
    position: 'relative',
    '& .sub-menu': {
      position: 'absolute',
      top: 38,
      left: -110,
      minWidth: 385,
      background: theme.palette.primary.dark,
      borderRadius: 5,
      display: 'none'
    },
    '&:hover .sub-menu': {
      display: 'block'
    }
  },
  childrenCategory: {
    display: 'flex',
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    '& .MuiList-padding': {
      padding: 0
    },
    '& .MuiListItem-root': {
      paddingTop: theme.spacing(0.25),
      paddingBottom: theme.spacing(0.25)
    }
  },
  itemLv1: {
    color: theme.palette.antiquewhite.main,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    textDecoration: 'underline',
    textUnderlineOffset: `${theme.spacing(0.5)}px`
  },
  itemLv2: {
    color: theme.palette.antiquewhite.main
  }
}));

const Menu = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
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

  const renderMenu = () => {
    return categories.map((cat) => {
      if (cat.isMenu === 'Yes') {
        return (
          <div key={cat._id} className={classes.parentCategory}>
            <Button
              startIcon={handleIcon(cat.icon)}
              endIcon={
                cat.children?.length && cat.children?.some((item) => item.isMenu === 'Yes') ? (
                  <ArrowDropDownIcon />
                ) : (
                  <></>
                )
              }
              text={cat.name.toUpperCase()}
              onClick={() => history.push(`/category/${cat._id}`)}
            />
            {cat.children?.length && cat.children?.some((item) => item.isMenu === 'Yes') ? (
              <div className="sub-menu">
                <div className={clsx(classes.childrenCategory, globalClasses.boxShadow)}>
                  {cat.children.map(
                    (itemLv1) =>
                      itemLv1.isMenu === 'Yes' && (
                        <Fragment key={itemLv1._id}>
                          <div>
                            <List>
                              <ListItem>
                                <Typography className={classes.itemLv1}>{itemLv1.name}</Typography>
                              </ListItem>
                            </List>
                            {itemLv1.children?.length ? (
                              <List>
                                {itemLv1.children.map((itemLv2) => (
                                  <ListItem key={itemLv2._id}>
                                    <Typography className={classes.itemLv2}>
                                      {itemLv2.name}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                            ) : null}
                          </div>
                        </Fragment>
                      )
                  )}
                </div>
              </div>
            ) : null}
          </div>
        );
      }
    });
  };

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      {renderMenu()}
    </Box>
  );
};

export default Menu;
