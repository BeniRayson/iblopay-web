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
// src/app/modules/auth/interceptors/logging.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var LoggingInterceptor = function () {
    var _classDecorators = [Injectable()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoggingInterceptor = _classThis = /** @class */ (function () {
        function LoggingInterceptor_1() {
        }
        LoggingInterceptor_1.prototype.intercept = function (req, next) {
            var _this = this;
            var startTime = Date.now();
            return next.handle(req).pipe(tap({
                next: function (event) {
                    if (event instanceof HttpResponse) {
                        var duration = Date.now() - startTime;
                        console.log("%c[API] ".concat(req.method, " ").concat(req.urlWithParams, " \u2192 ").concat(event.status, " (").concat(duration, "ms)"), _this.getLogStyle(event.status));
                    }
                },
                error: function (error) {
                    var duration = Date.now() - startTime;
                    console.error("%c[API] ".concat(req.method, " ").concat(req.urlWithParams, " \u2192 ").concat(error.status, " (").concat(duration, "ms)"), 'color: #ff4444; font-weight: bold;');
                }
            }));
        };
        LoggingInterceptor_1.prototype.getLogStyle = function (status) {
            if (status >= 200 && status < 300) {
                return 'color: #00C853; font-weight: bold;';
            }
            if (status >= 300 && status < 400) {
                return 'color: #FF9800; font-weight: bold;';
            }
            return 'color: #ff4444; font-weight: bold;';
        };
        return LoggingInterceptor_1;
    }());
    __setFunctionName(_classThis, "LoggingInterceptor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoggingInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoggingInterceptor = _classThis;
}();
export { LoggingInterceptor };
//# sourceMappingURL=logging.interceptor.js.map