import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
    makeStyles,
    Container,
    AppBar, 
    Toolbar,
    IconButton,
    Typography,
    CssBaseline
} from '@material-ui/core'
import {
    Menu as MenuIcon
} from '@material-ui/icons'
import { logout } from '../../../redux/actions/auth.action'
import { userRoles } from '../../../constants'
import SidebarAdmin from './SidebarAdmin'
import { Button } from '../../../components/UI'
import clsx from 'clsx'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: 0,
        maxWidth: '100%'
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
    },
    appBarSpacer: theme.mixins.toolbar,
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(2)
    }
}))

const LayoutAdmin = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { ADMIN } = userRoles
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <Container className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton 
                        color="inherit"
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} to="/" component={Link}>
                        Go to website
                    </Typography>
                    <Button 
                        size="medium" 
                        onClick={() => dispatch(logout(history, ADMIN))} 
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
                    handleDrawerClose
                }}
            />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </Container>
    )
}

export default LayoutAdmin
