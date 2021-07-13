import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = props => {
    const isLogin = localStorage.getItem('isLogin')
    return isLogin ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute
