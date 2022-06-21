import React, { useState, useEffect } from 'react'
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
import { logout } from 'redux/actions/auth.action'
import { userRoles } from 'constants'
import SidebarAdmin from './SidebarAdmin'
import { Button } from 'components/UI'
import clsx from 'clsx'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
        display: 'none',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2)
        }
    }
}))

const LayoutAdmin = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { ADMIN } = userRoles
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        localStorage.setItem('drawer', true)
        setOpen(true);
    }

    const handleDrawerClose = () => {
        localStorage.setItem('drawer', false)
        setOpen(false);
    }

    useEffect(() => {
        let drawer = localStorage.getItem('drawer')
        setOpen(drawer === 'true' ? true : false)
    }, [])

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
                    handleDrawerOpen
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
