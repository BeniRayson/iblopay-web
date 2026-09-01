// src/app/modules/auth/services/token.service.ts
import { Injectable } from '@angular/core';
import { AUTH_CONSTANTS } from '../auth.constants';
import { TokenPair, DecodedToken } from '../models/token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  /**
   * Store token pair in localStorage
   */
  setTokens(tokens: TokenPair): void {
    localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, tokens.refresh_token);
  }

  /**
   * Get the current access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
  }

  /**
   * Get the current refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  }

  /**
   * Remove all tokens
   */
  clearTokens(): void {
    localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if the access token is expired
   */
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const decoded = this.decodeToken(token);
      // For mock tokens (non-JWT), decoded will be null.
      // In that case, consider the token valid if it exists.
      if (!decoded) return false;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return false;
    }
  }

  /**
   * Check if the token needs refreshing (within threshold of expiry)
   */
  shouldRefreshToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return false;

      const now = Math.floor(Date.now() / 1000);
      return (decoded.exp - now) < AUTH_CONSTANTS.TOKEN_REFRESH_THRESHOLD;
    } catch {
      return false;
    }
  }

  /**
   * Decode a JWT token without verification (client-side only)
   */
  decodeToken(token: string): DecodedToken | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      if (!payload) return null;

      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as DecodedToken;
    } catch {
      return null;
    }
  }

  /**
   * Get user role from the current token
   */
  getRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }

  /**
   * Get permissions from the current token
   */
  getPermissionsFromToken(): string[] {
    const token = this.getAccessToken();
    if (!token) return [];

    const decoded = this.decodeToken(token);
    return decoded?.permissions || [];
  }

  /**
   * Get user ID from the current token
   */
  getUserIdFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }

  /**
   * Check if we have valid tokens stored
   */
  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }
}
