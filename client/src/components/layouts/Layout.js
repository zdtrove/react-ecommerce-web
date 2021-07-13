import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/auth.action'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    }
}))

const Layout = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const renderAuthBtn = () => {
        return auth.token
            ? <Button onClick={() => dispatch(logout(history))} disableRipple color="inherit">
                Logout
            </Button>
            : <>
                <Button disableRipple color="inherit" to="login" component={Link}>
                    Login
                </Button>
                <Button disableRipple color="inherit" to="register" component={Link}>
                    Register
                </Button>
            </>
    }

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
                    {renderAuthBtn()}
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    )
}

export default Layout
