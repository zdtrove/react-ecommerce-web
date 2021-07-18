import { userTypes } from '../types'

const { GET_USERS } = userTypes

const initialState = {
	users: []
}

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USERS:
			return {
				...state,
				users: payload.users
			}
		default:
			return state
	}
}

export default userReducer