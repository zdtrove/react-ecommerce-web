import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  IconButton
} from '@material-ui/core';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from 'constants/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: 'green'
    },
    '&:hover .MuiSvgIcon-root': {
      color: 'green'
    }
  },
  selected: {
    color: 'green',
    '& .MuiSvgIcon-root': {
      color: 'green'
    }
  },
  disabled: {
    pointerEvents: 'none'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    position: 'relative',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  sidebar: {
    '& .MuiListItem-root': {
      padding: `${theme.spacing(1.5)}px 0`
    },
    '& .MuiList-padding': {
      padding: 0
    },
    '& .MuiListItemIcon-root': {
      justifyContent: 'center',
      minWidth: 56,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    }
  }
}));

const sidebars = [
  { name: 'Users', pathname: ROUTES.admin.users, icon: <GroupRoundedIcon /> },
  { name: 'Categories', pathname: ROUTES.admin.categories, icon: <CategoryRoundedIcon /> }
];

type SidebarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
};

const Sidebar = ({ open, handleDrawerOpen }: SidebarProps) => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaperClose, !open && classes.drawerPaper)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerOpen}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Paper square className={classes.sidebar} component={Box}>
        <List>
          {sidebars.map((sidebar, idx) => (
            <ListItem
              key={idx}
              selected={pathname === sidebar.pathname}
              classes={{ selected: classes.selected }}
              className={classNames(classes.listItem, {
                [classes.disabled]: pathname === sidebar.pathname
              })}
              button
              component={Link}
              to={sidebar.pathname}
              disableGutters
            >
              <ListItemIcon>{sidebar.icon}</ListItemIcon>
              <ListItemText primary={sidebar.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func
};

export default Sidebar;
