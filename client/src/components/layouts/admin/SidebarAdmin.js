import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'

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

const Sidebar = () => {
    const classes = useStyles()
    const [selectedIdx, setSelectedIdx] = useState(0)

    return (
        <Paper component={Box} boxShadow={4} className={classes.sidebar}>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Admin Dashboard"
                    />
                </ListItem>
                <Divider />
                <ListItem 
                    onClick={() => setSelectedIdx(1)}
                    selected={selectedIdx === 1}
                    classes={{ selected: classes.selected }} 
                    className={classNames(
                        classes.listItem,
                        {[classes.disabled]: selectedIdx === 1}
                    )} 
                    button
                    component={Link}
                    to="/admin/users"
                >
                    <ListItemIcon>
                        <GroupRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem 
                    onClick={() => setSelectedIdx(2)}
                    selected={selectedIdx === 2}
                    classes={{ selected: classes.selected }} 
                    className={classNames(
                        classes.listItem,
                        {[classes.disabled]: selectedIdx === 2}
                    )} 
                    button
                    component={Link}
                    to="/admin/categories"
                >
                    <ListItemIcon>
                        <CategoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
            </List>
        </Paper>
    )
}

export default Sidebar
