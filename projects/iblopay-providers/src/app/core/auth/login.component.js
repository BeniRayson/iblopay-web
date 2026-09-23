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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ADMIN_SERVICES_IDENTIFIANT, ADMIN_SERVICES_PIN, ADMIN_TRANSPORT_IDENTIFIANT, ADMIN_TRANSPORT_PIN, ADMIN_EVENEMENTS_IDENTIFIANT, ADMIN_EVENEMENTS_PIN } from '../auth.service';
var LoginComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-login',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './login.component.html',
            styleUrl: './login.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginComponent = _classThis = /** @class */ (function () {
        function LoginComponent_1(authService, router) {
            this.authService = authService;
            this.router = router;
            this.identifiant = '';
            this.motDePasse = '';
            this.showMotDePasse = false;
            this.isLoading = false;
            this.erreur = '';
            this.showAide = false;
            this.adminServicesIdentifiant = ADMIN_SERVICES_IDENTIFIANT;
            this.adminServicesPin = ADMIN_SERVICES_PIN;
            this.adminTransportIdentifiant = ADMIN_TRANSPORT_IDENTIFIANT;
            this.adminTransportPin = ADMIN_TRANSPORT_PIN;
            this.adminEvenementsIdentifiant = ADMIN_EVENEMENTS_IDENTIFIANT;
            this.adminEvenementsPin = ADMIN_EVENEMENTS_PIN;
        }
        LoginComponent_1.prototype.toggleAide = function () {
            this.showAide = !this.showAide;
        };
        LoginComponent_1.prototype.remplir = function (identifiant, pin) {
            this.identifiant = identifiant;
            this.motDePasse = pin;
            this.erreur = '';
        };
        LoginComponent_1.prototype.connexion = function () {
            var _this = this;
            if (!this.identifiant.trim() || !this.motDePasse.trim()) {
                this.erreur = 'Veuillez renseigner votre identifiant et votre mot de passe.';
                return;
            }
            this.isLoading = true;
            this.erreur = '';
            this.authService.connecter(this.identifiant, this.motDePasse).subscribe(function (resultat) {
                _this.isLoading = false;
                if (!resultat.succes || !resultat.utilisateur) {
                    _this.erreur = resultat.message || 'Connexion impossible.';
                    return;
                }
                if (resultat.utilisateur.type === 'ADMIN') {
                    if (resultat.utilisateur.secteur === 'TRANSPORT')
                        _this.router.navigate(['/transport']);
                    else if (resultat.utilisateur.secteur === 'EVENEMENTS')
                        _this.router.navigate(['/evenements']);
                    else
                        _this.router.navigate(['/dashboard']);
                }
                else {
                    _this.router.navigate(['/demandes']);
                }
            });
        };
        return LoginComponent_1;
    }());
    __setFunctionName(_classThis, "LoginComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
}();
export { LoginComponent };
//# sourceMappingURL=login.component.js.map