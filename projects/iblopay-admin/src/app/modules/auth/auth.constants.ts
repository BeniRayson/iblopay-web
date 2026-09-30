export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_KEY: 'iblopay_access_token',
  REFRESH_TOKEN_KEY: 'iblopay_refresh_token',
  USER_KEY: 'iblopay_current_user',
  SESSION_KEY: 'iblopay_session',

  TOKEN_REFRESH_THRESHOLD: 300,

  OTP_LENGTH: 6,
  OTP_RESEND_COOLDOWN: 60,
  OTP_EXPIRY: 300,

  PIN_LENGTH: 4,
  PIN_MIN_LENGTH: 4,
  PIN_MAX_LENGTH: 6,

  SESSION_TIMEOUT: 1800,
  SESSION_CHECK_INTERVAL: 60,

  PHONE_PATTERN: /^\+?[0-9]{9,15}$/,
  PHONE_PREFIX: '+237',

  LOGIN_ROUTE: '/auth/login',
  DASHBOARD_ROUTE: '/dashboard',
  FORGOT_PASSWORD_ROUTE: '/auth/forgot-password',
  RESET_PASSWORD_ROUTE: '/auth/reset-password',
  TWO_FACTOR_ROUTE: '/auth/2fa',

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
