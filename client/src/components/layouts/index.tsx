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
  Typography
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { cartActions, selectCartTotalQuantity } from 'redux/features/cart/slice';
import { green } from '@material-ui/core/colors';

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch'
    }
  },
  logo: {
    width: 80,
    padding: 5
  },
  logoTitle: {
    color: green['A400'],
    fontStyle: 'italic'
  }
}));

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const { openCart } = cartActions;

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
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={() => dispatch(openCart())} color="inherit">
              <Badge overlap="rectangular" badgeContent={cartTotalQuantity} color="secondary">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
