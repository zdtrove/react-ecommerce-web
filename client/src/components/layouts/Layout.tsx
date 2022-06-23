import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import { Link } from 'react-router-dom';
import { logout } from 'redux/actions/auth.action';
import { useHistory } from 'react-router-dom';
import { Button } from 'components/UI';
import { ROUTES } from 'constants/index';
import { RootState } from 'redux/reducers/root.reducer';

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
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const renderAuthBtn = () => {
    return auth.isAuthenticated ? (
      <Button
        variant="text"
        size="medium"
        text="LOGOUT"
        onClick={() => dispatch(logout(history))}
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
          to={ROUTES.home.register}
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
