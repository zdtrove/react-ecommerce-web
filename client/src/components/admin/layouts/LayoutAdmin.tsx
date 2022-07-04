import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import { Link, useHistory } from 'react-router-dom';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SidebarAdmin from './SidebarAdmin';
import { Button } from 'components/UI';
import clsx from 'clsx';
import { authActions } from 'redux/features/auth/authSlice';
import { userRoles } from 'constants/index';

const drawerWidth = 240;
const { ADMIN } = userRoles;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 0,
    maxWidth: '100%',
    '& .MuiAppBar-root::-webkit-scrollbar': {
      display: 'none'
    }
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    minWidth: 200
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflow: 'scroll'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  menuButtonHidden: {
    display: 'none'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}));

type LayoutAdminProps = {
  children?: React.ReactNode;
};

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    localStorage.setItem('drawer', 'true');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem('drawer', 'false');
    setOpen(false);
  };

  useEffect(() => {
    let drawer = localStorage.getItem('drawer');
    setOpen(drawer === 'true' ? true : false);
  }, []);

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, !open && classes.appBarShift)}>
        <Toolbar>
          <IconButton
            color="inherit"
            className={clsx(!open && classes.menuButtonHidden)}
            onClick={handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            to="/"
            component={Link}
          >
            Go to website
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
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
          <Button
            size="medium"
            onClick={() => dispatch(authActions.logout({ history, role: ADMIN }))}
            disableRipple
            color="inherit"
            text="LOGOUT"
            variant="text"
          />
        </Toolbar>
      </AppBar>
      <SidebarAdmin
        {...{
          open,
          handleDrawerOpen
        }}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </Container>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node
};

export default LayoutAdmin;
