import React from 'react'
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

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    }
}))

const Layout = ({ children, maxWidth, ...rest }) => {
    const classes = useStyles()

    return (
        <Container component="main" maxWidth={maxWidth || "lg"}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button disableRipple color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    )
}

export default Layout
