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
import { Component, Input } from '@angular/core';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TRANSACTION_TYPE_META, formatMinorAmount } from '../../transactions.constants';
// Types where money is leaving the "from" wallet's perspective — used to
// decide the +/- sign shown next to the amount. Adjust if your sign
// convention differs (e.g. if amount is already signed by the backend).
var OUTBOUND_TYPES = new Set([TransactionType.WITHDRAWAL, TransactionType.TRANSFER, TransactionType.PAYMENT_NFC]);
var TransactionCardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-card',
            templateUrl: './transaction-card.component.html',
            styleUrls: ['./transaction-card.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _transaction_decorators;
    var _transaction_initializers = [];
    var _transaction_extraInitializers = [];
    var TransactionCardComponent = _classThis = /** @class */ (function () {
        function TransactionCardComponent_1() {
            this.transaction = __runInitializers(this, _transaction_initializers, void 0);
            __runInitializers(this, _transaction_extraInitializers);
        }
        Object.defineProperty(TransactionCardComponent_1.prototype, "typeMeta", {
            get: function () {
                return TRANSACTION_TYPE_META[this.transaction.transactionType];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionCardComponent_1.prototype, "isOutbound", {
            get: function () {
                return OUTBOUND_TYPES.has(this.transaction.transactionType);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionCardComponent_1.prototype, "formattedAmount", {
            get: function () {
                var sign = this.isOutbound ? '-' : '+';
                return "".concat(sign).concat(formatMinorAmount(this.transaction.amount));
            },
            enumerable: false,
            configurable: true
        });
        return TransactionCardComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionCardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _transaction_decorators = [Input()];
        __esDecorate(null, null, _transaction_decorators, { kind: "field", name: "transaction", static: false, private: false, access: { has: function (obj) { return "transaction" in obj; }, get: function (obj) { return obj.transaction; }, set: function (obj, value) { obj.transaction = value; } }, metadata: _metadata }, _transaction_initializers, _transaction_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionCardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionCardComponent = _classThis;
}();
export { TransactionCardComponent };
//# sourceMappingURL=transaction-card.component.js.map