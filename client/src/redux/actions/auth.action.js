import { authTypes } from "../types"
import { userRoles, jwtConst } from '../../constants'
import axios from '../../utils/axios'

const { 
	AUTH, 
	AUTH_ADMIN, 
	LOGOUT_SUCCESS, 
	LOGOUT_ADMIN_SUCCESS,
	REFRESH_TOKEN,
	REFRESH_TOKEN_ADMIN
} = authTypes
const { ADMIN, USER } = userRoles
const { ACCESS_TOKEN, ACCESS_TOKEN_ADMIN } = jwtConst

export const register = user => async dispatch => {
	try {
		const res = await axios.post('/api/auth/register', user)
		const { status } = res
		if (status === 201) {
			
		}
	} catch (err) {}
}

export const login = (user, role = USER) => async dispatch => {
	const type = role === USER ? AUTH : AUTH_ADMIN
	const accessToken = role === USER ? ACCESS_TOKEN : ACCESS_TOKEN_ADMIN
	try {
		const res = await axios.post('/api/auth/login', {...user, role})
		const { status, data } = res
		console.log(res)
		if (status === 200) {
			dispatch({ type, payload: data})
			localStorage.setItem(accessToken, `Bearer ${data.accessToken}`)
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

export const getLoggedUserAdmin = () => async dispatch => {
	try {
		const accessTokenAdmin = localStorage.getItem(ACCESS_TOKEN_ADMIN)
		if (accessTokenAdmin) {
			const res = await axios.post('/api/auth/get_logged_user_admin', {
				accessTokenAdmin
			})
			const { status, data } = res
			if (status === 200) {
				dispatch({ type: AUTH_ADMIN, payload: data })
			}
		}
	} catch (err) {}
}

export const refreshTokenUser = () => async dispatch => {
	try {
		 const accessToken = localStorage.getItem(ACCESS_TOKEN)
		 if (accessToken) {
			 const res = await axios.post('/api/auth/refresh_token', { accessToken, role: USER })
			 const { status, data } = res
			 if (status === 200) {
				 dispatch({ type: REFRESH_TOKEN, payload: data })
				 localStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`)
			 }
		 }
	} catch (err) {}
}

export const refreshTokenAdmin = () => async dispatch => {
	try {
		 const accessTokenAdmin = localStorage.getItem(ACCESS_TOKEN_ADMIN)
		 if (accessTokenAdmin) {
			 const res = await axios.post('/api/auth/refresh_token_admin', { accessTokenAdmin, role: ADMIN })
			 const { status, data } = res
			 if (status === 200) {
				 dispatch({ type: REFRESH_TOKEN_ADMIN, payload: data })
				 localStorage.setItem(ACCESS_TOKEN_ADMIN, `Bearer ${data.accessToken}`)
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
				dispatch({ type: LOGOUT_ADMIN_SUCCESS })
				localStorage.removeItem(ACCESS_TOKEN_ADMIN)
				history.push('/admin/login')
			}
		}
	} catch (err) {}
}