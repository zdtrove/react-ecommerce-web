import { userTypes } from '../types'

const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = userTypes

const initialState = {
	users: []
}

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_USER: {
			return {
				...state,
				users: state.users.push(payload.newUser)
			}
		}
		case GET_USERS:
			return {
				...state,
				users: payload.users
			}
		case UPDATE_USER: {
			const users = state.users
			const index = users.findIndex(user => user._id === payload.newUser._id)
			users[index] = payload.newUser
			return {
				...state,
				users
			}
		}
		case DELETE_USER: {
			let users = state.users
			const index = users.findIndex(user => user._id === payload.userDelete._id)
			users = users.splice(index, 1)
			return {
				...state,
				users
			}
		}
		default:
			return state
	}
}

export default userReducer