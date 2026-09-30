import { Injectable } from '@angular/core';
import { AUTH_CONSTANTS } from '../auth.constants';
import { TokenPair, DecodedToken } from '../models/token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {


  setTokens(tokens: TokenPair): void {
    localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, tokens.refresh_token);
  }


  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
  }


  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  }


  clearTokens(): void {
    localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  }


  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return false;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return false;
    }
  }


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


  getRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }


  getPermissionsFromToken(): string[] {
    const token = this.getAccessToken();
    if (!token) return [];

    const decoded = this.decodeToken(token);
    return decoded?.permissions || [];
  }


  getUserIdFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }


  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }
}
