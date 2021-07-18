import axiosPackage from 'axios'
import store from '../redux/store'
import { uiTypes, authTypes } from '../redux/types'
import { snackbar, userRoles, jwtConst } from '../constants'
import { refreshTokenUser, refreshTokenAdmin } from '../redux/actions/auth.action'

const { LOGOUT_SUCCESS, LOGOUT_ADMIN_SUCCESS } = authTypes
const { SHOW_SNACKBAR, SHOW_BACKDROP, HIDE_BACKDROP } = uiTypes
const { SNACKBAR_STATUS_SUCCESS, SNACKBAR_STATUS_ERROR } = snackbar
const { USER, ADMIN } = userRoles
const { JWT_EXPIRED, JWT_INVALID, ACCESS_TOKEN, ACCESS_TOKEN_ADMIN } = jwtConst

const axios = axiosPackage.create({});

axios.interceptors.request.use(function (config) {
    Object.assign(config.headers, { 
        Authorization: localStorage.getItem(ACCESS_TOKEN),
        AuthorizationAdmin: localStorage.getItem(ACCESS_TOKEN_ADMIN)
    })
    console.log(config)
    store.dispatch({ type: SHOW_BACKDROP })
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log(response)
    const { message } = response.data
    if (message) {
        if (response.status === 200 || response.status === 201) {
            store.dispatch({ type: SHOW_SNACKBAR, payload: {
                message: response.data.message,
                status: SNACKBAR_STATUS_SUCCESS
            }})
        }
    }
    store.dispatch({ type: HIDE_BACKDROP })

    return response;
}, async function (error) {
    const { data, config } = error.response
    console.log(error.response.data)
    if (data.name === JWT_INVALID && data.role === ADMIN) {
        store.dispatch({ type: LOGOUT_ADMIN_SUCCESS })
        localStorage.removeItem(ACCESS_TOKEN_ADMIN)
        window.location.href = "/admin/login"
    }
    if (data.name === JWT_INVALID && data.role === USER) {
        store.dispatch({ type: LOGOUT_SUCCESS })
        localStorage.removeItem(ACCESS_TOKEN)
        window.location.href = "/login"
    }
    if (data.name === JWT_EXPIRED && data.role === USER) {
        await store.dispatch(refreshTokenUser())
        config._retry = true
        config.headers['Authorization'] = localStorage.getItem(ACCESS_TOKEN)

        return axiosPackage(config)
    }
    if (data.name === JWT_EXPIRED && data.role === ADMIN) {
        await store.dispatch(refreshTokenAdmin())
        config._retry = true
        config.headers['AuthorizationAdmin'] = localStorage.getItem(ACCESS_TOKEN_ADMIN)
        
        return axiosPackage(config)
    }
    store.dispatch({ type: SHOW_SNACKBAR, payload: {
        message: error.response.data.message,
        status: SNACKBAR_STATUS_ERROR
    }})
    store.dispatch({ type: HIDE_BACKDROP })

    return Promise.reject(error);
});

export default axios