import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
export declare class PermissionGuard implements CanActivate {
    private authService;
    private router;
    constructor(authService: AuthService, router: Router);
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree;
}
//# sourceMappingURL=permission.guard.d.ts.map