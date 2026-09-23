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
// src/app/modules/auth/services/session.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AUTH_CONSTANTS } from '../auth.constants';
var SessionService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SessionService = _classThis = /** @class */ (function () {
        function SessionService_1(tokenService, router, ngZone) {
            var _this = this;
            this.tokenService = tokenService;
            this.router = router;
            this.ngZone = ngZone;
            this.lastActivity = Date.now();
            this.sessionExpired$ = new Subject();
            this.onSessionExpired = this.sessionExpired$.asObservable();
            this.onActivity = function () {
                _this.lastActivity = Date.now();
            };
        }
        /**
         * Start monitoring user activity for session timeout
         */
        SessionService_1.prototype.startSessionMonitoring = function () {
            this.lastActivity = Date.now();
            this.setupActivityListeners();
            this.startSessionTimer();
        };
        /**
         * Stop session monitoring (on logout)
         */
        SessionService_1.prototype.stopSessionMonitoring = function () {
            this.clearSessionTimer();
            this.removeActivityListeners();
        };
        /**
         * Reset the session timer on user activity
         */
        SessionService_1.prototype.resetSession = function () {
            this.lastActivity = Date.now();
        };
        /**
         * Check if the session is still valid
         */
        SessionService_1.prototype.isSessionValid = function () {
            if (!this.tokenService.hasTokens())
                return false;
            if (this.tokenService.isTokenExpired())
                return false;
            // const elapsed = (Date.now() - this.lastActivity) / 1000;
            return this.getRemainingTime() > 0;
        };
        /**
         * Get remaining session time in seconds
         */
        SessionService_1.prototype.getRemainingTime = function () {
            var elapsed = (Date.now() - this.lastActivity) / 1000;
            return Math.max(0, AUTH_CONSTANTS.SESSION_TIMEOUT - elapsed);
        };
        /**
         * Store session data
         */
        SessionService_1.prototype.setSessionData = function (data) {
            sessionStorage.setItem(AUTH_CONSTANTS.SESSION_KEY, JSON.stringify(data));
        };
        /**
         * Get stored session data
         */
        SessionService_1.prototype.getSessionData = function () {
            var data = sessionStorage.getItem(AUTH_CONSTANTS.SESSION_KEY);
            if (!data)
                return null;
            try {
                return JSON.parse(data);
            }
            catch (_a) {
                return null;
            }
        };
        /**
         * Clear session data
         */
        SessionService_1.prototype.clearSession = function () {
            sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_KEY);
            this.stopSessionMonitoring();
        };
        SessionService_1.prototype.setupActivityListeners = function () {
            var _this = this;
            var events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
            events.forEach(function (event) {
                document.addEventListener(event, _this.onActivity);
            });
        };
        SessionService_1.prototype.removeActivityListeners = function () {
            var _this = this;
            var events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
            events.forEach(function (event) {
                document.removeEventListener(event, _this.onActivity);
            });
        };
        SessionService_1.prototype.startSessionTimer = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(function () {
                _this.sessionTimer = setInterval(function () {
                    if (!_this.isSessionValid()) {
                        _this.ngZone.run(function () {
                            _this.handleSessionExpired();
                        });
                    }
                }, AUTH_CONSTANTS.SESSION_CHECK_INTERVAL * 1000);
            });
        };
        SessionService_1.prototype.clearSessionTimer = function () {
            if (this.sessionTimer) {
                clearInterval(this.sessionTimer);
                this.sessionTimer = null;
            }
        };
        SessionService_1.prototype.handleSessionExpired = function () {
            this.sessionExpired$.next();
            this.clearSession();
            this.tokenService.clearTokens();
            this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE], {
                queryParams: { expired: 'true' }
            });
        };
        return SessionService_1;
    }());
    __setFunctionName(_classThis, "SessionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionService = _classThis;
}();
export { SessionService };
//# sourceMappingURL=session.service.js.map