import { authTypes } from "../types"
import { userRoles, jwtConst } from '../../constants'
import axios from '../../utils/axios'
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
		const res = await axios.post('/api/auth/register', user)
		const { status } = res
		if (status === 201) {
			
		}
	} catch (err) {}
}

export const login = user => async dispatch => {
	try {
		const res = await axios.post('/api/auth/login', user)
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
			const res = await axios.post('/api/auth/get_logged_user', {
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
		 	const res = await axios.post('/api/auth/refresh_token', { accessToken, role: decoded.role })
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
		const res = await axios.post('/api/auth/logout', { role })
		const { status } = res
		if (status === 200) {
			if (role === USER) {
				dispatch({ type: LOGOUT_SUCCESS })
				localStorage.removeItem(ACCESS_TOKEN)
				history.push('/login')
			} else {
				dispatch({ type: LOGOUT_SUCCESS })
				localStorage.removeItem(ACCESS_TOKEN)
				history.push('/admin/login')
			}
		}
	} catch (err) {}
}