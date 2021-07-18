import { authTypes } from '../types'

const { 
	AUTH, 
	AUTH_ADMIN, 
	LOGOUT_SUCCESS, 
	LOGOUT_ADMIN_SUCCESS,
	REFRESH_TOKEN,
	REFRESH_TOKEN_ADMIN
} = authTypes

const initialState = {
	isAuthenticated: false,
	isAuthenticatedAdmin: false,
	user: null,
	userAdmin: null
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
		case AUTH_ADMIN:
		case REFRESH_TOKEN_ADMIN:
			return {
				...state,
				isAuthenticatedAdmin: true,
				userAdmin: payload.user
			}
		case LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				user: null
			}
		case LOGOUT_ADMIN_SUCCESS:
			return {
				...state,
				isAuthenticatedAdmin: false,
				userAdmin: null
			}

		default:
			return state
	}
}

export default authReducer