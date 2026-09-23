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
import { Component, EventEmitter, Input, Output } from '@angular/core';
var TransactionTableComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-table',
            templateUrl: './transaction-table.component.html',
            styleUrls: ['./transaction-table.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _rows_decorators;
    var _rows_initializers = [];
    var _rows_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _currentPage_decorators;
    var _currentPage_initializers = [];
    var _currentPage_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    var _pageChange_decorators;
    var _pageChange_initializers = [];
    var _pageChange_extraInitializers = [];
    var _rowClick_decorators;
    var _rowClick_initializers = [];
    var _rowClick_extraInitializers = [];
    var _reverseClick_decorators;
    var _reverseClick_initializers = [];
    var _reverseClick_extraInitializers = [];
    var TransactionTableComponent = _classThis = /** @class */ (function () {
        function TransactionTableComponent_1() {
            this.rows = __runInitializers(this, _rows_initializers, []);
            this.total = (__runInitializers(this, _rows_extraInitializers), __runInitializers(this, _total_initializers, 0));
            this.currentPage = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _currentPage_initializers, 1));
            this.pageSize = (__runInitializers(this, _currentPage_extraInitializers), __runInitializers(this, _pageSize_initializers, 20));
            this.pageChange = (__runInitializers(this, _pageSize_extraInitializers), __runInitializers(this, _pageChange_initializers, new EventEmitter()));
            this.rowClick = (__runInitializers(this, _pageChange_extraInitializers), __runInitializers(this, _rowClick_initializers, new EventEmitter()));
            this.reverseClick = (__runInitializers(this, _rowClick_extraInitializers), __runInitializers(this, _reverseClick_initializers, new EventEmitter()));
            __runInitializers(this, _reverseClick_extraInitializers);
        }
        Object.defineProperty(TransactionTableComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.max(1, Math.ceil(this.total / this.pageSize));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionTableComponent_1.prototype, "startRecord", {
            get: function () {
                return (this.currentPage - 1) * this.pageSize + 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionTableComponent_1.prototype, "endRecord", {
            get: function () {
                return Math.min(this.currentPage * this.pageSize, this.total);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionTableComponent_1.prototype, "pages", {
            get: function () {
                var total = this.totalPages;
                var current = this.currentPage;
                var range = [];
                var start = Math.max(1, current - 2);
                var end = Math.min(total, current + 2);
                for (var i = start; i <= end; i++)
                    range.push(i);
                return range;
            },
            enumerable: false,
            configurable: true
        });
        TransactionTableComponent_1.prototype.getCanalLabel = function (channel) {
            var map = {
                wallet: 'Wallet',
                card: 'Carte',
                attribué: 'Attribué',
                mobile: 'Mobile',
                agent: 'Agent',
                web: 'Web',
                nfc: 'NFC',
                ussd: 'USSD'
            };
            return map[channel] || channel;
        };
        TransactionTableComponent_1.prototype.onRowClick = function (transactionNo) {
            this.rowClick.emit(transactionNo);
        };
        TransactionTableComponent_1.prototype.onReverseClick = function (event, transactionNo) {
            event.stopPropagation();
            this.reverseClick.emit(transactionNo);
        };
        return TransactionTableComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionTableComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _rows_decorators = [Input()];
        _total_decorators = [Input()];
        _currentPage_decorators = [Input()];
        _pageSize_decorators = [Input()];
        _pageChange_decorators = [Output()];
        _rowClick_decorators = [Output()];
        _reverseClick_decorators = [Output()];
        __esDecorate(null, null, _rows_decorators, { kind: "field", name: "rows", static: false, private: false, access: { has: function (obj) { return "rows" in obj; }, get: function (obj) { return obj.rows; }, set: function (obj, value) { obj.rows = value; } }, metadata: _metadata }, _rows_initializers, _rows_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _currentPage_decorators, { kind: "field", name: "currentPage", static: false, private: false, access: { has: function (obj) { return "currentPage" in obj; }, get: function (obj) { return obj.currentPage; }, set: function (obj, value) { obj.currentPage = value; } }, metadata: _metadata }, _currentPage_initializers, _currentPage_extraInitializers);
        __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
        __esDecorate(null, null, _pageChange_decorators, { kind: "field", name: "pageChange", static: false, private: false, access: { has: function (obj) { return "pageChange" in obj; }, get: function (obj) { return obj.pageChange; }, set: function (obj, value) { obj.pageChange = value; } }, metadata: _metadata }, _pageChange_initializers, _pageChange_extraInitializers);
        __esDecorate(null, null, _rowClick_decorators, { kind: "field", name: "rowClick", static: false, private: false, access: { has: function (obj) { return "rowClick" in obj; }, get: function (obj) { return obj.rowClick; }, set: function (obj, value) { obj.rowClick = value; } }, metadata: _metadata }, _rowClick_initializers, _rowClick_extraInitializers);
        __esDecorate(null, null, _reverseClick_decorators, { kind: "field", name: "reverseClick", static: false, private: false, access: { has: function (obj) { return "reverseClick" in obj; }, get: function (obj) { return obj.reverseClick; }, set: function (obj, value) { obj.reverseClick = value; } }, metadata: _metadata }, _reverseClick_initializers, _reverseClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionTableComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionTableComponent = _classThis;
}();
export { TransactionTableComponent };
//# sourceMappingURL=transaction-table.component.js.map