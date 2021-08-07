import axios from '../../utils/axios'
import { userTypes } from '../../redux/types'

const { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = userTypes

export const getUsers = () => async dispatch => {
	try {
		const res = await axios.get('/api/users')
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_USERS, payload: data })
			return data.users
		}
	} catch (err) {}
}

export const addUser = user => async dispatch => {
	try {
		const res = await axios.post('/api/users', user)
		const { status, data } = res
		if (status === 201) {
			dispatch({ type: ADD_USER, payload: data })
		}
	} catch (err) {

	}
}

export const updateUser = user => async dispatch => {
	try {
		const res = await axios.patch(`/api/user/${user._id}`, user)
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: UPDATE_USER, payload: data })
		}
	} catch (err) {}
}

export const deleteUser = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/user/${id}`)
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: DELETE_USER, payload: data })
		}
	} catch (err) {}
}