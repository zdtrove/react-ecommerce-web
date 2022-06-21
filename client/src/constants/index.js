export const snackbar = {
	SNACKBAR_STATUS_SUCCESS: "success",
	SNACKBAR_STATUS_ERROR: "error"
}

export const userRoles = {
	ADMIN: "admin",
	USER: "user"
}

export const jwtConst = {
	ACCESS_TOKEN: "accessToken",
	JWT_EXPIRED: 'TokenExpiredError',
	JWT_INVALID: 'JsonWebTokenError'
}

export const userConst = {
	GENDER: ["Male", "Female", "Other"],
	CITY: ["Ha Noi", "Ho Chi Minh", "Da Nang"],
	PAYMENT_METHODS: ["Cash", "Card", "Other"],
	ROLES: ["admin", "user"]
}

export const uploadConst = {
	CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dj7zmqrth/upload',
	CLOUDINARY_UPLOAD_PRESET: 'uyg8yabv'
}

export const ROUTES = {
	home: {
		index: '/',
		login: '/login',
		register: '/register',
	},
	admin: {
		index: '/admin',
		login: '/admin/login',
		categories: '/admin/categories',
		users: '/admin/users'
	},
}

export const ENDPOINTS = {
	auth: {
		register: '/api/auth/register',
		login: '/api/auth/login',
		getLoggedUser: '/api/auth/get_logged_user',
		refreshToken: '/api/auth/refresh_token',
		logout: '/api/auth/logout',
	},
	users: {
		getAll: '/api/users',
		getOne: '/api/user',
	},
	categories: {
		getAll: '/api/categories',
		getOne: '/api/category',
	},
}