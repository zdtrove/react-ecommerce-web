import React from 'react'
import {
    makeStyles,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 250,
        height: '100%',
        paddingTop: 64
    },
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
    }
}))

const sidebars = [
    { name: 'Users', pathname: '/admin/users', icon: <GroupRoundedIcon />},
    { name: 'Categories', pathname: '/admin/categories', icon: <CategoryRoundedIcon />},
]

const Sidebar = () => {
    const classes = useStyles()
    const location = useLocation()
    const { pathname } = location

    return (
        <Paper component={Box} boxShadow={4} className={classes.sidebar}>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Admin Dashboard"
                    />
                </ListItem>
                <Divider />
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
                    >
                        <ListItemIcon>
                            {sidebar.icon}
                        </ListItemIcon>
                        <ListItemText primary={sidebar.name} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default Sidebar
