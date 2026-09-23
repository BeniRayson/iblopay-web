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
import { Injectable } from '@angular/core';
var ExportService = function () {
    var _classDecorators = [Injectable({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExportService = _classThis = /** @class */ (function () {
        function ExportService_1() {
        }
        /**
         * Exporte les données en CSV et télécharge le fichier
         */
        ExportService_1.prototype.exportToCsv = function (data, columns, filename) {
            var _this = this;
            if (filename === void 0) { filename = 'export'; }
            if (!data || data.length === 0) {
                console.warn('Aucune donnée à exporter');
                return;
            }
            // En-têtes CSV
            var headers = columns.map(function (col) { return _this.escapeCsvValue(col.title); }).join(';');
            // Lignes de données
            var rows = data.map(function (item) {
                return columns.map(function (col) {
                    var value = _this.getNestedValue(item, col.dataKey);
                    return _this.escapeCsvValue(_this.formatValue(value));
                }).join(';');
            });
            var bom = '\uFEFF';
            var csvContent = bom + headers + '\n' + rows.join('\n');
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = "".concat(filename, "_").concat(new Date().toISOString().slice(0, 10), ".csv");
            link.click();
            URL.revokeObjectURL(url);
        };
        /**
         * Exporte les données en PDF en utilisant l'impression navigateur
         * avec un formatage tableau
         */
        ExportService_1.prototype.exportToPdf = function (data, columns, title, filename) {
            var _this = this;
            if (title === void 0) { title = 'Export'; }
            if (filename === void 0) { filename = 'export'; }
            if (!data || data.length === 0) {
                console.warn('Aucune donnée à exporter');
                return;
            }
            var html = "\n      <html>\n      <head>\n        <meta charset=\"utf-8\">\n        <title>".concat(title, "</title>\n        <style>\n          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }\n          h1 { color: #1a56db; font-size: 20px; margin-bottom: 10px; }\n          .meta { color: #6b7280; font-size: 12px; margin-bottom: 20px; }\n          table { width: 100%; border-collapse: collapse; font-size: 12px; }\n          th { background-color: #1a56db; color: white; padding: 8px 10px; text-align: left; font-weight: 600; }\n          td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; }\n          tr:nth-child(even) { background-color: #f9fafb; }\n          .total { margin-top: 15px; font-weight: bold; text-align: right; }\n          @media print {\n            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n          }\n        </style>\n      </head>\n      <body>\n        <h1>").concat(title, "</h1>\n        <div class=\"meta\">G\u00E9n\u00E9r\u00E9 le ").concat(new Date().toLocaleDateString('fr-FR'), " \u00E0 ").concat(new Date().toLocaleTimeString('fr-FR'), "</div>\n        <table>\n          <thead>\n            <tr>\n              ").concat(columns.map(function (col) { return "<th>".concat(col.title, "</th>"); }).join(''), "\n            </tr>\n          </thead>\n          <tbody>\n            ").concat(data.map(function (item) { return "\n              <tr>\n                ".concat(columns.map(function (col) { return "<td>".concat(_this.formatValue(_this.getNestedValue(item, col.dataKey)), "</td>"); }).join(''), "\n              </tr>\n            "); }).join(''), "\n          </tbody>\n        </table>\n        <div class=\"total\">Total: ").concat(data.length, " enregistrement(s)</div>\n      </body>\n      </html>\n    ");
            var blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            // Ouvrir dans une nouvelle fenêtre pour impression
            var printWindow = window.open(url, '_blank');
            if (printWindow) {
                printWindow.onload = function () {
                    printWindow.focus();
                    printWindow.print();
                };
            }
            URL.revokeObjectURL(url);
        };
        /**
         * Récupère une valeur imbriquée par une clé (ex: "adresse.rue")
         */
        ExportService_1.prototype.getNestedValue = function (obj, key) {
            if (!obj)
                return '';
            return key.split('.').reduce(function (current, k) {
                return current && current[k] !== undefined ? current[k] : '';
            }, obj);
        };
        /**
         * Échappe une valeur pour le CSV
         */
        ExportService_1.prototype.escapeCsvValue = function (value) {
            var str = String(value !== null && value !== void 0 ? value : '');
            if (str.includes(';') || str.includes('"') || str.includes('\n')) {
                return "\"".concat(str.replace(/"/g, '""'), "\"");
            }
            return str;
        };
        /**
         * Formate une valeur pour l'affichage
         */
        ExportService_1.prototype.formatValue = function (value) {
            if (value === null || value === undefined)
                return '';
            if (value instanceof Date) {
                return value.toLocaleDateString('fr-FR');
            }
            if (typeof value === 'boolean') {
                return value ? 'Oui' : 'Non';
            }
            if (typeof value === 'number') {
                return new Intl.NumberFormat('fr-FR').format(value);
            }
            return String(value);
        };
        /**
         * Génère les colonnes à partir d'un mapping
         */
        ExportService_1.createColumns = function (mapping) {
            return mapping.map(function (m) { return ({ title: m.title, dataKey: m.key }); });
        };
        return ExportService_1;
    }());
    __setFunctionName(_classThis, "ExportService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExportService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExportService = _classThis;
}();
export { ExportService };
//# sourceMappingURL=export.service.js.map