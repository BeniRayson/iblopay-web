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
// src/app/modules/auth/two-factor-auth/two-factor-auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_CONSTANTS } from '../auth.constants';
import { otpValidator } from '../validators/email.validator';
var TwoFactorAuthComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-two-factor-auth',
            standalone: true,
            imports: [CommonModule, ReactiveFormsModule],
            templateUrl: './two-factor-auth.component.html',
            styleUrls: ['./two-factor-auth.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TwoFactorAuthComponent = _classThis = /** @class */ (function () {
        function TwoFactorAuthComponent_1(fb, route, router, authService) {
            this.fb = fb;
            this.route = route;
            this.router = router;
            this.authService = authService;
            this.isLoading = false;
            this.errorMessage = '';
            this.successMessage = '';
            this.phoneNumber = '';
            this.maskedPhone = '';
            this.cooldown = AUTH_CONSTANTS.OTP_RESEND_COOLDOWN;
            this.canResend = false;
            this.destroy$ = new Subject();
        }
        TwoFactorAuthComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            // Get phone number from query params
            this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(function (params) {
                _this.phoneNumber = params['phone'] || '';
                if (!_this.phoneNumber) {
                    // Fallback to login if no phone provided
                    _this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
                    return;
                }
                _this.maskPhoneNumber();
            });
            this.otpForm = this.fb.group({
                otp_code: ['', [Validators.required, otpValidator()]]
            });
            this.startResendTimer();
        };
        TwoFactorAuthComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
            if (this.timerSub) {
                this.timerSub.unsubscribe();
            }
        };
        TwoFactorAuthComponent_1.prototype.maskPhoneNumber = function () {
            var len = this.phoneNumber.length;
            if (len > 7) {
                this.maskedPhone = this.phoneNumber.substring(0, len - 6) + '••••' + this.phoneNumber.substring(len - 2);
            }
            else {
                this.maskedPhone = this.phoneNumber;
            }
        };
        TwoFactorAuthComponent_1.prototype.startResendTimer = function () {
            var _this = this;
            this.canResend = false;
            this.cooldown = AUTH_CONSTANTS.OTP_RESEND_COOLDOWN;
            if (this.timerSub) {
                this.timerSub.unsubscribe();
            }
            this.timerSub = timer(0, 1000)
                .pipe(takeUntil(this.destroy$))
                .subscribe(function () {
                if (_this.cooldown > 0) {
                    _this.cooldown--;
                }
                else {
                    _this.canResend = true;
                    if (_this.timerSub) {
                        _this.timerSub.unsubscribe();
                    }
                }
            });
        };
        TwoFactorAuthComponent_1.prototype.resendOtp = function () {
            var _this = this;
            if (!this.canResend)
                return;
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            this.authService.forgotPassword({ phone_number: this.phoneNumber }).subscribe({
                next: function (response) {
                    _this.isLoading = false;
                    if (response.success) {
                        _this.successMessage = AUTH_CONSTANTS.MESSAGES.OTP_RESENT;
                        _this.startResendTimer();
                    }
                },
                error: function (error) {
                    var _a;
                    _this.isLoading = false;
                    _this.errorMessage = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
                }
            });
        };
        TwoFactorAuthComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (this.otpForm.invalid) {
                this.otpForm.markAllAsTouched();
                return;
            }
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';
            var request = {
                phone_number: this.phoneNumber,
                otp_code: this.otpForm.value.otp_code
            };
            this.authService.verifyTwoFactor(request).subscribe({
                next: function (response) {
                    _this.isLoading = false;
                    if (response.success) {
                        _this.successMessage = AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS;
                        setTimeout(function () {
                            _this.router.navigate([AUTH_CONSTANTS.DASHBOARD_ROUTE]);
                        }, 1000);
                    }
                },
                error: function (error) {
                    var _a;
                    _this.isLoading = false;
                    _this.errorMessage = ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || AUTH_CONSTANTS.MESSAGES.OTP_INVALID;
                }
            });
        };
        TwoFactorAuthComponent_1.prototype.getFieldError = function (fieldName) {
            var control = this.otpForm.get(fieldName);
            if (!control || !control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Le code de vérification est requis';
            if (control.errors['otpFormat'])
                return control.errors['otpFormat'];
            if (control.errors['otpLength'])
                return control.errors['otpLength'];
            return 'Code invalide';
        };
        return TwoFactorAuthComponent_1;
    }());
    __setFunctionName(_classThis, "TwoFactorAuthComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwoFactorAuthComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwoFactorAuthComponent = _classThis;
}();
export { TwoFactorAuthComponent };
//# sourceMappingURL=two-factor-auth.component.js.map