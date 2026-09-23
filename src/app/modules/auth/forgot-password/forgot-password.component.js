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
// src/app/modules/auth/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_CONSTANTS } from '../auth.constants';
import { phoneValidator } from '../validators/email.validator';
var ForgotPasswordComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-forgot-password',
            standalone: true,
            imports: [CommonModule, ReactiveFormsModule],
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ForgotPasswordComponent = _classThis = /** @class */ (function () {
        function ForgotPasswordComponent_1(fb, authService, router) {
            this.fb = fb;
            this.authService = authService;
            this.router = router;
            this.isLoading = false;
            this.errorMessage = '';
            this.successMessage = '';
            this.otpSent = false;
            this.destroy$ = new Subject();
            this.forgotForm = this.fb.group({
                phone_number: ['', [Validators.required, phoneValidator()]]
            });
        }
        ForgotPasswordComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        ForgotPasswordComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (this.forgotForm.invalid) {
                this.forgotForm.markAllAsTouched();
                return;
            }
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            var phoneNumber = this.forgotForm.value.phone_number;
            this.authService.forgotPassword({ phone_number: phoneNumber }).pipe(takeUntil(this.destroy$)).subscribe({
                next: function (response) {
                    _this.isLoading = false;
                    if (response.success) {
                        _this.otpSent = true;
                        _this.successMessage = AUTH_CONSTANTS.MESSAGES.OTP_SENT;
                        // Navigate to reset password with phone
                        setTimeout(function () {
                            _this.router.navigate([AUTH_CONSTANTS.RESET_PASSWORD_ROUTE], {
                                queryParams: { phone: phoneNumber }
                            });
                        }, 2000);
                    }
                },
                error: function (error) {
                    _this.isLoading = false;
                    _this.errorMessage = error.userMessage || 'Ce numéro de téléphone n\'est pas associé à un compte.';
                }
            });
        };
        ForgotPasswordComponent_1.prototype.getFieldError = function (fieldName) {
            var control = this.forgotForm.get(fieldName);
            if (!control || !control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Ce champ est requis';
            if (control.errors['phoneFormat'])
                return control.errors['phoneFormat'];
            return 'Valeur invalide';
        };
        return ForgotPasswordComponent_1;
    }());
    __setFunctionName(_classThis, "ForgotPasswordComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ForgotPasswordComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ForgotPasswordComponent = _classThis;
}();
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map