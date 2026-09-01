// src/app/modules/auth/services/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, TokenService, SessionService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated initially', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return null for current user when not logged in', () => {
    expect(service.getCurrentUser()).toBeNull();
  });

  describe('login', () => {
    it('should authenticate user on successful login', () => {
      const mockResponse = {
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
            status: 'ACTIVE' as const,
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

      service.login({ phone_number: '+237699999999', pin: '1234' }).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(service.isAuthenticated()).toBeTrue();
      });

      const req = httpMock.expectOne(req => req.url.includes('/auth/login'));
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear auth state on logout', () => {
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  describe('role checks', () => {
    it('should return empty string for role when not authenticated', () => {
      expect(service.getUserRole()).toBe('');
    });

    it('should return empty array for permissions when not authenticated', () => {
      expect(service.getUserPermissions()).toEqual([]);
    });
  });
});
