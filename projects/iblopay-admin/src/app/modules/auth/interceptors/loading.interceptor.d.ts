import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class LoadingInterceptor implements HttpInterceptor {
    private activeRequests;
    private isLoading$;
    readonly loading$: Observable<boolean>;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
//# sourceMappingURL=loading.interceptor.d.ts.map