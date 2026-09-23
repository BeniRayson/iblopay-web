import { User } from './user.model';
import { TokenPair } from './token.model';
export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: User;
        tokens: TokenPair;
    };
}
export interface OtpResponse {
    success: boolean;
    message: string;
    data?: {
        otp_sent: boolean;
        expires_in: number;
        phone_number: string;
    };
}
export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}
export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    status_code: number;
}
//# sourceMappingURL=auth-response.model.d.ts.map