import { TokenPair, DecodedToken } from '../models/token.model';
export declare class TokenService {
    /**
     * Store token pair in localStorage
     */
    setTokens(tokens: TokenPair): void;
    /**
     * Get the current access token
     */
    getAccessToken(): string | null;
    /**
     * Get the current refresh token
     */
    getRefreshToken(): string | null;
    /**
     * Remove all tokens
     */
    clearTokens(): void;
    /**
     * Check if the access token is expired
     */
    isTokenExpired(): boolean;
    /**
     * Check if the token needs refreshing (within threshold of expiry)
     */
    shouldRefreshToken(): boolean;
    /**
     * Decode a JWT token without verification (client-side only)
     */
    decodeToken(token: string): DecodedToken | null;
    /**
     * Get user role from the current token
     */
    getRoleFromToken(): string | null;
    /**
     * Get permissions from the current token
     */
    getPermissionsFromToken(): string[];
    /**
     * Get user ID from the current token
     */
    getUserIdFromToken(): string | null;
    /**
     * Check if we have valid tokens stored
     */
    hasTokens(): boolean;
}
//# sourceMappingURL=token.service.d.ts.map