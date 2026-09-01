// src/app/modules/auth/guards/no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // If user is already authenticated, redirect to dashboard
    if (this.authService.isAuthenticated()) {
      return this.router.createUrlTree([AUTH_CONSTANTS.DASHBOARD_ROUTE]);
    }
    return true;
  }
}
