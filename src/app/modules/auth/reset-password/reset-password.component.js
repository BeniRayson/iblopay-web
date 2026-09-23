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
// src/app/modules/auth/reset-password/reset-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_CONSTANTS } from '../auth.constants';
import { otpValidator } from '../validators/email.validator';
import { pinValidator, pinMatchValidator } from '../validators/password.validator';
var ResetPasswordComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-reset-password',
            standalone: true,
            imports: [CommonModule, ReactiveFormsModule],
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ResetPasswordComponent = _classThis = /** @class */ (function () {
        function ResetPasswordComponent_1(fb, route, router, authService) {
            this.fb = fb;
            this.route = route;
            this.router = router;
            this.authService = authService;
            this.isLoading = false;
            this.errorMessage = '';
            this.successMessage = '';
            this.phoneNumber = '';
            this.showNewPin = false;
            this.showConfirmPin = false;
            this.destroy$ = new Subject();
        }
        ResetPasswordComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            // Get phone from query params
            this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(function (params) {
                _this.phoneNumber = params['phone'] || '';
                if (!_this.phoneNumber) {
                    // Redirect to forgot password if no phone is present
                    _this.router.navigate([AUTH_CONSTANTS.FORGOT_PASSWORD_ROUTE]);
                }
            });
            this.resetForm = this.fb.group({
                otp_code: ['', [Validators.required, otpValidator()]],
                new_pin: ['', [Validators.required, pinValidator()]],
                confirm_pin: ['', [Validators.required]]
            }, {
                validators: [pinMatchValidator('new_pin', 'confirm_pin')]
            });
        };
        ResetPasswordComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        ResetPasswordComponent_1.prototype.toggleNewPinVisibility = function () {
            this.showNewPin = !this.showNewPin;
        };
        ResetPasswordComponent_1.prototype.toggleConfirmPinVisibility = function () {
            this.showConfirmPin = !this.showConfirmPin;
        };
        ResetPasswordComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (this.resetForm.invalid) {
                this.resetForm.markAllAsTouched();
                return;
            }
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            var request = {
                phone_number: this.phoneNumber,
                otp_code: this.resetForm.value.otp_code,
                new_pin: this.resetForm.value.new_pin,
                confirm_pin: this.resetForm.value.confirm_pin
            };
            this.authService.resetPassword(request).pipe(takeUntil(this.destroy$)).subscribe({
                next: function (response) {
                    _this.isLoading = false;
                    if (response.success) {
                        _this.successMessage = AUTH_CONSTANTS.MESSAGES.PASSWORD_RESET_SUCCESS;
                        setTimeout(function () {
                            _this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
                        }, 2000);
                    }
                },
                error: function (error) {
                    var _a;
                    _this.isLoading = false;
                    _this.errorMessage = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || AUTH_CONSTANTS.MESSAGES.OTP_INVALID;
                }
            });
        };
        ResetPasswordComponent_1.prototype.getFieldError = function (fieldName) {
            var _a;
            var control = this.resetForm.get(fieldName);
            if (!control)
                return '';
            // Check cross-field mismatch first for confirm_pin
            if (fieldName === 'confirm_pin' && ((_a = this.resetForm.errors) === null || _a === void 0 ? void 0 : _a['pinMismatch']) && control.touched) {
                return 'Les PINs ne correspondent pas';
            }
            if (!control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Ce champ est requis';
            if (control.errors['otpFormat'])
                return control.errors['otpFormat'];
            if (control.errors['otpLength'])
                return control.errors['otpLength'];
            if (control.errors['pinFormat'])
                return control.errors['pinFormat'];
            if (control.errors['pinMinLength'])
                return control.errors['pinMinLength'];
            if (control.errors['pinMaxLength'])
                return control.errors['pinMaxLength'];
            return 'Valeur invalide';
        };
        return ResetPasswordComponent_1;
    }());
    __setFunctionName(_classThis, "ResetPasswordComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResetPasswordComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResetPasswordComponent = _classThis;
}();
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map