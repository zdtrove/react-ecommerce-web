import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ admin, ...rest }) => {
	if (admin) {
		const isLoginAdmin = localStorage.getItem('isLoginAdmin')
    	return isLoginAdmin ? <Route {...rest} /> : <Redirect to="/admin/login" />
	} else {
		const isLogin = localStorage.getItem('isLogin')
    	return isLogin ? <Route {...rest} /> : <Redirect to="/login" />
	}
}

export default PrivateRoute
