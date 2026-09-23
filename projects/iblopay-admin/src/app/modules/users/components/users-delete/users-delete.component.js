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
// src/app/modules/users/components/users-delete/users-delete.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
var UsersDeleteComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-users-delete',
            templateUrl: './users-delete.component.html',
            styleUrls: ['./users-delete.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _isOpen_decorators;
    var _isOpen_initializers = [];
    var _isOpen_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _isLoading_decorators;
    var _isLoading_initializers = [];
    var _isLoading_extraInitializers = [];
    var _error_decorators;
    var _error_initializers = [];
    var _error_extraInitializers = [];
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _close_decorators;
    var _close_initializers = [];
    var _close_extraInitializers = [];
    var _confirm_decorators;
    var _confirm_initializers = [];
    var _confirm_extraInitializers = [];
    var UsersDeleteComponent = _classThis = /** @class */ (function () {
        function UsersDeleteComponent_1() {
            this.isOpen = __runInitializers(this, _isOpen_initializers, false);
            this.user = (__runInitializers(this, _isOpen_extraInitializers), __runInitializers(this, _user_initializers, null));
            this.isLoading = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _isLoading_initializers, false));
            this.error = (__runInitializers(this, _isLoading_extraInitializers), __runInitializers(this, _error_initializers, ''));
            this.success = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _success_initializers, ''));
            this.close = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _close_initializers, new EventEmitter()));
            this.confirm = (__runInitializers(this, _close_extraInitializers), __runInitializers(this, _confirm_initializers, new EventEmitter()));
            // Étape 1: OTP
            this.showOtpStep = (__runInitializers(this, _confirm_extraInitializers), true);
            this.otpCode = '';
            this.otpError = '';
            this.otpAttempts = 0;
            this.maxOtpAttempts = 3;
            this.isOtpLocked = false;
            this.otpLockTimer = 0;
            this.otpTimer = 60;
            this.otpVerified = false;
            // Étape 2: Formulaire de suppression
            this.showDeleteStep = false;
            this.deleteReason = '';
            this.confirmText = '';
            this.reasonOptions = [
                'Compte inactif',
                'Demande de l\'utilisateur',
                'Violation des conditions',
                'Activité frauduleuse',
                'Doublon',
                'Autre'
            ];
        }
        UsersDeleteComponent_1.prototype.ngOnInit = function () { };
        UsersDeleteComponent_1.prototype.ngOnChanges = function (changes) {
            var _this = this;
            // Détecter l'ouverture du modal
            if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
                this.resetForm();
                // Démarrer l'OTP automatiquement
                setTimeout(function () {
                    _this.generateAndSendOtp();
                }, 300);
            }
        };
        UsersDeleteComponent_1.prototype.ngOnDestroy = function () {
            this.clearAllTimers();
        };
        // ─── OTP ──────────────────────────────────────────────────
        UsersDeleteComponent_1.prototype.generateAndSendOtp = function () {
            var otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('[SIMULATION] Code OTP envoyé:', otp);
            this.otpCode = '';
            this.otpError = '';
            this.otpAttempts = 0;
            this.isOtpLocked = false;
            this.otpTimer = 60;
            this.clearAllTimers();
            this.startOtpTimer();
        };
        UsersDeleteComponent_1.prototype.startOtpTimer = function () {
            var _this = this;
            this.clearAllTimers();
            // Timer pour l'OTP (60 secondes)
            this.otpTimerInterval = setInterval(function () {
                if (_this.otpTimer > 0) {
                    _this.otpTimer--;
                }
                else {
                    _this.clearOtpTimer();
                    _this.otpError = '⏳ Le code OTP a expiré. Veuillez renvoyer un nouveau code.';
                }
            }, 1000);
        };
        UsersDeleteComponent_1.prototype.startLockTimer = function (seconds) {
            var _this = this;
            this.otpLockTimer = seconds;
            this.clearLockTimer();
            this.lockTimerInterval = setInterval(function () {
                if (_this.otpLockTimer > 0) {
                    _this.otpLockTimer--;
                }
                else {
                    _this.clearLockTimer();
                    _this.isOtpLocked = false;
                    _this.otpError = '✅ Le verrouillage a expiré. Vous pouvez réessayer.';
                    setTimeout(function () {
                        if (_this.otpError === '✅ Le verrouillage a expiré. Vous pouvez réessayer.') {
                            _this.otpError = '';
                        }
                    }, 3000);
                }
            }, 1000);
        };
        UsersDeleteComponent_1.prototype.clearOtpTimer = function () {
            if (this.otpTimerInterval) {
                clearInterval(this.otpTimerInterval);
                this.otpTimerInterval = null;
            }
        };
        UsersDeleteComponent_1.prototype.clearLockTimer = function () {
            if (this.lockTimerInterval) {
                clearInterval(this.lockTimerInterval);
                this.lockTimerInterval = null;
            }
        };
        UsersDeleteComponent_1.prototype.clearAllTimers = function () {
            this.clearOtpTimer();
            this.clearLockTimer();
        };
        UsersDeleteComponent_1.prototype.verifyOtp = function () {
            if (!this.otpCode || this.otpCode.length < 4) {
                this.otpError = 'Veuillez entrer le code OTP reçu';
                return;
            }
            if (this.otpTimer <= 0) {
                this.otpError = '⏳ Le code OTP a expiré. Veuillez renvoyer un nouveau code.';
                return;
            }
            var validOtp = '123456';
            if (this.otpCode === validOtp) {
                this.otpError = '';
                this.otpVerified = true;
                this.showOtpStep = false;
                this.showDeleteStep = true;
                this.clearAllTimers();
            }
            else {
                this.otpAttempts++;
                var remainingAttempts = this.maxOtpAttempts - this.otpAttempts;
                if (this.otpAttempts >= this.maxOtpAttempts) {
                    this.isOtpLocked = true;
                    this.otpError = "\u274C Code OTP incorrect. Compte verrouill\u00E9 pour 3 minutes apr\u00E8s ".concat(this.maxOtpAttempts, " tentatives.");
                    this.startLockTimer(180);
                    this.clearOtpTimer();
                    this.otpCode = '';
                }
                else {
                    this.otpError = "\u274C Code OTP incorrect (tentative ".concat(this.otpAttempts, "/").concat(this.maxOtpAttempts, "). Il vous reste ").concat(remainingAttempts, " tentative").concat(remainingAttempts > 1 ? 's' : '', ".");
                    this.otpCode = '';
                }
            }
        };
        UsersDeleteComponent_1.prototype.resendOtp = function () {
            var _this = this;
            if (this.isOtpLocked) {
                this.otpError = "\u23F3 Compte verrouill\u00E9. R\u00E9essayez dans ".concat(this.getLockRemainingTime());
                return;
            }
            if (this.otpTimer > 0 && this.otpAttempts > 0) {
                this.otpError = '⏳ Veuillez utiliser le code actuel avant de demander un nouveau code.';
                return;
            }
            this.generateAndSendOtp();
            this.otpError = '✅ Nouveau code OTP envoyé';
            setTimeout(function () {
                if (_this.otpError === '✅ Nouveau code OTP envoyé') {
                    _this.otpError = '';
                }
            }, 3000);
        };
        // ─── SUPPRESSION ──────────────────────────────────────────
        UsersDeleteComponent_1.prototype.onConfirmDelete = function () {
            if (!this.deleteReason) {
                this.error = 'Veuillez sélectionner un motif de suppression';
                return;
            }
            if (this.confirmText !== 'supprimer') {
                this.error = 'Veuillez taper "supprimer" pour confirmer';
                return;
            }
            this.confirm.emit();
        };
        // ─── NAVIGATION ───────────────────────────────────────────
        UsersDeleteComponent_1.prototype.onClose = function () {
            this.resetForm();
            this.close.emit();
        };
        UsersDeleteComponent_1.prototype.goBackToOtp = function () {
            this.showDeleteStep = false;
            this.showOtpStep = true;
            this.deleteReason = '';
            this.confirmText = '';
            this.error = '';
        };
        UsersDeleteComponent_1.prototype.resetForm = function () {
            this.showOtpStep = true;
            this.showDeleteStep = false;
            this.otpCode = '';
            this.otpError = '';
            this.otpAttempts = 0;
            this.isOtpLocked = false;
            this.otpLockTimer = 0;
            this.otpTimer = 60;
            this.otpVerified = false;
            this.deleteReason = '';
            this.confirmText = '';
            this.error = '';
            this.success = '';
            this.clearAllTimers();
        };
        // ─── UTILITAIRES ──────────────────────────────────────────
        UsersDeleteComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat((firstName === null || firstName === void 0 ? void 0 : firstName.charAt(0)) || '').concat((lastName === null || lastName === void 0 ? void 0 : lastName.charAt(0)) || '').toUpperCase();
        };
        UsersDeleteComponent_1.prototype.getAvatarColor = function (id) {
            var colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#4f46e5';
        };
        UsersDeleteComponent_1.prototype.getRoleLabel = function (role) {
            var labels = {
                'CLIENT': 'Client',
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || role;
        };
        UsersDeleteComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'SUSPENDED': 'Suspendu',
                'FROZEN': 'Gelé',
                'CLOSED': 'Fermé'
            };
            return labels[status] || status;
        };
        UsersDeleteComponent_1.prototype.getStatusClass = function (status) {
            return "status-".concat(status.toLowerCase());
        };
        UsersDeleteComponent_1.prototype.getOtpRemainingTime = function () {
            if (this.otpTimer <= 0)
                return 'Expiré';
            var minutes = Math.floor(this.otpTimer / 60);
            var seconds = this.otpTimer % 60;
            if (minutes > 0) {
                return "".concat(minutes, "m ").concat(seconds, "s");
            }
            return "".concat(seconds, "s");
        };
        UsersDeleteComponent_1.prototype.getLockRemainingTime = function () {
            if (this.otpLockTimer <= 0)
                return '';
            var minutes = Math.floor(this.otpLockTimer / 60);
            var seconds = this.otpLockTimer % 60;
            if (minutes > 0) {
                return "".concat(minutes, "m ").concat(seconds, "s");
            }
            return "".concat(seconds, "s");
        };
        return UsersDeleteComponent_1;
    }());
    __setFunctionName(_classThis, "UsersDeleteComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isOpen_decorators = [Input()];
        _user_decorators = [Input()];
        _isLoading_decorators = [Input()];
        _error_decorators = [Input()];
        _success_decorators = [Input()];
        _close_decorators = [Output()];
        _confirm_decorators = [Output()];
        __esDecorate(null, null, _isOpen_decorators, { kind: "field", name: "isOpen", static: false, private: false, access: { has: function (obj) { return "isOpen" in obj; }, get: function (obj) { return obj.isOpen; }, set: function (obj, value) { obj.isOpen = value; } }, metadata: _metadata }, _isOpen_initializers, _isOpen_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _isLoading_decorators, { kind: "field", name: "isLoading", static: false, private: false, access: { has: function (obj) { return "isLoading" in obj; }, get: function (obj) { return obj.isLoading; }, set: function (obj, value) { obj.isLoading = value; } }, metadata: _metadata }, _isLoading_initializers, _isLoading_extraInitializers);
        __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: function (obj) { return "error" in obj; }, get: function (obj) { return obj.error; }, set: function (obj, value) { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
        __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
        __esDecorate(null, null, _close_decorators, { kind: "field", name: "close", static: false, private: false, access: { has: function (obj) { return "close" in obj; }, get: function (obj) { return obj.close; }, set: function (obj, value) { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
        __esDecorate(null, null, _confirm_decorators, { kind: "field", name: "confirm", static: false, private: false, access: { has: function (obj) { return "confirm" in obj; }, get: function (obj) { return obj.confirm; }, set: function (obj, value) { obj.confirm = value; } }, metadata: _metadata }, _confirm_initializers, _confirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersDeleteComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersDeleteComponent = _classThis;
}();
export { UsersDeleteComponent };
//# sourceMappingURL=users-delete.component.js.map