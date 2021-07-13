import { authTypes, uiTypes } from "../types"
import axios from 'axios'

export const register = user => async dispatch => {
	try {
		dispatch({ type: uiTypes.SHOW_BACKDROP })
		const res = await axios.post('/api/register', user)
		if (res.status === 201) {
			dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
				snackbar: true,
				snackbarMessage: res.data.message,
				snackbarStatus: "success"
			}})
		}
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
	dispatch({ type: uiTypes.HIDE_BACKDROP })
}

export const login = (user, role = 'user') => async dispatch => {
	try {
		dispatch({ type: uiTypes.SHOW_BACKDROP })
		const res = await axios.post('/api/login', {...user, role})
		if (res.status === 200) {
			dispatch({ type: authTypes.AUTH, payload: res.data})
			dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
				snackbar: true,
				snackbarMessage: res.data.message,
				snackbarStatus: "success"
			}})
			const isLogin = role === 'user' ? 'isLogin' : 'isLoginAdmin'
			localStorage.setItem(isLogin, true)
		}
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
	dispatch({ type: uiTypes.HIDE_BACKDROP })
}

export const refreshToken = () => async dispatch => {
	try {
		 const isLogin = localStorage.getItem("isLogin")
		 const isLoginAdmin = localStorage.getItem("isLoginAdmin")
		 if (isLogin) {
			 const res = await axios.post('/api/refresh_token', { user: 'user' })
			 if (res.status === 200) {
				 dispatch({ type: authTypes.AUTH, payload: res.data })
			 }
		 }
		 if (isLoginAdmin) {
			 const res = await axios.post('/api/refresh_token_admin', { user: 'admin' })
			 if (res.status === 200) {
				 dispatch({ type: authTypes.AUTH_ADMIN, payload: res.data })
			 }
		 }
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
}

export const logout = (history, role = 'user') => async dispatch => {
	try {
		const res = await axios.post('/api/logout', { role })
		if (res.status === 200) {
			if (role === 'user') {
				dispatch({ type: authTypes.LOGOUT_SUCCESS })
				localStorage.removeItem('isLogin')
				history.push('/login')
			} else {
				dispatch({ type: authTypes.LOGOUT_ADMIN_SUCCESS })
				localStorage.removeItem('isLoginAdmin')
				history.push('/admin/login')
			}
		}
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
}