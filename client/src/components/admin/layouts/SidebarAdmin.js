import React from 'react'
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
} from '@material-ui/core'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        }
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
            minWidth: 72
        }
    }
}))

const sidebars = [
    { name: 'Users', pathname: '/admin/users', icon: <GroupRoundedIcon />},
    { name: 'Categories', pathname: '/admin/categories', icon: <CategoryRoundedIcon />},
]

const Sidebar = ({ open, handleDrawerClose }) => {
    const classes = useStyles()
    const location = useLocation()
    const { pathname } = location

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <Paper square className={classes.sidebar} component={Box} boxShadow={4}>
                <List>
                    {sidebars.map((sidebar, idx) => (
                        <ListItem
                            key={idx}
                            selected={pathname === sidebar.pathname}
                            classes={{ selected: classes.selected }} 
                            className={classNames(
                                classes.listItem,
                                {[classes.disabled]: pathname === sidebar.pathname}
                            )} 
                            button
                            component={Link}
                            to={sidebar.pathname}
                            disableGutters
                        >
                            <ListItemIcon>
                                {sidebar.icon}
                            </ListItemIcon>
                            <ListItemText primary={sidebar.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Drawer>
    )
}

export default Sidebar
