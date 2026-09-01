// src/app/modules/auth/guards/permission.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Permission } from '../enums/permission.enum';
import { AUTH_CONSTANTS } from '../auth.constants';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredPermissions = route.data['permissions'] as Permission[] | undefined;

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Check if user has ANY of the required permissions
    if (this.authService.hasAnyPermission(requiredPermissions)) {
      return true;
    }

    return this.router.createUrlTree([AUTH_CONSTANTS.DASHBOARD_ROUTE]);
  }
}
