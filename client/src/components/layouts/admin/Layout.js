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
    Button,
    CssBaseline
} from '@material-ui/core'
import {
    Menu as MenuIcon
} from '@material-ui/icons'
import { logout } from '../../../redux/actions/auth.action'
import { userRoles } from '../../../constants'

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    }
}))

const Layout = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { ADMIN } = userRoles

    return (
        <Container component="main" maxWidth={maxWidth || "lg"}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} to="/" component={Link}>
                        Home
                    </Typography>
                    <Button onClick={() => dispatch(logout(history, ADMIN))} disableRipple color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    )
}

export default Layout
