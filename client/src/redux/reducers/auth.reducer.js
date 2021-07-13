import { authTypes } from '../types'

const { AUTH, AUTH_ADMIN, LOGOUT_SUCCESS, LOGOUT_ADMIN_SUCCESS } = authTypes

const initialState = {
	token: null,
	tokenAdmin: null,
	user: null,
	userAdmin: null
}

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH: {
			const { accessToken, user } = payload
			return {
				...state,
				token: accessToken,
				user
			}
		}
		case LOGOUT_SUCCESS:
			return {
				...state,
				token: null,
				user: null
			}
		case LOGOUT_ADMIN_SUCCESS:
			return {
				...state,
				tokenAdmin: null,
				userAdmin: null
			}
		case AUTH_ADMIN: {
			const { accessToken, user } = payload
			return {
				...state,
				tokenAdmin: accessToken,
				userAdmin: user
			}
		}
		default:
			return state
	}
}

export default authReducer