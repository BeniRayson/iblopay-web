// src/app/modules/auth/services/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
describe('AuthService', function () {
    var service;
    var httpMock;
    var tokenService;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService, TokenService, SessionService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    });
    afterEach(function () {
        httpMock.verify();
        localStorage.clear();
        sessionStorage.clear();
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
    it('should not be authenticated initially', function () {
        expect(service.isAuthenticated()).toBeFalse();
    });
    it('should return null for current user when not logged in', function () {
        expect(service.getCurrentUser()).toBeNull();
    });
    describe('login', function () {
        it('should authenticate user on successful login', function () {
            var mockResponse = {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        user_id: '123',
                        first_name: 'John',
                        last_name: 'Doe',
                        phone_number: '+237699999999',
                        role_id: 'role-1',
                        role: { role_id: 'role-1', name: 'SYSTEM_ADMIN', is_default: false, created_at: '', updated_at: '' },
                        status: 'ACTIVE',
                        created_at: '2024-01-01',
                        updated_at: '2024-01-01'
                    },
                    tokens: {
                        access_token: 'test-access',
                        refresh_token: 'test-refresh',
                        expires_in: 3600,
                        token_type: 'Bearer'
                    }
                }
            };
            service.login({ phone_number: '+237699999999', pin: '1234' }).subscribe(function (response) {
                expect(response.success).toBeTrue();
                expect(service.isAuthenticated()).toBeTrue();
            });
            var req = httpMock.expectOne(function (req) { return req.url.includes('/auth/login'); });
            req.flush(mockResponse);
        });
    });
    describe('logout', function () {
        it('should clear auth state on logout', function () {
            service.logout();
            expect(service.isAuthenticated()).toBeFalse();
            expect(service.getCurrentUser()).toBeNull();
        });
    });
    describe('role checks', function () {
        it('should return empty string for role when not authenticated', function () {
            expect(service.getUserRole()).toBe('');
        });
        it('should return empty array for permissions when not authenticated', function () {
            expect(service.getUserPermissions()).toEqual([]);
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map