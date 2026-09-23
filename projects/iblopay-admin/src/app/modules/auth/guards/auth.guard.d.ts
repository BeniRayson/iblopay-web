import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
export declare class AuthGuard implements CanActivate {
    private authService;
    private tokenService;
    private router;
    constructor(authService: AuthService, tokenService: TokenService, router: Router);
    canActivate(): boolean | UrlTree;
}
//# sourceMappingURL=auth.guard.d.ts.map