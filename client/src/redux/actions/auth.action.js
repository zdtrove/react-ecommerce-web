import { authTypes, uiTypes } from "../types"
import { snackbar, userRole } from '../../constants'
import axios from 'axios'

const { SHOW_BACKDROP, SHOW_SNACKBAR, HIDE_BACKDROP } = uiTypes
const { AUTH, AUTH_ADMIN, LOGOUT_SUCCESS, LOGOUT_ADMIN_SUCCESS } = authTypes
const { SNACKBAR_STATUS_SUCCESS, SNACKBAR_STATUS_ERROR } = snackbar
const { ADMIN, USER } = userRole

export const register = user => async dispatch => {
	try {
		dispatch({ type: SHOW_BACKDROP })
		const res = await axios.post('/api/auth/register', user)
		const { status, data: { message } } = res
		if (status === 201) {
			dispatch({ type: SHOW_SNACKBAR, payload: {
				message: message,
				status: SNACKBAR_STATUS_SUCCESS
			}})
		}
	} catch (err) {
		dispatch({ type: SHOW_SNACKBAR, payload: {
			message: err.response.data.message,
			status: SNACKBAR_STATUS_ERROR
		}})
	}
	dispatch({ type: HIDE_BACKDROP })
}

export const login = (user, role = USER) => async dispatch => {
	const type = role === USER ? AUTH : AUTH_ADMIN
	const isLogin = role === USER ? 'isLogin' : 'isLoginAdmin'
	try {
		dispatch({ type: SHOW_BACKDROP })
		const res = await axios.post('/api/auth/login', {...user, role})
		const { status, data } = res
		if (status === 200) {
			dispatch({ type, payload: data})
			dispatch({ type: SHOW_SNACKBAR, payload: {
				message: data.message,
				status: SNACKBAR_STATUS_SUCCESS
			}})
			localStorage.setItem(isLogin, true)
		}
	} catch (err) {
		dispatch({ type: SHOW_SNACKBAR, payload: {
			message: err.response.data.message,
			status: SNACKBAR_STATUS_ERROR
		}})
	}
	dispatch({ type: HIDE_BACKDROP })
}

export const refreshToken = () => async dispatch => {
	try {
		 const isLogin = localStorage.getItem("isLogin")
		 const isLoginAdmin = localStorage.getItem("isLoginAdmin")
		 if (isLogin) {
			 const res = await axios.post('/api/auth/refresh_token', { role: USER })
			 const { status, data } = res
			 if (status === 200) {
				 dispatch({ type: AUTH, payload: data })
			 }
		 }
		 if (isLoginAdmin) {
			 const res = await axios.post('/api/auth/refresh_token_admin', { role: ADMIN })
			 const { status, data } = res
			 if (status === 200) {
				 dispatch({ type: AUTH_ADMIN, payload: data })
			 }
		 }
	} catch (err) {
		dispatch({ type: SHOW_SNACKBAR, payload: {
			message: err.response.data.message,
			status: SNACKBAR_STATUS_ERROR
		}})
	}
}

export const logout = (history, role = USER) => async dispatch => {
	try {
		const res = await axios.post('/api/auth/logout', { role })
		const { status, data: { message } } = res
		if (status === 200) {
			if (role === USER) {
				dispatch({ type: LOGOUT_SUCCESS })
				localStorage.removeItem('isLogin')
				history.push('/login')
			} else {
				dispatch({ type: LOGOUT_ADMIN_SUCCESS })
				localStorage.removeItem('isLoginAdmin')
				history.push('/admin/login')
			}
			dispatch({ type: SHOW_SNACKBAR, payload: {
				message: message,
				status: SNACKBAR_STATUS_SUCCESS
			}})
		}
	} catch (err) {
		dispatch({ type: SHOW_SNACKBAR, payload: {
			message: err.response.data.message,
			status: SNACKBAR_STATUS_ERROR
		}})
	}
}