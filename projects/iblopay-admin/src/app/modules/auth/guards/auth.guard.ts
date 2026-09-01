// src/app/modules/auth/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated() && !this.tokenService.isTokenExpired()) {
      return true;
    }

    // Clear any stale state
    this.authService.logout();
    return this.router.createUrlTree([AUTH_CONSTANTS.LOGIN_ROUTE]);
  }
}
