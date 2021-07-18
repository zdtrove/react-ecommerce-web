import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { jwtConst } from '../constants'

const { ACCESS_TOKEN, ACCESS_TOKEN_ADMIN } = jwtConst

const PrivateRoute = ({ admin, ...rest }) => {
	if (admin) {
		const accessTokenAdmin = localStorage.getItem(ACCESS_TOKEN_ADMIN)
    	return accessTokenAdmin ? <Route {...rest} /> : <Redirect to="/admin/login" />
	} else {
		const accessToken = localStorage.getItem(ACCESS_TOKEN)
    	return accessToken ? <Route {...rest} /> : <Redirect to="/login" />
	}
}

export default PrivateRoute
