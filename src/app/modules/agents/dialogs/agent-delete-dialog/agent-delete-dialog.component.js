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
// src/app/modules/agents/dialogs/agent-delete-dialog/agent-delete-dialog.component.ts
import { Component } from '@angular/core';
var AgentDeleteDialogComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-delete-dialog',
            template: "\n    <div class=\"dialog-container\">\n      <h2>Confirmer la suppression</h2>\n      <p>\u00CAtes-vous s\u00FBr de vouloir supprimer l'agent <strong>{{ data?.agent?.firstName }} {{ data?.agent?.lastName }}</strong> ?</p>\n      <p class=\"warning\">Cette action est irr\u00E9versible.</p>\n      <div class=\"dialog-actions\">\n        <button (click)=\"cancel()\" class=\"btn-secondary\">Annuler</button>\n        <button (click)=\"confirm()\" class=\"btn-danger\">Supprimer</button>\n      </div>\n    </div>\n  ",
            styles: ["\n    .dialog-container {\n      padding: 24px;\n      max-width: 400px;\n      \n      h2 {\n        margin-top: 0;\n        color: #c62828;\n      }\n      \n      .warning {\n        color: #c62828;\n        font-weight: 500;\n        margin: 16px 0;\n      }\n      \n      .dialog-actions {\n        display: flex;\n        justify-content: flex-end;\n        gap: 12px;\n        margin-top: 24px;\n      }\n      \n      .btn-secondary {\n        padding: 8px 16px;\n        background: #666;\n        color: white;\n        border: none;\n        border-radius: 4px;\n        cursor: pointer;\n      }\n      \n      .btn-danger {\n        padding: 8px 16px;\n        background: #c62828;\n        color: white;\n        border: none;\n        border-radius: 4px;\n        cursor: pointer;\n        \n        &:hover {\n          background: #b71c1c;\n        }\n      }\n    }\n  "]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentDeleteDialogComponent = _classThis = /** @class */ (function () {
        function AgentDeleteDialogComponent_1() {
        }
        AgentDeleteDialogComponent_1.prototype.cancel = function () {
            if (this.dialogRef) {
                this.dialogRef.close(false);
            }
        };
        AgentDeleteDialogComponent_1.prototype.confirm = function () {
            if (this.dialogRef) {
                this.dialogRef.close(true);
            }
        };
        return AgentDeleteDialogComponent_1;
    }());
    __setFunctionName(_classThis, "AgentDeleteDialogComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentDeleteDialogComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentDeleteDialogComponent = _classThis;
}();
export { AgentDeleteDialogComponent };
//# sourceMappingURL=agent-delete-dialog.component.js.map