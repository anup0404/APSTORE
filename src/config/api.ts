// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN_OR_REGISTER: `/auth/send-otp`,
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    PROFILE: "/auth/profile",
  },

  // Users
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    UPLOAD_AVATAR: (id: string) => `/users/${id}/avatar`,
  },
};
//   // Products
//   PRODUCTS: {
//     LIST: '/products',
//     CREATE: '/products',
//     GET: (id: string) => `/products/${id}`,
//     UPDATE: (id: string) => `/products/${id}`,
//     DELETE: (id: string) => `/products/${id}`,
//     SEARCH: '/products/search',
//     CATEGORIES: '/products/categories',
//     FEATURED: '/products/featured',
//     RELATED: (id: string) => `/products/${id}/related`,
//     REVIEWS: (id: string) => `/products/${id}/reviews`,
//     UPLOAD_IMAGES: (id: string) => `/products/${id}/images`,
//   },

//   // Cart
//   CART: {
//     GET: '/cart',
//     ADD_ITEM: '/cart/items',
//     UPDATE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
//     REMOVE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
//     CLEAR: '/cart/clear',
//     APPLY_COUPON: '/cart/coupon',
//   },

//   // Orders
//   ORDERS: {
//     LIST: '/orders',
//     CREATE: '/orders',
//     GET: (id: string) => `/orders/${id}`,
//     UPDATE: (id: string) => `/orders/${id}`,
//     CANCEL: (id: string) => `/orders/${id}/cancel`,
//     TRACK: (id: string) => `/orders/${id}/track`,
//     HISTORY: '/orders/history',
//   },

//   // Wishlist
//   WISHLIST: {
//     GET: '/wishlist',
//     ADD_ITEM: '/wishlist/items',
//     REMOVE_ITEM: (itemId: string) => `/wishlist/items/${itemId}`,
//     CLEAR: '/wishlist/clear',
//   },

//   // Payments
//   PAYMENTS: {
//     METHODS: '/payments/methods',
//     CREATE_INTENT: '/payments/create-intent',
//     CONFIRM: '/payments/confirm',
//     HISTORY: '/payments/history',
//   },

//   // Misc
//   UPLOAD: '/upload',
//   NOTIFICATIONS: '/notifications',
//   SETTINGS: '/settings',
//   CONTACT: '/contact',
//   FEEDBACK: '/feedback',
// } as const;

// // Query parameter helpers
// export const buildQueryString = (params: Record<string, any>): string => {
//   const filteredParams = Object.entries(params)
//     .filter(([_, value]) => value !== undefined && value !== null && value !== '')
//     .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

//   return new URLSearchParams(filteredParams).toString();
// };

// // Common query parameters
// export interface PaginationParams {
//   page?: number;
//   limit?: number;
//   offset?: number;
// }

// export interface SortParams {
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// export interface FilterParams {
//   search?: string;
//   category?: string;
//   status?: string;
//   dateFrom?: string;
//   dateTo?: string;
// }

// export type QueryParams = PaginationParams & SortParams & FilterParams & Record<string, any>;
