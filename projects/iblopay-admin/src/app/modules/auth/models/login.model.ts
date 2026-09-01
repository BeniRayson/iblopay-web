// src/app/modules/auth/models/login.model.ts
export interface LoginRequest {
  phone_number: string;
  pin: string;
}

export interface ForgotPasswordRequest {
  phone_number: string;
}

export interface ResetPasswordRequest {
  phone_number: string;
  otp_code: string;
  new_pin: string;
  confirm_pin: string;
}

export interface TwoFactorRequest {
  phone_number: string;
  otp_code: string;
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp_code: string;
}
