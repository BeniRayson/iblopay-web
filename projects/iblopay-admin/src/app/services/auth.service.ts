import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authenticated = false;
  private userRole = 'user';
  private permissions: string[] = [];

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  login(): void {
    this.authenticated = true;
  }

  logout(): void {
    this.authenticated = false;
  }

  getUserRole(): string {
    return this.userRole;
  }

  getUserPermissions(): string[] {
    return this.permissions;
  }
}
