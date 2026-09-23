import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
export declare class NoAuthGuard implements CanActivate {
    private authService;
    private router;
    constructor(authService: AuthService, router: Router);
    canActivate(): boolean | UrlTree;
}
//# sourceMappingURL=no-auth.guard.d.ts.map