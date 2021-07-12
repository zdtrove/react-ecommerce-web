import { authTypes } from '../types'

const initialState = {
	token: null,
	user: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authTypes.AUTH:
			return {
				...state,
				token: action.payload.accessToken,
				user: action.payload.user
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