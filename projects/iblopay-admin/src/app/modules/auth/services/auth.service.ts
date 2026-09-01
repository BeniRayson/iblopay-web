// src/app/modules/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, delay } from 'rxjs/operators';

import { AUTH_CONSTANTS } from '../auth.constants';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { User, CreateUserRequest, UpdateUserRequest, UserRole } from '../models/user.model';
import { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, TwoFactorRequest } from '../models/login.model';
import { AuthResponse, OtpResponse, ResetPasswordResponse } from '../models/auth-response.model';
import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permission.enum';

const MOCK_ROLES: UserRole[] = [
  {
    role_id: 'role-sys-admin',
    name: Role.SYSTEM_ADMIN,
    description: 'System Administrator with full access',
    is_default: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    role_id: 'role-admin',
    name: Role.ADMIN,
    description: 'Administrator with management access',
    is_default: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  readonly user$ = this.currentUser$.asObservable();
  readonly authenticated$ = this.isAuthenticated$.asObservable();

  private storageKey = 'iblopay_mock_users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private sessionService: SessionService
  ) {
    this.initMockUsers();
    this.initializeAuth();
  }

  // ─── Mock Database Initialization ────────────────────────
  private initMockUsers(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultUsers: (User & { pin: string })[] = [
        {
          user_id: 'user-sysadmin-1',
          first_name: 'System',
          last_name: 'Admin',
          phone_number: '+237600000000',
          email: 'system.admin@iblopay.com',
          cni_number: '1234567890',
          photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role_id: 'role-sys-admin',
          role: MOCK_ROLES[0]!,
          status: 'ACTIVE',
          permissions: Object.values(Permission),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          pin: '1111'
        },
        {
          user_id: 'user-admin-2',
          first_name: 'Normal',
          last_name: 'Admin',
          phone_number: '+237611111111',
          email: 'admin@iblopay.com',
          cni_number: '0987654321',
          photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          role_id: 'role-admin',
          role: MOCK_ROLES[1]!,
          status: 'ACTIVE',
          permissions: [
            Permission.USER_READ,
            Permission.DASHBOARD_VIEW
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          pin: '2222'
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
    }
  }

  private getMockUsers(): (User & { pin: string })[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveMockUsers(users: (User & { pin: string })[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // ─── Authentication ────────────────────────────────────────

  /**
   * Login with phone number and PIN (simulates 2FA redirect on success)
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    const users = this.getMockUsers();
    const cleanedPhone = credentials.phone_number.replace(/[\s-]/g, '');
    const user = users.find(u => u.phone_number.replace(/[\s-]/g, '') === cleanedPhone && u.pin === credentials.pin);

    if (!user) {
      return throwError(() => ({
        status: 401,
        error: { message: AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED }
      })).pipe(delay(800));
    }

    if (user.status !== 'ACTIVE') {
      return throwError(() => ({
        status: 403,
        error: { message: `Votre compte est actuellement ${user.status}.` }
      })).pipe(delay(800));
    }

    // Success: Simulate 2FA required by throwing a 403 with requires_2fa: true
    return throwError(() => ({
      status: 403,
      error: { requires_2fa: true }
    })).pipe(delay(1000));
  }

  /**
   * Verify two-factor authentication OTP
   */
  verifyTwoFactor(request: TwoFactorRequest): Observable<AuthResponse> {
    const users = this.getMockUsers();
    const cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
    const user = users.find(u => u.phone_number.replace(/[\s-]/g, '') === cleanedPhone);

    if (!user) {
      return throwError(() => ({
        status: 404,
        error: { message: 'Utilisateur introuvable.' }
      })).pipe(delay(800));
    }

    // Simulate OTP validation: any 6-digit OTP code works, or '123456' specifically
    if (request.otp_code.length !== 6) {
      return throwError(() => ({
        status: 400,
        error: { message: AUTH_CONSTANTS.MESSAGES.OTP_INVALID }
      })).pipe(delay(800));
    }

    const mockTokens = {
      access_token: 'mock-jwt-access-token-' + Math.random().toString(36).substring(2),
      refresh_token: 'mock-jwt-refresh-token-' + Math.random().toString(36).substring(2),
      expires_in: 3600,
      token_type: 'Bearer'
    };

    const response: AuthResponse = {
      success: true,
      message: AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
      data: {
        user: user,
        tokens: mockTokens
      }
    };

    return of(response).pipe(
      delay(1000),
      tap(res => {
        if (res.success && res.data) {
          this.tokenService.setTokens(res.data.tokens);
          this.setCurrentUser(res.data.user);
          this.sessionService.startSessionMonitoring();
        }
      })
    );
  }

  /**
   * Logout the current user
   */
  logout(): void {
    this.tokenService.clearTokens();
    this.sessionService.clearSession();
    this.currentUser$.next(null);
    this.isAuthenticated$.next(false);
    localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
    this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
  }

  /**
   * Request OTP for forgot password
   */
  forgotPassword(request: ForgotPasswordRequest): Observable<OtpResponse> {
    const users = this.getMockUsers();
    const cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
    const user = users.find(u => u.phone_number.replace(/[\s-]/g, '') === cleanedPhone);

    if (!user) {
      return throwError(() => ({
        status: 404,
        error: { message: "Ce numéro de téléphone n'est pas associé à un compte." }
      })).pipe(delay(1000));
    }

    const response: OtpResponse = {
      success: true,
      message: AUTH_CONSTANTS.MESSAGES.OTP_SENT,
      data: {
        otp_sent: true,
        expires_in: 300,
        phone_number: user.phone_number
      }
    };

    return of(response).pipe(delay(1000));
  }

  /**
   * Reset PIN with OTP verification
   */
  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    const users = this.getMockUsers();
    const cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
    const userIndex = users.findIndex(u => u.phone_number.replace(/[\s-]/g, '') === cleanedPhone);

    if (userIndex === -1) {
      return throwError(() => ({
        status: 404,
        error: { message: 'Utilisateur introuvable.' }
      })).pipe(delay(1000));
    }

    if (request.otp_code.length !== 6) {
      return throwError(() => ({
        status: 400,
        error: { message: AUTH_CONSTANTS.MESSAGES.OTP_INVALID }
      })).pipe(delay(800));
    }

    // Update PIN
    const targetUser = users[userIndex];
    if (targetUser) {
      targetUser.pin = request.new_pin;
      targetUser.updated_at = new Date().toISOString();
    }
    this.saveMockUsers(users);

    const response: ResetPasswordResponse = {
      success: true,
      message: AUTH_CONSTANTS.MESSAGES.PASSWORD_RESET_SUCCESS
    };

    return of(response).pipe(delay(1000));
  }

  /**
   * Refresh the access token
   */
  refreshToken(): Observable<AuthResponse> {
    const storedUser = this.getCurrentUser();
    if (!storedUser) {
      return throwError(() => new Error('No user logged in'));
    }

    const mockTokens = {
      access_token: 'mock-jwt-access-token-' + Math.random().toString(36).substring(2),
      refresh_token: 'mock-jwt-refresh-token-' + Math.random().toString(36).substring(2),
      expires_in: 3600,
      token_type: 'Bearer'
    };

    return of({
      success: true,
      message: 'Token refreshed',
      data: {
        user: storedUser,
        tokens: mockTokens
      }
    }).pipe(
      delay(500),
      tap(response => {
        if (response.success && response.data) {
          this.tokenService.setTokens(response.data.tokens);
        }
      })
    );
  }

  // ─── User Management (SystemAdmin only) ────────────────────

  /**
   * Get all users (Admin + SystemAdmin)
   */
  getUsers(): Observable<User[]> {
    const users = this.getMockUsers().map(({ pin, ...user }) => user);
    return of(users).pipe(delay(600));
  }

  /**
   * Get a specific user by ID
   */
  getUserById(userId: string): Observable<User> {
    const users = this.getMockUsers();
    const user = users.find(u => u.user_id === userId);
    if (!user) {
      return throwError(() => new Error('Utilisateur non trouvé')).pipe(delay(500));
    }
    const { pin, ...userWithoutPin } = user;
    return of(userWithoutPin).pipe(delay(500));
  }

  /**
   * Create a new user (SystemAdmin only)
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    const users = this.getMockUsers();
    
    // Check if phone number already exists
    const cleanedPhone = userData.phone_number.replace(/[\s-]/g, '');
    if (users.some(u => u.phone_number.replace(/[\s-]/g, '') === cleanedPhone)) {
      return throwError(() => ({
        status: 400,
        error: { message: 'Un utilisateur avec ce numéro de téléphone existe déjà.' }
      })).pipe(delay(600));
    }

    const role = MOCK_ROLES.find(r => r.role_id === userData.role_id) || MOCK_ROLES[1];
    
    const newUser = {
      user_id: 'user-' + Math.random().toString(36).substring(2, 11),
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      email: userData.email,
      cni_number: userData.cni_number,
      photo_url: userData.photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role_id: userData.role_id,
      role: role,
      status: userData.status || 'ACTIVE',
      permissions: role?.name === Role.SYSTEM_ADMIN ? Object.values(Permission) : [Permission.USER_READ, Permission.DASHBOARD_VIEW],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: this.getCurrentUser()?.user_id || 'user-sysadmin-1',
      pin: '1234' // Default PIN for new users
    } as any;

    users.push(newUser);
    this.saveMockUsers(users);

    const { pin, ...userWithoutPin } = newUser;
    return of(userWithoutPin as User).pipe(delay(800));
  }

  /**
   * Update an existing user
   */
  updateUser(userId: string, userData: UpdateUserRequest): Observable<User> {
    const users = this.getMockUsers();
    const idx = users.findIndex(u => u.user_id === userId);

    if (idx === -1) {
      return throwError(() => new Error('Utilisateur non trouvé')).pipe(delay(500));
    }

    const updatedUser: any = {
      ...users[idx],
      ...userData,
      updated_at: new Date().toISOString()
    };

    if (userData.role_id) {
      const role = MOCK_ROLES.find(r => r.role_id === userData.role_id);
      if (role) {
        updatedUser.role = role;
        updatedUser.permissions = role.name === Role.SYSTEM_ADMIN ? Object.values(Permission) : [Permission.USER_READ, Permission.DASHBOARD_VIEW];
      }
    }

    users[idx] = updatedUser;
    this.saveMockUsers(users);

    const { pin, ...userWithoutPin } = updatedUser;
    return of(userWithoutPin as User).pipe(delay(800));
  }

  /**
   * Change user status (activate, suspend, freeze, close)
   */
  changeUserStatus(userId: string, status: string): Observable<User> {
    return this.updateUser(userId, { status: status as any });
  }

  /**
   * Delete a user
   */
  deleteUser(userId: string): Observable<void> {
    const users = this.getMockUsers();
    const filtered = users.filter(u => u.user_id !== userId);

    if (filtered.length === users.length) {
      return throwError(() => new Error('Utilisateur non trouvé')).pipe(delay(500));
    }

    this.saveMockUsers(filtered);
    return of(undefined).pipe(delay(800));
  }

  // ─── State Accessors ───────────────────────────────────────

  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated$.value;
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role?.name || '';
  }

  getUserPermissions(): string[] {
    const user = this.getCurrentUser();
    return user?.permissions || [];
  }

  isSystemAdmin(): boolean {
    return this.getUserRole() === Role.SYSTEM_ADMIN;
  }

  isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  hasPermission(permission: Permission): boolean {
    return this.getUserPermissions().includes(permission);
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    const userPermissions = this.getUserPermissions();
    return permissions.some(p => userPermissions.includes(p));
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    const userPermissions = this.getUserPermissions();
    return permissions.every(p => userPermissions.includes(p));
  }

  // ─── Private Helpers ───────────────────────────────────────

  private initializeAuth(): void {
    if (this.tokenService.hasTokens()) {
      const storedUser = this.getStoredUser();
      if (storedUser) {
        this.currentUser$.next(storedUser);
        this.isAuthenticated$.next(true);
        this.sessionService.startSessionMonitoring();
      }
    }
  }

  private setCurrentUser(user: User): void {
    this.currentUser$.next(user);
    this.isAuthenticated$.next(true);
    localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(user));
  }

  private getStoredUser(): User | null {
    const data = localStorage.getItem(AUTH_CONSTANTS.USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  }
}
