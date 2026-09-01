// src/app/modules/auth/auth.constants.ts
export const AUTH_CONSTANTS = {
  // Storage keys
  ACCESS_TOKEN_KEY: 'iblopay_access_token',
  REFRESH_TOKEN_KEY: 'iblopay_refresh_token',
  USER_KEY: 'iblopay_current_user',
  SESSION_KEY: 'iblopay_session',

  // Token settings
  TOKEN_REFRESH_THRESHOLD: 300, // seconds before expiry to trigger refresh (5 min)

  // OTP settings
  OTP_LENGTH: 6,
  OTP_RESEND_COOLDOWN: 60, // seconds
  OTP_EXPIRY: 300,         // seconds (5 min)

  // PIN settings
  PIN_LENGTH: 4,
  PIN_MIN_LENGTH: 4,
  PIN_MAX_LENGTH: 6,

  // Session settings
  SESSION_TIMEOUT: 1800,    // seconds (30 min)
  SESSION_CHECK_INTERVAL: 60, // seconds

  // Phone validation
  PHONE_PATTERN: /^\+?[0-9]{9,15}$/,
  PHONE_PREFIX: '+237',

  // Routes
  LOGIN_ROUTE: '/auth/login',
  DASHBOARD_ROUTE: '/dashboard',
  FORGOT_PASSWORD_ROUTE: '/auth/forgot-password',
  RESET_PASSWORD_ROUTE: '/auth/reset-password',
  TWO_FACTOR_ROUTE: '/auth/2fa',

  // Messages
  MESSAGES: {
    LOGIN_SUCCESS: 'Connexion réussie',
    LOGIN_FAILED: 'Numéro de téléphone ou PIN incorrect',
    LOGOUT_SUCCESS: 'Déconnexion réussie',
    SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
    OTP_SENT: 'Le code OTP a été envoyé à votre numéro de téléphone',
    OTP_INVALID: 'Code OTP invalide ou expiré',
    OTP_RESENT: 'Code OTP renvoyé avec succès',
    PASSWORD_RESET_SUCCESS: 'Votre PIN a été réinitialisé avec succès',
    UNAUTHORIZED: 'Vous n\'avez pas accès à cette ressource',
    NETWORK_ERROR: 'Erreur de connexion. Veuillez réessayer.',
    USER_CREATED: 'Utilisateur créé avec succès',
    USER_UPDATED: 'Utilisateur mis à jour avec succès',
    USER_SUSPENDED: 'Utilisateur suspendu',
    USER_ACTIVATED: 'Utilisateur activé'
  }
};
