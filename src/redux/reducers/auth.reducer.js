import { authTypes } from '../types'

const initialState = {}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authTypes.LOGIN_REQUEST:
			return {
				...state
			}
		default:
			return state
	}
}

export default authReducer