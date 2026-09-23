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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
var ExportUtilsService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExportUtilsService = _classThis = /** @class */ (function () {
        function ExportUtilsService_1() {
        }
        /** Génère un vrai fichier Excel (.xlsx) téléchargeable à partir de colonnes/lignes. */
        ExportUtilsService_1.prototype.exporterExcel = function (colonnes, lignes, nomFichier, nomFeuille) {
            if (nomFeuille === void 0) { nomFeuille = 'Rapport'; }
            var entetes = colonnes.map(function (c) { return c.label; });
            var donnees = lignes.map(function (ligne) { return colonnes.map(function (c) { var _a; return (_a = ligne[c.cle]) !== null && _a !== void 0 ? _a : ''; }); });
            var feuille = XLSX.utils.aoa_to_sheet(__spreadArray([entetes], donnees, true));
            feuille['!cols'] = colonnes.map(function () { return ({ wch: 20 }); });
            var classeur = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(classeur, feuille, nomFeuille.slice(0, 31));
            var fichier = "".concat(nomFichier, "_").concat(new Date().toISOString().slice(0, 10), ".xlsx");
            XLSX.writeFile(classeur, fichier);
        };
        /** Ouvre une fenêtre d'impression avec un tableau HTML propre (titre, filtres, colonnes/lignes). */
        ExportUtilsService_1.prototype.imprimer = function (titre, sousTitre, filtresTexte, colonnes, lignes) {
            var entetesHtml = colonnes.map(function (c) { return "<th>".concat(c.label, "</th>"); }).join('');
            var lignesHtml = lignes.map(function (l) {
                return "<tr>".concat(colonnes.map(function (c) { var _a; return "<td>".concat((_a = l[c.cle]) !== null && _a !== void 0 ? _a : '', "</td>"); }).join(''), "</tr>");
            }).join('');
            var html = "\n      <html>\n        <head>\n          <title>".concat(titre, " \u2014 IBLOPAY</title>\n          <meta charset=\"utf-8\" />\n          <style>\n            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #0f172a; }\n            h1 { font-size: 18px; margin-bottom: 2px; }\n            .sous-titre { font-size: 12px; color: #64748b; margin-bottom: 4px; }\n            .filtres { font-size: 11px; color: #475569; margin-bottom: 16px; }\n            table { width: 100%; border-collapse: collapse; font-size: 11.5px; }\n            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }\n            th { background: #f1f5f9; text-transform: uppercase; font-size: 10px; letter-spacing: 0.3px; }\n            tr:nth-child(even) td { background: #f8fafc; }\n            .pied { margin-top: 16px; font-size: 10px; color: #94a3b8; text-align: right; }\n          </style>\n        </head>\n        <body>\n          <h1>").concat(titre, "</h1>\n          <div class=\"sous-titre\">").concat(sousTitre, "</div>\n          <div class=\"filtres\">").concat(filtresTexte.length ? filtresTexte.join(' &nbsp;•&nbsp; ') : 'Aucun filtre appliqué', " &nbsp;\u2022&nbsp; ").concat(lignes.length, " r\u00E9sultat(s)</div>\n          <table>\n            <thead><tr>").concat(entetesHtml, "</tr></thead>\n            <tbody>").concat(lignesHtml, "</tbody>\n          </table>\n          <div class=\"pied\">G\u00E9n\u00E9r\u00E9 le ").concat(new Date().toLocaleString('fr-FR'), "</div>\n        </body>\n      </html>");
            var fenetre = window.open('', '_blank', 'width=1000,height=800');
            if (!fenetre)
                return;
            fenetre.document.open();
            fenetre.document.write(html);
            fenetre.document.close();
            setTimeout(function () { fenetre.focus(); fenetre.print(); }, 300);
        };
        return ExportUtilsService_1;
    }());
    __setFunctionName(_classThis, "ExportUtilsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExportUtilsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExportUtilsService = _classThis;
}();
export { ExportUtilsService };
//# sourceMappingURL=export-utils.service.js.map