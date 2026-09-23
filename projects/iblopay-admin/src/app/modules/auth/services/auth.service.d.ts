import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, TwoFactorRequest } from '../models/login.model';
import { AuthResponse, OtpResponse, ResetPasswordResponse } from '../models/auth-response.model';
import { Permission } from '../enums/permission.enum';
export declare class AuthService {
    private http;
    private router;
    private tokenService;
    private sessionService;
    private currentUser$;
    private isAuthenticated$;
    readonly user$: Observable<User | null>;
    readonly authenticated$: Observable<boolean>;
    private storageKey;
    constructor(http: HttpClient, router: Router, tokenService: TokenService, sessionService: SessionService);
    private initMockUsers;
    private getMockUsers;
    private saveMockUsers;
    /**
     * Login with phone number and PIN (simulates 2FA redirect on success)
     */
    login(credentials: LoginRequest): Observable<AuthResponse>;
    /**
     * Verify two-factor authentication OTP
     */
    verifyTwoFactor(request: TwoFactorRequest): Observable<AuthResponse>;
    /**
     * Logout the current user
     */
    logout(): void;
    /**
     * Request OTP for forgot password
     */
    forgotPassword(request: ForgotPasswordRequest): Observable<OtpResponse>;
    /**
     * Reset PIN with OTP verification
     */
    resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;
    /**
     * Refresh the access token
     */
    refreshToken(): Observable<AuthResponse>;
    /**
     * Get all users (Admin + SystemAdmin)
     */
    getUsers(): Observable<User[]>;
    /**
     * Get a specific user by ID
     */
    getUserById(userId: string): Observable<User>;
    /**
     * Create a new user (SystemAdmin only)
     */
    createUser(userData: CreateUserRequest): Observable<User>;
    /**
     * Update an existing user
     */
    updateUser(userId: string, userData: UpdateUserRequest): Observable<User>;
    /**
     * Change user status (activate, suspend, freeze, close)
     */
    changeUserStatus(userId: string, status: string): Observable<User>;
    /**
     * Delete a user
     */
    deleteUser(userId: string): Observable<void>;
    getCurrentUser(): User | null;
    isAuthenticated(): boolean;
    getUserRole(): string;
    getUserPermissions(): string[];
    isSystemAdmin(): boolean;
    isAdmin(): boolean;
    hasPermission(permission: Permission): boolean;
    hasAnyPermission(permissions: Permission[]): boolean;
    hasAllPermissions(permissions: Permission[]): boolean;
    private initializeAuth;
    private setCurrentUser;
    private getStoredUser;
}
//# sourceMappingURL=auth.service.d.ts.map