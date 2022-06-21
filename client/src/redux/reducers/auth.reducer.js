import { authTypes } from 'redux/types'

const { 
	AUTH,
	LOGOUT_SUCCESS,
	REFRESH_TOKEN
} = authTypes

const initialState = {
	isAuthenticated: false,
	user: null
}

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH:
		case REFRESH_TOKEN:
			return {
				...state,
				isAuthenticated: true,
				user: payload.user
			}
		case LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				user: null
			}
		default:
			return state
	}
}

export default authReducer