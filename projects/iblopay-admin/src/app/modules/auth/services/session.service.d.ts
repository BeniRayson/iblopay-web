import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
export declare class SessionService {
    private tokenService;
    private router;
    private ngZone;
    private sessionTimer;
    private lastActivity;
    private sessionExpired$;
    readonly onSessionExpired: import("rxjs").Observable<void>;
    constructor(tokenService: TokenService, router: Router, ngZone: NgZone);
    /**
     * Start monitoring user activity for session timeout
     */
    startSessionMonitoring(): void;
    /**
     * Stop session monitoring (on logout)
     */
    stopSessionMonitoring(): void;
    /**
     * Reset the session timer on user activity
     */
    resetSession(): void;
    /**
     * Check if the session is still valid
     */
    isSessionValid(): boolean;
    /**
     * Get remaining session time in seconds
     */
    getRemainingTime(): number;
    /**
     * Store session data
     */
    setSessionData(data: Record<string, any>): void;
    /**
     * Get stored session data
     */
    getSessionData(): Record<string, any> | null;
    /**
     * Clear session data
     */
    clearSession(): void;
    private setupActivityListeners;
    private removeActivityListeners;
    private onActivity;
    private startSessionTimer;
    private clearSessionTimer;
    private handleSessionExpired;
}
//# sourceMappingURL=session.service.d.ts.map