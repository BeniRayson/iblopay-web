var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// src/app/modules/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AUTH_CONSTANTS } from '../auth.constants';
import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permission.enum';
var MOCK_ROLES = [
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
var AuthService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(http, router, tokenService, sessionService) {
            this.http = http;
            this.router = router;
            this.tokenService = tokenService;
            this.sessionService = sessionService;
            this.currentUser$ = new BehaviorSubject(null);
            this.isAuthenticated$ = new BehaviorSubject(false);
            this.user$ = this.currentUser$.asObservable();
            this.authenticated$ = this.isAuthenticated$.asObservable();
            this.storageKey = 'iblopay_mock_users';
            this.initMockUsers();
            this.initializeAuth();
        }
        // ─── Mock Database Initialization ────────────────────────
        AuthService_1.prototype.initMockUsers = function () {
            if (!localStorage.getItem(this.storageKey)) {
                var defaultUsers = [
                    {
                        user_id: 'user-sysadmin-1',
                        first_name: 'System',
                        last_name: 'Admin',
                        phone_number: '+237600000000',
                        email: 'system.admin@iblopay.com',
                        cni_number: '1234567890',
                        photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                        role_id: 'role-sys-admin',
                        role: MOCK_ROLES[0],
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
                        role: MOCK_ROLES[1],
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
        };
        AuthService_1.prototype.getMockUsers = function () {
            var data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        };
        AuthService_1.prototype.saveMockUsers = function (users) {
            localStorage.setItem(this.storageKey, JSON.stringify(users));
        };
        // ─── Authentication ────────────────────────────────────────
        /**
         * Login with phone number and PIN (simulates 2FA redirect on success)
         */
        AuthService_1.prototype.login = function (credentials) {
            var users = this.getMockUsers();
            var cleanedPhone = credentials.phone_number.replace(/[\s-]/g, '');
            var user = users.find(function (u) { return u.phone_number.replace(/[\s-]/g, '') === cleanedPhone && u.pin === credentials.pin; });
            if (!user) {
                return throwError(function () { return ({
                    status: 401,
                    error: { message: AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED }
                }); }).pipe(delay(800));
            }
            if (user.status !== 'ACTIVE') {
                return throwError(function () { return ({
                    status: 403,
                    error: { message: "Votre compte est actuellement ".concat(user.status, ".") }
                }); }).pipe(delay(800));
            }
            // Success: Simulate 2FA required by throwing a 403 with requires_2fa: true
            return throwError(function () { return ({
                status: 403,
                error: { requires_2fa: true }
            }); }).pipe(delay(1000));
        };
        /**
         * Verify two-factor authentication OTP
         */
        AuthService_1.prototype.verifyTwoFactor = function (request) {
            var _this = this;
            var users = this.getMockUsers();
            var cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
            var user = users.find(function (u) { return u.phone_number.replace(/[\s-]/g, '') === cleanedPhone; });
            if (!user) {
                return throwError(function () { return ({
                    status: 404,
                    error: { message: 'Utilisateur introuvable.' }
                }); }).pipe(delay(800));
            }
            // Simulate OTP validation: any 6-digit OTP code works, or '123456' specifically
            if (request.otp_code.length !== 6) {
                return throwError(function () { return ({
                    status: 400,
                    error: { message: AUTH_CONSTANTS.MESSAGES.OTP_INVALID }
                }); }).pipe(delay(800));
            }
            var mockTokens = {
                access_token: 'mock-jwt-access-token-' + Math.random().toString(36).substring(2),
                refresh_token: 'mock-jwt-refresh-token-' + Math.random().toString(36).substring(2),
                expires_in: 3600,
                token_type: 'Bearer'
            };
            var response = {
                success: true,
                message: AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
                data: {
                    user: user,
                    tokens: mockTokens
                }
            };
            return of(response).pipe(delay(1000), tap(function (res) {
                if (res.success && res.data) {
                    _this.tokenService.setTokens(res.data.tokens);
                    _this.setCurrentUser(res.data.user);
                    _this.sessionService.startSessionMonitoring();
                }
            }));
        };
        /**
         * Logout the current user
         */
        AuthService_1.prototype.logout = function () {
            this.tokenService.clearTokens();
            this.sessionService.clearSession();
            this.currentUser$.next(null);
            this.isAuthenticated$.next(false);
            localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
            this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
        };
        /**
         * Request OTP for forgot password
         */
        AuthService_1.prototype.forgotPassword = function (request) {
            var users = this.getMockUsers();
            var cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
            var user = users.find(function (u) { return u.phone_number.replace(/[\s-]/g, '') === cleanedPhone; });
            if (!user) {
                return throwError(function () { return ({
                    status: 404,
                    error: { message: "Ce numéro de téléphone n'est pas associé à un compte." }
                }); }).pipe(delay(1000));
            }
            var response = {
                success: true,
                message: AUTH_CONSTANTS.MESSAGES.OTP_SENT,
                data: {
                    otp_sent: true,
                    expires_in: 300,
                    phone_number: user.phone_number
                }
            };
            return of(response).pipe(delay(1000));
        };
        /**
         * Reset PIN with OTP verification
         */
        AuthService_1.prototype.resetPassword = function (request) {
            var users = this.getMockUsers();
            var cleanedPhone = request.phone_number.replace(/[\s-]/g, '');
            var userIndex = users.findIndex(function (u) { return u.phone_number.replace(/[\s-]/g, '') === cleanedPhone; });
            if (userIndex === -1) {
                return throwError(function () { return ({
                    status: 404,
                    error: { message: 'Utilisateur introuvable.' }
                }); }).pipe(delay(1000));
            }
            if (request.otp_code.length !== 6) {
                return throwError(function () { return ({
                    status: 400,
                    error: { message: AUTH_CONSTANTS.MESSAGES.OTP_INVALID }
                }); }).pipe(delay(800));
            }
            // Update PIN
            var targetUser = users[userIndex];
            if (targetUser) {
                targetUser.pin = request.new_pin;
                targetUser.updated_at = new Date().toISOString();
            }
            this.saveMockUsers(users);
            var response = {
                success: true,
                message: AUTH_CONSTANTS.MESSAGES.PASSWORD_RESET_SUCCESS
            };
            return of(response).pipe(delay(1000));
        };
        /**
         * Refresh the access token
         */
        AuthService_1.prototype.refreshToken = function () {
            var _this = this;
            var storedUser = this.getCurrentUser();
            if (!storedUser) {
                return throwError(function () { return new Error('No user logged in'); });
            }
            var mockTokens = {
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
            }).pipe(delay(500), tap(function (response) {
                if (response.success && response.data) {
                    _this.tokenService.setTokens(response.data.tokens);
                }
            }));
        };
        // ─── User Management (SystemAdmin only) ────────────────────
        /**
         * Get all users (Admin + SystemAdmin)
         */
        AuthService_1.prototype.getUsers = function () {
            var users = this.getMockUsers().map(function (_a) {
                var pin = _a.pin, user = __rest(_a, ["pin"]);
                return user;
            });
            return of(users).pipe(delay(600));
        };
        /**
         * Get a specific user by ID
         */
        AuthService_1.prototype.getUserById = function (userId) {
            var users = this.getMockUsers();
            var user = users.find(function (u) { return u.user_id === userId; });
            if (!user) {
                return throwError(function () { return new Error('Utilisateur non trouvé'); }).pipe(delay(500));
            }
            var pin = user.pin, userWithoutPin = __rest(user, ["pin"]);
            return of(userWithoutPin).pipe(delay(500));
        };
        /**
         * Create a new user (SystemAdmin only)
         */
        AuthService_1.prototype.createUser = function (userData) {
            var _a;
            var users = this.getMockUsers();
            // Check if phone number already exists
            var cleanedPhone = userData.phone_number.replace(/[\s-]/g, '');
            if (users.some(function (u) { return u.phone_number.replace(/[\s-]/g, '') === cleanedPhone; })) {
                return throwError(function () { return ({
                    status: 400,
                    error: { message: 'Un utilisateur avec ce numéro de téléphone existe déjà.' }
                }); }).pipe(delay(600));
            }
            var role = MOCK_ROLES.find(function (r) { return r.role_id === userData.role_id; }) || MOCK_ROLES[1];
            var newUser = {
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
                permissions: (role === null || role === void 0 ? void 0 : role.name) === Role.SYSTEM_ADMIN ? Object.values(Permission) : [Permission.USER_READ, Permission.DASHBOARD_VIEW],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: ((_a = this.getCurrentUser()) === null || _a === void 0 ? void 0 : _a.user_id) || 'user-sysadmin-1',
                pin: '1234' // Default PIN for new users
            };
            users.push(newUser);
            this.saveMockUsers(users);
            var pin = newUser.pin, userWithoutPin = __rest(newUser, ["pin"]);
            return of(userWithoutPin).pipe(delay(800));
        };
        /**
         * Update an existing user
         */
        AuthService_1.prototype.updateUser = function (userId, userData) {
            var users = this.getMockUsers();
            var idx = users.findIndex(function (u) { return u.user_id === userId; });
            if (idx === -1) {
                return throwError(function () { return new Error('Utilisateur non trouvé'); }).pipe(delay(500));
            }
            var updatedUser = __assign(__assign(__assign({}, users[idx]), userData), { updated_at: new Date().toISOString() });
            if (userData.role_id) {
                var role = MOCK_ROLES.find(function (r) { return r.role_id === userData.role_id; });
                if (role) {
                    updatedUser.role = role;
                    updatedUser.permissions = role.name === Role.SYSTEM_ADMIN ? Object.values(Permission) : [Permission.USER_READ, Permission.DASHBOARD_VIEW];
                }
            }
            users[idx] = updatedUser;
            this.saveMockUsers(users);
            var pin = updatedUser.pin, userWithoutPin = __rest(updatedUser, ["pin"]);
            return of(userWithoutPin).pipe(delay(800));
        };
        /**
         * Change user status (activate, suspend, freeze, close)
         */
        AuthService_1.prototype.changeUserStatus = function (userId, status) {
            return this.updateUser(userId, { status: status });
        };
        /**
         * Delete a user
         */
        AuthService_1.prototype.deleteUser = function (userId) {
            var users = this.getMockUsers();
            var filtered = users.filter(function (u) { return u.user_id !== userId; });
            if (filtered.length === users.length) {
                return throwError(function () { return new Error('Utilisateur non trouvé'); }).pipe(delay(500));
            }
            this.saveMockUsers(filtered);
            return of(undefined).pipe(delay(800));
        };
        // ─── State Accessors ───────────────────────────────────────
        AuthService_1.prototype.getCurrentUser = function () {
            return this.currentUser$.value;
        };
        AuthService_1.prototype.isAuthenticated = function () {
            return this.isAuthenticated$.value;
        };
        AuthService_1.prototype.getUserRole = function () {
            var _a;
            var user = this.getCurrentUser();
            return ((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.name) || '';
        };
        AuthService_1.prototype.getUserPermissions = function () {
            var user = this.getCurrentUser();
            return (user === null || user === void 0 ? void 0 : user.permissions) || [];
        };
        AuthService_1.prototype.isSystemAdmin = function () {
            return this.getUserRole() === Role.SYSTEM_ADMIN;
        };
        AuthService_1.prototype.isAdmin = function () {
            return this.getUserRole() === Role.ADMIN;
        };
        AuthService_1.prototype.hasPermission = function (permission) {
            return this.getUserPermissions().includes(permission);
        };
        AuthService_1.prototype.hasAnyPermission = function (permissions) {
            var userPermissions = this.getUserPermissions();
            return permissions.some(function (p) { return userPermissions.includes(p); });
        };
        AuthService_1.prototype.hasAllPermissions = function (permissions) {
            var userPermissions = this.getUserPermissions();
            return permissions.every(function (p) { return userPermissions.includes(p); });
        };
        // ─── Private Helpers ───────────────────────────────────────
        AuthService_1.prototype.initializeAuth = function () {
            if (this.tokenService.hasTokens()) {
                var storedUser = this.getStoredUser();
                if (storedUser) {
                    this.currentUser$.next(storedUser);
                    this.isAuthenticated$.next(true);
                    this.sessionService.startSessionMonitoring();
                }
            }
        };
        AuthService_1.prototype.setCurrentUser = function (user) {
            this.currentUser$.next(user);
            this.isAuthenticated$.next(true);
            localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(user));
        };
        AuthService_1.prototype.getStoredUser = function () {
            var data = localStorage.getItem(AUTH_CONSTANTS.USER_KEY);
            if (!data)
                return null;
            try {
                return JSON.parse(data);
            }
            catch (_a) {
                return null;
            }
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
export { AuthService };
//# sourceMappingURL=auth.service.js.map