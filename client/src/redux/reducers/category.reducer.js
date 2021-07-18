import { categoryTypes } from '../types'

const { GET_CATEGORIES } = categoryTypes

const initialState = {
	categories: []
}

const categoryReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: payload.categories
			}
		default:
			return state
	}
}

export default categoryReducer