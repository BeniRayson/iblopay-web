// src/app/modules/auth/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRoles = route.data['roles'] as string[] | undefined;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRole = this.authService.getUserRole();

    if (requiredRoles.includes(userRole)) {
      return true;
    }

    // Redirect to dashboard if user doesn't have the required role
    return this.router.createUrlTree([AUTH_CONSTANTS.DASHBOARD_ROUTE]);
  }
}
