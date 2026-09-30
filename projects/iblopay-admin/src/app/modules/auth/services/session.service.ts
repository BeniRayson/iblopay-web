import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AUTH_CONSTANTS } from '../auth.constants';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionTimer: any;
  private lastActivity: number = Date.now();
  private sessionExpired$ = new Subject<void>();

  readonly onSessionExpired = this.sessionExpired$.asObservable();

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private ngZone: NgZone
  ) {}


  startSessionMonitoring(): void {
    this.lastActivity = Date.now();
    this.setupActivityListeners();
    this.startSessionTimer();
  }


  stopSessionMonitoring(): void {
    this.clearSessionTimer();
    this.removeActivityListeners();
  }


  resetSession(): void {
    this.lastActivity = Date.now();
  }


  isSessionValid(): boolean {
    if (!this.tokenService.hasTokens()) return false;
    if (this.tokenService.isTokenExpired()) return false;

    return this.getRemainingTime() > 0;
  }


  getRemainingTime(): number {
    const elapsed = (Date.now() - this.lastActivity) / 1000;
    return Math.max(0, AUTH_CONSTANTS.SESSION_TIMEOUT - elapsed);
  }


  setSessionData(data: Record<string, any>): void {
    sessionStorage.setItem(AUTH_CONSTANTS.SESSION_KEY, JSON.stringify(data));
  }


  getSessionData(): Record<string, any> | null {
    const data = sessionStorage.getItem(AUTH_CONSTANTS.SESSION_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }


  clearSession(): void {
    sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_KEY);
    this.stopSessionMonitoring();
  }

  private setupActivityListeners(): void {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, this.onActivity);
    });
  }

  private removeActivityListeners(): void {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.removeEventListener(event, this.onActivity);
    });
  }

  private onActivity = (): void => {
    this.lastActivity = Date.now();
  };

  private startSessionTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.sessionTimer = setInterval(() => {
        if (!this.isSessionValid()) {
          this.ngZone.run(() => {
            this.handleSessionExpired();
          });
        }
      }, AUTH_CONSTANTS.SESSION_CHECK_INTERVAL * 1000);
    });
  }

  private clearSessionTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  private handleSessionExpired(): void {
    this.sessionExpired$.next();
    this.clearSession();
    this.tokenService.clearTokens();
    this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE], {
      queryParams: { expired: 'true' }
    });
  }
}
