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
// src/app/modules/auth/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AUTH_CONSTANTS } from '../auth.constants';
var ErrorInterceptor = function () {
    var _classDecorators = [Injectable()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ErrorInterceptor = _classThis = /** @class */ (function () {
        function ErrorInterceptor_1(router) {
            this.router = router;
        }
        ErrorInterceptor_1.prototype.intercept = function (req, next) {
            return next.handle(req).pipe(catchError(function (error) {
                var _a, _b, _c, _d;
                var errorMessage = AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
                switch (error.status) {
                    case 0:
                        errorMessage = AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
                        break;
                    case 400:
                        errorMessage = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Requête invalide';
                        break;
                    case 401:
                        errorMessage = AUTH_CONSTANTS.MESSAGES.SESSION_EXPIRED;
                        break;
                    case 403:
                        errorMessage = AUTH_CONSTANTS.MESSAGES.UNAUTHORIZED;
                        break;
                    case 404:
                        errorMessage = 'Ressource introuvable';
                        break;
                    case 409:
                        errorMessage = ((_b = error.error) === null || _b === void 0 ? void 0 : _b.message) || 'Conflit de données';
                        break;
                    case 422:
                        errorMessage = ((_c = error.error) === null || _c === void 0 ? void 0 : _c.message) || 'Données de validation invalides';
                        break;
                    case 429:
                        errorMessage = 'Trop de tentatives. Veuillez patienter.';
                        break;
                    case 500:
                        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
                        break;
                    default:
                        errorMessage = ((_d = error.error) === null || _d === void 0 ? void 0 : _d.message) || AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
                }
                console.error("[HTTP Error ".concat(error.status, "]"), errorMessage, error);
                return throwError(function () { return (__assign(__assign({}, error), { userMessage: errorMessage })); });
            }));
        };
        return ErrorInterceptor_1;
    }());
    __setFunctionName(_classThis, "ErrorInterceptor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ErrorInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ErrorInterceptor = _classThis;
}();
export { ErrorInterceptor };
//# sourceMappingURL=error.interceptor.js.map