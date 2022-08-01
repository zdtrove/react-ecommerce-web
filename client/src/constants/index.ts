export const snackbar = {
  SNACKBAR_STATUS_SUCCESS: 'success',
  SNACKBAR_STATUS_WARNING: 'warning',
  SNACKBAR_STATUS_ERROR: 'error'
};

export const userRoles = {
  ADMIN: 'admin',
  USER: 'user'
};

export const jwtConst = {
  ACCESS_TOKEN: 'accessToken',
  JWT_EXPIRED: 'TokenExpiredError',
  JWT_INVALID: 'JsonWebTokenError'
};

export const userConst = {
  GENDER: ['Male', 'Female', 'Other'],
  CITY: ['Ha Noi', 'Ho Chi Minh', 'Da Nang'],
  PAYMENT_METHODS: ['Cash', 'Card', 'Other'],
  ROLES: ['admin', 'user']
};

export const uploadConst = {
  CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dj7zmqrth/upload',
  CLOUDINARY_UPLOAD_PRESET: 'uyg8yabv'
};

export const ROUTES = {
  home: {
    index: '/',
    login: '/login',
    signUp: '/sign-up',
    category: '/category/:id'
  },
  admin: {
    index: '/admin',
    login: '/admin/login',
    categories: '/admin/categories',
    users: '/admin/users',
    products: '/admin/products',
    events: '/admin/events',
    stores: '/admin/stores',
    settings: '/admin/settings'
  }
};

export const ENDPOINTS = {
  dashboards: {
    getAll: '/api/dashboard'
  },
  auth: {
    signUp: '/api/auth/register',
    login: '/api/auth/login',
    getLoggedUser: '/api/auth/get_logged_user',
    refreshToken: '/api/auth/refresh_token',
    logout: '/api/auth/logout'
  },
  users: {
    getAll: '/api/users',
    getOne: '/api/user'
  },
  categories: {
    getAll: '/api/categories',
    getOne: '/api/category'
  },
  products: {
    getAll: '/api/products',
    getOne: '/api/product'
  },
  events: {
    getAll: '/api/events',
    getOne: '/api/event'
  },
  stores: {
    getAll: '/api/stores',
    getOne: '/api/store'
  }
};

export const CONFIGURATION = {
  manufacturer: ['Việt Nam', 'Thái Lan', 'Trung Quốc'],
  memory: ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB'],
  ram: ['1 GB', '2 GB', '3 GB', '4 GB', '6 GB', '8 GB', '12 GB'],
  hardDrive: ['SSD 2 TB', 'SSD 1 TB', 'SSD 512 GB', 'SSD 256 GB', 'SSD 128 GB']
};

export const HOME_CATEGORY_IDS = {
  smartphone: '62d7b06e7b66332da45e50de',
  laptop: '62d7b0e40a77ec12fc4f7d10',
  tablet: '62d7b0fc0a77ec12fc4f7d15',
  watch: '62d7b11b0a77ec12fc4f7d1a',
  refrigerator: '62d7b15c0a77ec12fc4f7d24',
  airConditioner: '62d7b1be0a77ec12fc4f7d29',
  washingMachine: '62d7b22f0a77ec12fc4f7d2e'
};
