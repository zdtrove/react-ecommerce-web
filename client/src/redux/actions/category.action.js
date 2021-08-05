import { categoryTypes } from '../../redux/types'
import axios from '../../utils/axios'
import { imageUpload } from '../../utils/upload'

const { GET_CATEGORIES } = categoryTypes

export const getCategories = () => async dispatch => {
	try {
		const res = await axios.get('/api/categories', { role: 'admin' })
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_CATEGORIES, payload: data })
		}
	} catch (err) {}
}

export const addCategory = () => async dispatch => {
	try {
		const res = await axios.post('/api/categories', { name: "New Category" })
		if (res.status === 201) {
			console.log(res)
		}
	} catch (err) {}
}

export const updateCategory = category => async dispatch => {
	try {
		const image = await imageUpload(category.image)
		category.image = image.url
		const res = await axios.patch(`/api/category/${category.id}`, category)
		const { status } = res
		if (status === 200) {
			dispatch(getCategories())
		}
	} catch (err) {}
}