import axios from '../../utils/axios'
import { userTypes } from '../../redux/types'

const { GET_USERS } = userTypes

export const getUsers = () => async dispatch => {
	try {
		const res = await axios.get('/api/user', { role: 'user' })
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_USERS, payload: data })
			return data.users
		}
	} catch (err) {}
}