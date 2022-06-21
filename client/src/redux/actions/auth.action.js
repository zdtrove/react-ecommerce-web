import { authTypes } from "redux/types"
import { userRoles, jwtConst, ROUTES, ENDPOINTS } from 'constants'
import axios from 'utils/axios'
import jwtDecode from 'jwt-decode'

const { 
	AUTH,
	LOGOUT_SUCCESS,
	REFRESH_TOKEN
} = authTypes
const { USER } = userRoles
const { ACCESS_TOKEN } = jwtConst

export const register = user => async dispatch => {
	try {
		const res = await axios.post(ENDPOINTS.auth.register, user)
		const { status } = res
		if (status === 201) {
			
		}
	} catch (err) {}
}

export const login = user => async dispatch => {
	try {
		const res = await axios.post(ENDPOINTS.auth.login, user)
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: AUTH, payload: data})
			localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`)
		}
	} catch (err) {}
}

export const getLoggedUser = () => async dispatch => {
	try {
		const accessToken = localStorage.getItem(ACCESS_TOKEN)
		if (accessToken) {
			const res = await axios.post(ENDPOINTS.auth.getLoggedUser, {
				accessToken
			})
			const { status, data } = res
			if (status === 200) {
				dispatch({ type: AUTH, payload: data })
			}
		}
		
	} catch (err) {}
}

export const refreshToken = () => async dispatch => {
	try {
		const accessToken = localStorage.getItem(ACCESS_TOKEN)
	 	if (accessToken) {
	 		const decoded = jwtDecode(accessToken.split(" ")[1])
		 	const res = await axios.post(ENDPOINTS.auth.refreshToken, { accessToken, role: decoded.role })
		 	const { status, data } = res
		 	if (status === 200) {
			 	dispatch({ type: REFRESH_TOKEN, payload: data })
			 	localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`)
		 	}
	 	}
	} catch (err) {}
}

export const logout = (history, role = USER) => async dispatch => {
	try {
		const res = await axios.post(ENDPOINTS.auth.logout, { role })
		const { status } = res
		if (status === 200) {
			if (role === USER) {
				dispatch({ type: LOGOUT_SUCCESS })
				localStorage.removeItem(ACCESS_TOKEN)
				history.push(ROUTES.home.login)
			} else {
				dispatch({ type: LOGOUT_SUCCESS })
				localStorage.removeItem(ACCESS_TOKEN)
				history.push(ROUTES.admin.login)
			}
		}
	} catch (err) {}
}