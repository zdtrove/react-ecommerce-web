import { authTypes } from '../types'

const initialState = {
	token: null,
	tokenAdmin: null,
	user: null,
	userAdmin: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authTypes.AUTH:
			return {
				...state,
				token: action.payload.accessToken,
				user: action.payload.user
			}
		case authTypes.LOGOUT_SUCCESS:
			return {
				...state,
				token: null,
				user: null
			}
		case authTypes.LOGOUT_ADMIN_SUCCESS:
			return {
				...state,
				tokenAdmin: null,
				userAdmin: null
			}
		case authTypes.AUTH_ADMIN:
			return {
				...state,
				tokenAdmin: action.payload.accessToken,
				userAdmin: action.payload.user
			}
		case authTypes.LOGIN_REQUEST:
			return {
				...state
			}
		default:
			return state
	}
}

export default authReducer