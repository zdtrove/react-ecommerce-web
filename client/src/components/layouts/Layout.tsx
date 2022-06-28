import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'components/UI';
import { ROUTES, userRoles } from 'constants/index';
import { authActions, selectIsLoggedIn } from 'redux/features/auth/authSlice';

const { USER } = userRoles;

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  }
}));

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const history = useHistory();

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
