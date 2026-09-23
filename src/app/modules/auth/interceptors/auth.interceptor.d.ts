import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
export declare class AuthInterceptor implements HttpInterceptor {
    private tokenService;
    private authService;
    private isRefreshing;
    private refreshTokenSubject;
    constructor(tokenService: TokenService, authService: AuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private addToken;
    private handleTokenRefresh;
    private isAuthEndpoint;
}
//# sourceMappingURL=auth.interceptor.d.ts.map