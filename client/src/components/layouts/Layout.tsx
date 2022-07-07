import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Badge
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'components/UI';
import { ROUTES, userRoles } from 'constants/index';
import { authActions, selectIsLoggedIn } from 'redux/features/auth/authSlice';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { cartActions, selectCartTotalQuantity } from 'redux/features/cart/cartSlice';

const { USER } = userRoles;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}));

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const { openCart } = cartActions;

  const renderAuthBtn = () => {
    return isLoggedIn ? (
      <Button
        variant="text"
        size="medium"
        text="LOGOUT"
        onClick={() => dispatch(authActions.logout({ history, role: USER }))}
        disableRipple
        color="inherit"
      />
    ) : (
      <>
        <Button
          variant="text"
          size="medium"
          disableRipple
          color="inherit"
          to={ROUTES.home.login}
          component={Link}
          text="LOGIN"
        />
        <Button
          variant="text"
          size="medium"
          disableRipple
          color="inherit"
          to={ROUTES.home.signUp}
          component={Link}
          text="REGISTER"
        />
      </>
    );
  };

  return (
    <Container component="main">
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            to={ROUTES.admin.index}
            component={Link}
          >
            Go to Admin
          </Typography>
          {renderAuthBtn()}
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
