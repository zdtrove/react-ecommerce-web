import React from 'react'
import {
    makeStyles,
    Container,
    AppBar, 
    Toolbar,
    IconButton,
    Typography,
    Button
} from '@material-ui/core'
import {
    Menu as MenuIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {

    },
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    }
}))

const Layout = ({ children, ...rest }) => {
    const classes = useStyles()

    return (
        <Container>
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} to="/" component={Link}>
                        Home
                    </Typography>
                    <Button disableRipple color="inherit" to="login" component={Link}>
                        Login
                    </Button>
                    <Button disableRipple color="inherit" to="register" component={Link}>
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    )
}

export default Layout
