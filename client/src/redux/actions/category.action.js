import { categoryTypes } from '../../redux/types'
import axios from '../../utils/axios'
import { imageUpload } from '../../utils/upload'

const { GET_CATEGORIES } = categoryTypes

export const getCategories = role=> async dispatch => {
	try {
		const res = await axios.get('/api/categories', { role })
		const { status, data } = res
		if (status === 200) {
			dispatch({ type: GET_CATEGORIES, payload: data })
		}
	} catch (err) {}
}

export const addCategory = category => async dispatch => {
	try {
		const image = await imageUpload(category.image)
		category.image = image.url
		const res = await axios.post('/api/categories', category)
		if (res.status === 201) {
			dispatch(getCategories())
		}
	} catch (err) {}
}

export const updateCategory = category => async dispatch => {
	try {
		const image = await imageUpload(category.image)
		category.image = image.url
		const res = await axios.patch(`/api/category/${category.id}`, category)
		if (res.status === 200) {
			dispatch(getCategories())
		}
	} catch (err) {}
}

export const deleteCategory = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/category/${id}`)
		if (res.status === 200) {
			dispatch(getCategories())
		}
	} catch (err) {}
}