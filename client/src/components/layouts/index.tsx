import { Fragment } from 'react';
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
  Divider
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { cartActions, selectCartTotalQuantity } from 'redux/features/cart/slice';
import { productActions, selectProductsSearchBar } from 'redux/features/product/slice';
import { formatNumber } from 'utils/functions';
import { Button } from 'components/UI';
import useComponentVisible from 'hooks/useComponentVisible';
import clsx from 'clsx';
import { useGlobalStyles } from 'theme';
import { selectIsLoggedIn } from 'redux/features/auth/slice';

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
    fontStyle: 'italic'
  },
  listProductSearch: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    width: 349,
    top: 40,
    borderRadius: 5,
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
  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const productsSearchBar = useAppSelector(selectProductsSearchBar);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { openCart } = cartActions;
  const { getProductsSearchBar, getProductsSearchBarSuccess } = productActions;
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  return (
    <Container component="main">
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <img className={classes.logo} src="logo.png" alt="logo" />
          <Typography variant="h5" className={classes.logoTitle}>
            E-COMMERCE SHOP
          </Typography>
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
                              <Typography variant="caption">
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
            <Button text="My Wishlist" startIcon={<FavoriteBorderIcon />} />
            <Button text="My Account" startIcon={<AccountCircle />} />
            {isLoggedIn ? (
              <Button text="Logout" startIcon={<ExitToAppIcon />} />
            ) : (
              <Button text="Login" startIcon={<VpnKeyIcon />} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
