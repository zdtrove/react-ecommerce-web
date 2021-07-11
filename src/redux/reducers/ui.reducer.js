import { uiTypes } from '../types'

const initialState = {
	snackbar: false,
	snackbarMessage: null,
	snackbarStatus: null,
	backdrop: false
}

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case uiTypes.SHOW_SNACKBAR:
			return {
				...state,
				snackbar: action.payload.snackbar,
				snackbarMessage: action.payload.message,
				snackbarStatus: action.payload.status
			}
		case uiTypes.HIDE_SNACKBAR:
			return {
				...state,
				snackbar: action.payload.snackbar
			}
		case uiTypes.SHOW_BACKDROP:
			return {
				...state,
				backdrop: action.payload
			}
		case uiTypes.HIDE_BACKDROP:
			return {
				...state,
				backdrop: action.payload
			}
		default:
			return state
	}
}

export default uiReducer