import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  delay,
  tap
} from 'rxjs/operators';

import { AUTH_CONSTANTS } from '../auth.constants';
import { TokenService } from './token.service';
import { SessionService } from './session.service';

import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserRole
} from '../models/user.model';

import {
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  TwoFactorRequest
} from '../models/login.model';

import {
  AuthResponse,
  OtpResponse,
  ResetPasswordResponse
} from '../models/auth-response.model';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ =
    new BehaviorSubject<User | null>(null);

  private isAuthenticated$ =
    new BehaviorSubject<boolean>(false);

  readonly user$ =
    this.currentUser$.asObservable();

  readonly authenticated$ =
    this.isAuthenticated$.asObservable();

  private storageKey =
    'iblopay_mock_users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private sessionService: SessionService
  ) {
    this.initMockUsers();
    this.initializeAuth();
  }

  private initMockUsers(): void {

    const defaultUsers: (User & { pin: string })[] = [
      {
        user_id: 'user-sysadmin-1',
        first_name: 'Admin',
        last_name: 'Principal',
        phone_number: '79001002',
        email: 'admin1@iblopay.bi',
        cni_number: 'ADMIN001',
        photo_url: '',
        role_id: 'role-sys-admin',
        role: MOCK_ROLES[0]!,
        status: 'ACTIVE',
        permissions: Object.values(Permission),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        pin: '12345'
      },
      {
        user_id: 'user-admin-2',
        first_name: 'Admin',
        last_name: 'Secondaire',
        phone_number: '79001003',
        email: 'admin2@iblopay.bi',
        cni_number: 'ADMIN002',
        photo_url: '',
        role_id: 'role-admin',
        role: MOCK_ROLES[1]!,
        status: 'ACTIVE',
        permissions: [
          Permission.USER_READ,
          Permission.DASHBOARD_VIEW
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        pin: '12345'
      }
    ];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(defaultUsers)
    );
  }

  private getMockUsers(): (User & { pin: string })[] {

    const data =
      localStorage.getItem(this.storageKey);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as (User & { pin: string })[];
    } catch {
      return [];
    }
  }

  private saveMockUsers(
    users: (User & { pin: string })[]
  ): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(users)
    );
  }

  login(
    credentials: LoginRequest
  ): Observable<AuthResponse> {

    const users =
      this.getMockUsers();

    const cleanedPhone =
      credentials.phone_number
        .replace(/[\s-]/g, '');

    const cleanedPin =
      String(credentials.pin).trim();

    const user =
      users.find(
        item =>
          item.phone_number
            .replace(/[\s-]/g, '') === cleanedPhone &&
          String(item.pin).trim() === cleanedPin
      );

    if (!user) {

      return throwError(() => ({
        status: 401,
        error: {
          message:
            AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED
        }
      })).pipe(
        delay(600)
      );
    }

    if (user.status !== 'ACTIVE') {

      return throwError(() => ({
        status: 403,
        error: {
          message:
            `Votre compte est actuellement ${user.status}.`
        }
      })).pipe(
        delay(600)
      );
    }

    const mockTokens = {
      access_token:
        'mock-jwt-access-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      refresh_token:
        'mock-jwt-refresh-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      expires_in: 3600,

      token_type: 'Bearer'
    };

    const response: AuthResponse = {
      success: true,
      message:
        AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
      data: {
        user,
        tokens: mockTokens
      }
    };

    return of(response).pipe(
      delay(600),
      tap(res => {

        if (
          res.success &&
          res.data
        ) {

          this.tokenService.setTokens(
            res.data.tokens
          );

          this.setCurrentUser(
            res.data.user
          );

          this.sessionService
            .startSessionMonitoring();
        }
      })
    );
  }

  verifyTwoFactor(
    request: TwoFactorRequest
  ): Observable<AuthResponse> {

    const users =
      this.getMockUsers();

    const cleanedPhone =
      request.phone_number
        .replace(/[\s-]/g, '');

    const user =
      users.find(
        item =>
          item.phone_number
            .replace(/[\s-]/g, '') === cleanedPhone
      );

    if (!user) {

      return throwError(() => ({
        status: 404,
        error: {
          message:
            'Utilisateur introuvable.'
        }
      })).pipe(
        delay(800)
      );
    }

    if (
      request.otp_code.length !== 6
    ) {

      return throwError(() => ({
        status: 400,
        error: {
          message:
            AUTH_CONSTANTS.MESSAGES.OTP_INVALID
        }
      })).pipe(
        delay(800)
      );
    }

    const mockTokens = {
      access_token:
        'mock-jwt-access-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      refresh_token:
        'mock-jwt-refresh-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      expires_in: 3600,

      token_type: 'Bearer'
    };

    const response: AuthResponse = {
      success: true,
      message:
        AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
      data: {
        user,
        tokens: mockTokens
      }
    };

    return of(response).pipe(
      delay(800),
      tap(res => {

        if (
          res.success &&
          res.data
        ) {

          this.tokenService.setTokens(
            res.data.tokens
          );

          this.setCurrentUser(
            res.data.user
          );

          this.sessionService
            .startSessionMonitoring();
        }
      })
    );
  }

  logout(): void {

    this.tokenService
      .clearTokens();

    this.sessionService
      .clearSession();

    this.currentUser$
      .next(null);

    this.isAuthenticated$
      .next(false);

    localStorage.removeItem(
      AUTH_CONSTANTS.USER_KEY
    );

    this.router.navigate([
      AUTH_CONSTANTS.LOGIN_ROUTE
    ]);
  }

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<OtpResponse> {

    const users =
      this.getMockUsers();

    const cleanedPhone =
      request.phone_number
        .replace(/[\s-]/g, '');

    const user =
      users.find(
        item =>
          item.phone_number
            .replace(/[\s-]/g, '') === cleanedPhone
      );

    if (!user) {

      return throwError(() => ({
        status: 404,
        error: {
          message:
            "Ce numéro de téléphone n'est pas associé à un compte."
        }
      })).pipe(
        delay(800)
      );
    }

    const response: OtpResponse = {
      success: true,
      message:
        AUTH_CONSTANTS.MESSAGES.OTP_SENT,
      data: {
        otp_sent: true,
        expires_in: 300,
        phone_number:
          user.phone_number
      }
    };

    return of(response).pipe(
      delay(800)
    );
  }

  resetPassword(
    request: ResetPasswordRequest
  ): Observable<ResetPasswordResponse> {

    const users =
      this.getMockUsers();

    const cleanedPhone =
      request.phone_number
        .replace(/[\s-]/g, '');

    const userIndex =
      users.findIndex(
        item =>
          item.phone_number
            .replace(/[\s-]/g, '') === cleanedPhone
      );

    if (userIndex === -1) {

      return throwError(() => ({
        status: 404,
        error: {
          message:
            'Utilisateur introuvable.'
        }
      })).pipe(
        delay(800)
      );
    }

    if (
      request.otp_code.length !== 6
    ) {

      return throwError(() => ({
        status: 400,
        error: {
          message:
            AUTH_CONSTANTS.MESSAGES.OTP_INVALID
        }
      })).pipe(
        delay(800)
      );
    }

    const targetUser =
      users[userIndex];

    if (targetUser) {

      targetUser.pin =
        request.new_pin;

      targetUser.updated_at =
        new Date().toISOString();
    }

    this.saveMockUsers(users);

    const response:
      ResetPasswordResponse = {
        success: true,
        message:
          AUTH_CONSTANTS
            .MESSAGES
            .PASSWORD_RESET_SUCCESS
      };

    return of(response).pipe(
      delay(800)
    );
  }

  refreshToken():
    Observable<AuthResponse> {

    const storedUser =
      this.getCurrentUser();

    if (!storedUser) {

      return throwError(
        () =>
          new Error(
            'No user logged in'
          )
      );
    }

    const mockTokens = {
      access_token:
        'mock-jwt-access-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      refresh_token:
        'mock-jwt-refresh-token-' +
        Math.random()
          .toString(36)
          .substring(2),

      expires_in: 3600,

      token_type: 'Bearer'
    };

    const response: AuthResponse = {
      success: true,
      message:
        'Token refreshed',
      data: {
        user: storedUser,
        tokens: mockTokens
      }
    };

    return of(response).pipe(
      delay(500),
      tap(res => {

        if (
          res.success &&
          res.data
        ) {

          this.tokenService.setTokens(
            res.data.tokens
          );
        }
      })
    );
  }

  getUsers():
    Observable<User[]> {

    const users =
      this.getMockUsers()
        .map(user => {

          const {
            pin,
            ...userWithoutPin
          } = user;

          return userWithoutPin;
        });

    return of(users).pipe(
      delay(500)
    );
  }

  getUserById(
    userId: string
  ): Observable<User> {

    const users =
      this.getMockUsers();

    const user =
      users.find(
        item =>
          item.user_id === userId
      );

    if (!user) {

      return throwError(
        () =>
          new Error(
            'Utilisateur non trouvé'
          )
      ).pipe(
        delay(500)
      );
    }

    const {
      pin,
      ...userWithoutPin
    } = user;

    return of(
      userWithoutPin
    ).pipe(
      delay(500)
    );
  }

  createUser(
    userData: CreateUserRequest
  ): Observable<User> {

    const users =
      this.getMockUsers();

    const cleanedPhone =
      userData.phone_number
        .replace(/[\s-]/g, '');

    const alreadyExists =
      users.some(
        item =>
          item.phone_number
            .replace(/[\s-]/g, '') === cleanedPhone
      );

    if (alreadyExists) {

      return throwError(() => ({
        status: 400,
        error: {
          message:
            'Un utilisateur avec ce numéro de téléphone existe déjà.'
        }
      })).pipe(
        delay(600)
      );
    }

    const role =
      MOCK_ROLES.find(
        item =>
          item.role_id === userData.role_id
      ) || MOCK_ROLES[1]!;

    const permissions =
      role.name === Role.SYSTEM_ADMIN
        ? Object.values(Permission)
        : [
            Permission.USER_READ,
            Permission.DASHBOARD_VIEW
          ];

    const newUser:
      User & { pin: string } = {

      user_id:
        'user-' +
        Math.random()
          .toString(36)
          .substring(2, 11),

      first_name:
        userData.first_name,

      last_name:
        userData.last_name,

      phone_number:
        userData.phone_number,

      email:
        userData.email,

      cni_number:
        userData.cni_number,

      photo_url:
        userData.photo_url || '',

      role_id:
        userData.role_id,

      role,

      status:
        userData.status || 'ACTIVE',

      permissions,

      created_at:
        new Date().toISOString(),

      updated_at:
        new Date().toISOString(),

      created_by:
        this.getCurrentUser()
          ?.user_id ||
        'user-sysadmin-1',

      pin:
        '12345'
    };

    users.push(newUser);

    this.saveMockUsers(users);

    const {
      pin,
      ...userWithoutPin
    } = newUser;

    return of(
      userWithoutPin
    ).pipe(
      delay(700)
    );
  }

  updateUser(
    userId: string,
    userData: UpdateUserRequest
  ): Observable<User> {

    const users =
      this.getMockUsers();

    const index =
      users.findIndex(
        item =>
          item.user_id === userId
      );

    if (index === -1) {

      return throwError(
        () =>
          new Error(
            'Utilisateur non trouvé'
          )
      ).pipe(
        delay(500)
      );
    }

    const currentUser =
      users[index];

    if (!currentUser) {

      return throwError(
        () =>
          new Error(
            'Utilisateur non trouvé'
          )
      );
    }

    const updatedUser:
      User & { pin: string } = {
        ...currentUser,
        ...userData,
        updated_at:
          new Date().toISOString()
      };

    if (userData.role_id) {

      const role =
        MOCK_ROLES.find(
          item =>
            item.role_id ===
            userData.role_id
        );

      if (role) {

        updatedUser.role =
          role;

        updatedUser.permissions =
          role.name ===
          Role.SYSTEM_ADMIN
            ? Object.values(
                Permission
              )
            : [
                Permission.USER_READ,
                Permission.DASHBOARD_VIEW
              ];
      }
    }

    users[index] =
      updatedUser;

    this.saveMockUsers(users);

    const {
      pin,
      ...userWithoutPin
    } = updatedUser;

    return of(
      userWithoutPin
    ).pipe(
      delay(700)
    );
  }

  changeUserStatus(
    userId: string,
    status: string
  ): Observable<User> {

    return this.updateUser(
      userId,
      {
        status: status as any
      }
    );
  }

  deleteUser(
    userId: string
  ): Observable<void> {

    const users =
      this.getMockUsers();

    const filtered =
      users.filter(
        item =>
          item.user_id !== userId
      );

    if (
      filtered.length ===
      users.length
    ) {

      return throwError(
        () =>
          new Error(
            'Utilisateur non trouvé'
          )
      ).pipe(
        delay(500)
      );
    }

    this.saveMockUsers(
      filtered
    );

    return of(
      undefined
    ).pipe(
      delay(700)
    );
  }

  getCurrentUser():
    User | null {

    return this.currentUser$
      .value;
  }

  isAuthenticated():
    boolean {

    return this.isAuthenticated$
      .value;
  }

  getUserRole():
    string {

    const user =
      this.getCurrentUser();

    return user?.role?.name || '';
  }

  getUserPermissions():
    string[] {

    const user =
      this.getCurrentUser();

    return user?.permissions || [];
  }

  isSystemAdmin():
    boolean {

    return (
      this.getUserRole() ===
      Role.SYSTEM_ADMIN
    );
  }

  isAdmin():
    boolean {

    return (
      this.getUserRole() ===
      Role.ADMIN
    );
  }

  hasPermission(
    permission: Permission
  ): boolean {

    return this
      .getUserPermissions()
      .includes(permission);
  }

  hasAnyPermission(
    permissions: Permission[]
  ): boolean {

    const userPermissions =
      this.getUserPermissions();

    return permissions.some(
      permission =>
        userPermissions.includes(
          permission
        )
    );
  }

  hasAllPermissions(
    permissions: Permission[]
  ): boolean {

    const userPermissions =
      this.getUserPermissions();

    return permissions.every(
      permission =>
        userPermissions.includes(
          permission
        )
    );
  }

  private initializeAuth(): void {

    if (
      !this.tokenService.hasTokens()
    ) {
      return;
    }

    const storedUser =
      this.getStoredUser();

    if (!storedUser) {
      return;
    }

    this.currentUser$
      .next(storedUser);

    this.isAuthenticated$
      .next(true);

    this.sessionService
      .startSessionMonitoring();
  }

  private setCurrentUser(
    user: User
  ): void {

    this.currentUser$
      .next(user);

    this.isAuthenticated$
      .next(true);

    localStorage.setItem(
      AUTH_CONSTANTS.USER_KEY,
      JSON.stringify(user)
    );
  }

  private getStoredUser():
    User | null {

    const data =
      localStorage.getItem(
        AUTH_CONSTANTS.USER_KEY
      );

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  }
}