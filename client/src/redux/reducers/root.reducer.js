import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
import uiReducer from './ui.reducer'

export default combineReducers({
	auth: authReducer,
	ui: uiReducer
})