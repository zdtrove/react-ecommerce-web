import React from 'react'
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

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%'
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    },
    main: {
        paddingTop: 75,
        paddingLeft: 250
    }
}))

const LayoutAdmin = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { ADMIN } = userRoles

    return (
        <Container className={classes.root}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit">
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
            <SidebarAdmin />
            <main className={classes.main}>
                {children}
            </main>
        </Container>
    )
}

export default LayoutAdmin
