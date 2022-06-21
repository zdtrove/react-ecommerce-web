import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { jwtConst, userRoles } from 'constants'
import jwtDecode from 'jwt-decode'

const { ACCESS_TOKEN } = jwtConst
const { ADMIN } = userRoles

const PrivateRoute = ({ admin, ...rest }) => {
	try {
		const accessToken = localStorage.getItem(ACCESS_TOKEN)
		
		if (admin) {
			if (accessToken) {
				const decoded = jwtDecode(accessToken.split(" ")[1])
			    return decoded.role === ADMIN ? <Route {...rest} /> : <Redirect to="/admin/login" />
			} else return <Redirect to="/admin/login" />
		} else {
			if (accessToken) {
			    return <Route {...rest} />
			} else return <Redirect to="/login" />
		}
	} catch (err) {
		return <Redirect to="/login" />
	}
}

export default PrivateRoute
