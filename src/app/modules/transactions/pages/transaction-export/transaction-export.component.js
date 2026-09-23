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
var EXPORT_PAGE_SIZE = 1000; // client-side export cap; large ranges should use requestServerExport instead
var TransactionExportComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transaction-export',
            templateUrl: './transaction-export.component.html',
            styleUrls: ['./transaction-export.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionExportComponent = _classThis = /** @class */ (function () {
        function TransactionExportComponent_1(transactionService, exportService) {
            this.transactionService = transactionService;
            this.exportService = exportService;
            this.dateFrom = '';
            this.dateTo = '';
            this.isExporting = false;
            this.errorMessage = '';
        }
        TransactionExportComponent_1.prototype.export = function () {
            var _this = this;
            this.isExporting = true;
            this.errorMessage = '';
            var filter = {
                page: 1,
                pageSize: EXPORT_PAGE_SIZE
            };
            if (this.dateFrom) {
                filter.dateFrom = this.dateFrom;
            }
            if (this.dateTo) {
                filter.dateTo = this.dateTo;
            }
            this.transactionService.getTransactions(filter).subscribe({
                next: function (_a) {
                    var items = _a.items, total = _a.total;
                    _this.exportService.exportToCsv(items, 'transactions.csv');
                    _this.isExporting = false;
                    if (total > EXPORT_PAGE_SIZE) {
                        _this.errorMessage = "Only the first ".concat(EXPORT_PAGE_SIZE, " of ").concat(total, " matching transactions were exported. Narrow your date range for a complete export.");
                    }
                },
                error: function () {
                    _this.errorMessage = 'Export failed. Please try again.';
                    _this.isExporting = false;
                }
            });
        };
        return TransactionExportComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionExportComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionExportComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionExportComponent = _classThis;
}();
export { TransactionExportComponent };
//# sourceMappingURL=transaction-export.component.js.map