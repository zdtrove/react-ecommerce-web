import { authTypes, uiTypes } from "../types"
import axios from 'axios'

export const register = user => async dispatch => {
	try {
		dispatch({ type: uiTypes.SHOW_BACKDROP, payload: true })
		const res = await axios.post('/api/register', user)
		if (res.status === 201) {
			dispatch({ type: authTypes.AUTH, payload: res.data})
			dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
				snackbar: true,
				snackbarMessage: res.data.message,
				snackbarStatus: "success"
			}})
			localStorage.setItem("firstLogin", true)
		}
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
	dispatch({ type: uiTypes.HIDE_BACKDROP, payload: false })
}

export const login = user => async dispatch => {
	try {
		dispatch({ type: uiTypes.SHOW_BACKDROP, payload: true })
		const res = await axios.post('/api/login', user)
		if (res.status === 200) {
			dispatch({ type: authTypes.AUTH, payload: res.data})
			dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
				snackbar: true,
				snackbarMessage: res.data.message,
				snackbarStatus: "success"
			}})
			localStorage.setItem("firstLogin", true)
		}
	} catch (err) {
		dispatch({ type: uiTypes.SHOW_SNACKBAR, payload: {
			snackbar: true,
			snackbarMessage: err.response.data.message,
			snackbarStatus: "error"
		}})
	}
	dispatch({ type: uiTypes.HIDE_BACKDROP, payload: false })
}