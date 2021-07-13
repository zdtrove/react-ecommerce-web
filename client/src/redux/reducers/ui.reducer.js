import { uiTypes } from '../types'

const initialState = {
	snackbar: false,
	snackbarMessage: null,
	snackbarStatus: null,
	backdrop: false
}

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case uiTypes.SHOW_SNACKBAR: {
			const { snackbar, snackbarMessage, snackbarStatus } = action.payload
			return {
				...state,
				snackbar,
				snackbarMessage,
				snackbarStatus
			}
		}
		case uiTypes.HIDE_SNACKBAR:
			return {
				...state,
				snackbar: action.payload.snackbar
			}
		case uiTypes.SHOW_BACKDROP:
			return {
				...state,
				backdrop: true
			}
		case uiTypes.HIDE_BACKDROP:
			return {
				...state,
				backdrop: false
			}
		default:
			return state
	}
}

export default uiReducer