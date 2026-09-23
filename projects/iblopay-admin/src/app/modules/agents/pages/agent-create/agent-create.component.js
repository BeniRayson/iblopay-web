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
// src/app/modules/agents/pages/agent-create/agent-create.component.ts
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
var AgentCreateComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-create',
            templateUrl: './agent-create.component.html',
            styleUrls: ['./agent-create.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentCreateComponent = _classThis = /** @class */ (function () {
        function AgentCreateComponent_1(fb, agentService, router) {
            this.fb = fb;
            this.agentService = agentService;
            this.router = router;
            this.isLoading = false;
            this.provinces = [
                'Bujumbura Mairie', 'Bubanza', 'Bururi', 'Cankuzo', 'Cibitoke',
                'Gitega', 'Karuzi', 'Kayanza', 'Kirundo', 'Makamba',
                'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi', 'Rutana', 'Ruyigi'
            ];
        }
        AgentCreateComponent_1.prototype.ngOnInit = function () {
            this.initForm();
        };
        AgentCreateComponent_1.prototype.initForm = function () {
            this.agentForm = this.fb.group({
                lastName: ['', [Validators.required, Validators.minLength(2)]],
                firstName: ['', [Validators.required, Validators.minLength(2)]],
                dateOfBirth: ['', Validators.required],
                cin: ['', [Validators.required, Validators.minLength(10)]],
                phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
                cardNumber: ['', [Validators.required, Validators.minLength(10)]],
                province: ['', Validators.required],
                commune: ['', Validators.required],
                zone: ['', Validators.required],
                colline: [''],
                quartier: [''],
                nif: ['', [Validators.required, Validators.minLength(5)]],
                commerceRegister: ['', [Validators.required, Validators.minLength(5)]],
                approvalLetter: [null, Validators.required],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', [Validators.required]]
            }, {
                validator: this.passwordMatchValidator
            });
        };
        AgentCreateComponent_1.prototype.passwordMatchValidator = function (g) {
            var _a, _b;
            var password = (_a = g.get('password')) === null || _a === void 0 ? void 0 : _a.value;
            var confirm = (_b = g.get('confirmPassword')) === null || _b === void 0 ? void 0 : _b.value;
            return password === confirm ? null : { mismatch: true };
        };
        AgentCreateComponent_1.prototype.onFileSelected = function (event) {
            var file = event.target.files[0];
            if (file) {
                this.agentForm.patchValue({ approvalLetter: file });
            }
        };
        AgentCreateComponent_1.prototype.onSubmit = function () {
            var _this = this;
            var _a;
            if (this.agentForm.invalid) {
                this.agentForm.markAllAsTouched();
                return;
            }
            this.isLoading = true;
            var formData = this.agentForm.value;
            var agentData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                cin: formData.cin,
                cardNumber: formData.cardNumber,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                province: formData.province,
                commune: formData.commune,
                zone: formData.zone,
                colline: formData.colline,
                quartier: formData.quartier,
                nif: formData.nif,
                commerceRegister: formData.commerceRegister,
                password: formData.password,
                approvalLetter: "documents/approval_".concat(Date.now(), ".pdf"),
                approvalLetterName: ((_a = formData.approvalLetter) === null || _a === void 0 ? void 0 : _a.name) || 'approval_letter.pdf'
            };
            this.agentService.createAgent(agentData).subscribe({
                next: function (agent) {
                    _this.isLoading = false;
                    _this.router.navigate(['/agents/detail', agent.id]);
                },
                error: function () {
                    _this.isLoading = false;
                }
            });
        };
        AgentCreateComponent_1.prototype.cancel = function () {
            this.router.navigate(['/agents']);
        };
        return AgentCreateComponent_1;
    }());
    __setFunctionName(_classThis, "AgentCreateComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentCreateComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentCreateComponent = _classThis;
}();
export { AgentCreateComponent };
//# sourceMappingURL=agent-create.component.js.map