import { categoryTypes } from '../../redux/types'
import axios from '../../utils/axios'

const { GET_CATEGORIES } = categoryTypes

export const getCategories = () => async dispatch => {
	try {
		const res = await axios.get('/api/category', { role: 'admin' })
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_CATEGORIES, payload: data })
		}
	} catch (err) {}
}

export const addCategory = () => async dispatch => {
	try {
		const res = await axios.post('/api/category', { name: "New Category" })
		if (res.status === 201) {
			console.log(res)
		}
	} catch (err) {}
}