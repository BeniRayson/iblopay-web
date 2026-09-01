// src/app/core/constants/api.constants.ts
export const API = {
  BASE_URL: '/api',
  VERSION: 'v1',
  
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp'
  },
  
  AGENTS: {
    BASE: '/agents',
    DETAIL: '/agents/:id',
    STATUS: '/agents/:id/status',
    DOCUMENTS: '/agents/:id/documents'
  },
  
  TRANSACTIONS: {
    BASE: '/transactions',
    DETAIL: '/transactions/:id',
    EXPORT: '/transactions/export'
  },
  
  CARDS: {
    BASE: '/cards',
    DETAIL: '/cards/:id',
    ACTIVATE: '/cards/:id/activate',
    BLOCK: '/cards/:id/block'
  },
  
  USERS: {
    BASE: '/users',
    DETAIL: '/users/:id',
    ROLES: '/users/:id/roles'
  }
};
