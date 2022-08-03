import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  makeStyles,
  alpha,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Badge,
  InputBase,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Select,
  FormControl,
  MenuItem,
  Box
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { cartActions, selectCartTotalQuantity } from 'redux/features/cart/slice';
import { productActions, selectProductsSearchBar } from 'redux/features/product/slice';
import { formatNumber } from 'utils/functions';
import { Button } from 'components/UI';
import useComponentVisible from 'hooks/useComponentVisible';
import clsx from 'clsx';
import { useGlobalStyles } from 'theme';
import { authActions, selectIsLoggedIn } from 'redux/features/auth/slice';
import { ROUTES, userRoles } from 'constants/index';
import { useHistory } from 'react-router-dom';
import Menu from 'components/Menu';

const useStyles = makeStyles((theme) => ({
  logout: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: `${theme.palette.secondary.dark} !important`
    }
  },
  formControl: {
    minWidth: 135,
    margin: '4px 5px',
    '& .MuiOutlinedInput-input': {
      padding: '0.65rem'
    }
  },
  select: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.aquamarine.dark
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.green.main
    }
  },
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    '& .MuiButtonBase-root': {
      backgroundColor: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.aquamarine.dark
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: 250,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchPrice: {
    color: theme.palette.green.main,
    fontWeight: 500
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2.5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch'
    }
  },
  logo: {
    width: 60,
    padding: 5
  },
  logoTitle: {
    color: theme.palette.green.main,
    fontStyle: 'italic',
    minWidth: 120
  },
  listProductSearch: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    width: 373,
    top: 40,
    borderRadius: 5,
    overflowY: 'scroll',
    maxHeight: 500,
    '& .MuiList-root': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.aquamarine.dark,
        borderRadius: 5
      }
    },
    '& .MuiDivider-root': {
      backgroundColor: 'rgb(255 255 255 / 53%)'
    }
  }
}));

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const history = useHistory();
  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const productsSearchBar = useAppSelector(selectProductsSearchBar);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { openCart } = cartActions;
  const { getProductsSearchBar, getProductsSearchBarSuccess } = productActions;
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const { USER } = userRoles;
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Container style={{ width: 1200, padding: 0 }} component="main">
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(ROUTES.home.index)}
            display="flex"
            alignItems="center"
          >
            <img className={classes.logo} src="/logo.png" alt="logo" />
            <Typography variant="h5" className={classes.logoTitle}>
              MY SHOP
            </Typography>
          </Box>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                dispatch(getProductsSearchBar(e.target.value.toLowerCase()));
                setIsComponentVisible(true);
              }}
              onClick={() => {
                if (productsSearchBar.length) {
                  dispatch(getProductsSearchBarSuccess([]));
                }
              }}
            />
            <div ref={ref} className={clsx(classes.listProductSearch, globalClasses.boxShadow)}>
              {isComponentVisible &&
                productsSearchBar.map((product, index) => (
                  <Fragment key={product._id}>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            alt={'product'}
                            src={product.images ? product.images[0]?.url : ''}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.name}
                          secondary={
                            <>
                              <Typography className={classes.searchPrice} variant="caption">
                                {formatNumber(product.price)}
                              </Typography>
                              <br />
                            </>
                          }
                        />
                      </ListItem>
                    </List>
                    {index + 1 !== productsSearchBar.length && <Divider />}
                  </Fragment>
                ))}
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              onClick={() => dispatch(openCart())}
              color="inherit"
            >
              <Badge overlap="rectangular" badgeContent={cartTotalQuantity} color="secondary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={language}
                onChange={handleChangeLanguage}
                label="Language"
                className={clsx(classes.select, globalClasses.boxShadow)}
                IconComponent={GTranslateIcon}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Vietnamese</MenuItem>
              </Select>
            </FormControl>
            <Button text="Wishlist" startIcon={<FavoriteBorderIcon />} />
            <Button text="Account" startIcon={<AccountCircle />} />
            {isLoggedIn ? (
              <Button
                onClick={() => dispatch(authActions.logout({ history, role: USER }))}
                text="Logout"
                startIcon={<ExitToAppIcon />}
                className={classes.logout}
              />
            ) : (
              <Button text="Login" startIcon={<VpnKeyIcon />} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Menu />
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
