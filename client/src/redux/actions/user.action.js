import axios from '../../utils/axios'
import { userTypes } from '../../redux/types'

const { GET_USERS, UPDATE_USER, DELETE_USER } = userTypes

export const getUsers = () => async dispatch => {
	try {
		const res = await axios.get('/api/users', { role: 'user' })
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_USERS, payload: data })
			return data.users
		}
	} catch (err) {}
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
		console.log(res)
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: DELETE_USER, payload: data })
		}
	} catch (err) {}
}