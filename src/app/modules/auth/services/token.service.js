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
// src/app/modules/auth/services/token.service.ts
import { Injectable } from '@angular/core';
import { AUTH_CONSTANTS } from '../auth.constants';
var TokenService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TokenService = _classThis = /** @class */ (function () {
        function TokenService_1() {
        }
        /**
         * Store token pair in localStorage
         */
        TokenService_1.prototype.setTokens = function (tokens) {
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, tokens.access_token);
            localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, tokens.refresh_token);
        };
        /**
         * Get the current access token
         */
        TokenService_1.prototype.getAccessToken = function () {
            return localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
        };
        /**
         * Get the current refresh token
         */
        TokenService_1.prototype.getRefreshToken = function () {
            return localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
        };
        /**
         * Remove all tokens
         */
        TokenService_1.prototype.clearTokens = function () {
            localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
            localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
        };
        /**
         * Check if the access token is expired
         */
        TokenService_1.prototype.isTokenExpired = function () {
            var token = this.getAccessToken();
            if (!token)
                return true;
            try {
                var decoded = this.decodeToken(token);
                // For mock tokens (non-JWT), decoded will be null.
                // In that case, consider the token valid if it exists.
                if (!decoded)
                    return false;
                var now = Math.floor(Date.now() / 1000);
                return decoded.exp < now;
            }
            catch (_a) {
                return false;
            }
        };
        /**
         * Check if the token needs refreshing (within threshold of expiry)
         */
        TokenService_1.prototype.shouldRefreshToken = function () {
            var token = this.getAccessToken();
            if (!token)
                return false;
            try {
                var decoded = this.decodeToken(token);
                if (!decoded)
                    return false;
                var now = Math.floor(Date.now() / 1000);
                return (decoded.exp - now) < AUTH_CONSTANTS.TOKEN_REFRESH_THRESHOLD;
            }
            catch (_a) {
                return false;
            }
        };
        /**
         * Decode a JWT token without verification (client-side only)
         */
        TokenService_1.prototype.decodeToken = function (token) {
            try {
                var parts = token.split('.');
                if (parts.length !== 3)
                    return null;
                var payload = parts[1];
                if (!payload)
                    return null;
                var decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
                return JSON.parse(decoded);
            }
            catch (_a) {
                return null;
            }
        };
        /**
         * Get user role from the current token
         */
        TokenService_1.prototype.getRoleFromToken = function () {
            var token = this.getAccessToken();
            if (!token)
                return null;
            var decoded = this.decodeToken(token);
            return (decoded === null || decoded === void 0 ? void 0 : decoded.role) || null;
        };
        /**
         * Get permissions from the current token
         */
        TokenService_1.prototype.getPermissionsFromToken = function () {
            var token = this.getAccessToken();
            if (!token)
                return [];
            var decoded = this.decodeToken(token);
            return (decoded === null || decoded === void 0 ? void 0 : decoded.permissions) || [];
        };
        /**
         * Get user ID from the current token
         */
        TokenService_1.prototype.getUserIdFromToken = function () {
            var token = this.getAccessToken();
            if (!token)
                return null;
            var decoded = this.decodeToken(token);
            return (decoded === null || decoded === void 0 ? void 0 : decoded.sub) || null;
        };
        /**
         * Check if we have valid tokens stored
         */
        TokenService_1.prototype.hasTokens = function () {
            return !!this.getAccessToken() && !!this.getRefreshToken();
        };
        return TokenService_1;
    }());
    __setFunctionName(_classThis, "TokenService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TokenService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TokenService = _classThis;
}();
export { TokenService };
//# sourceMappingURL=token.service.js.map