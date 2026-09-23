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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ─── DUMMY DATA GENERATION ──────────────────────────────────────
var AGENT_NAMES = [
    { nom: 'Hakizimana', prenom: 'Jean-Pierre' },
    { nom: 'Ndayishimiye', prenom: 'Marie-Claire' },
    { nom: 'Ciza', prenom: 'Pierre' },
    { nom: 'Habimana', prenom: 'Anastasie' },
    { nom: 'Mbonimpa', prenom: 'David' },
    { nom: 'Ntakirutimana', prenom: 'Jacqueline' },
    { nom: 'Bigirimana', prenom: 'Christophe' },
    { nom: 'Kamwenubusa', prenom: 'Béatrice' },
];
var SUPER_AGENT_NAMES = [
    { nom: 'Niyonzima', prenom: 'Alphonse' },
    { nom: 'Rwasa', prenom: 'Emmanuel' },
    { nom: 'Mpundu', prenom: 'Sylvie' },
    { nom: 'Nkurunziza', prenom: 'Pascal' },
    { nom: 'Barancira', prenom: 'Marguerite' },
];
var TRANSACTION_TYPES = ['DEPOT', 'RETRAIT', 'PAIEMENT_NFC', 'TRANSFERT'];
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function generateWallet() {
    return "79".concat(String(randomInt(10000000, 99999999)));
}
function generateContact() {
    return "+257 ".concat(String(randomInt(70000000, 79999999)));
}
function generateTransactionRef(index) {
    var prefixes = ['TXN', 'PAY', 'DEP', 'WTH'];
    return "".concat(randomItem(prefixes), "-").concat(String(2026000 + index).padStart(7, '0'));
}
var COMMISSION_RATES = {
    etat: 0.0025,
    iblopay: 0.004,
    tierce: 0.003,
    personnelle: 0.006,
};
function generateTransaction(index, date) {
    var types = TRANSACTION_TYPES;
    var type = types[randomInt(0, types.length - 1)];
    var montant = randomInt(5000, 500000);
    var montantNum = montant;
    return {
        reference: generateTransactionRef(index),
        date: date,
        type: type,
        montant: montantNum,
        commissions: {
            etat: Math.round(montantNum * COMMISSION_RATES.etat),
            iblopay: Math.round(montantNum * COMMISSION_RATES.iblopay),
            tierce: Math.round(montantNum * COMMISSION_RATES.tierce),
            personnelle: Math.round(montantNum * COMMISSION_RATES.personnelle),
        },
    };
}
function getInitials(nom, prenom) {
    return "".concat(prenom.charAt(0)).concat(nom.charAt(0)).toUpperCase();
}
// ─── Generate all persons ────────────────────────────────────────
function generateAllPersons() {
    var startDate = new Date('2026-07-01');
    var endDate = new Date('2026-07-31');
    var persons = [];
    var txIndex = 0;
    // Generate 8 Agents
    for (var i = 0; i < AGENT_NAMES.length; i++) {
        var agentEntry = AGENT_NAMES[i];
        var nom = agentEntry.nom, prenom = agentEntry.prenom;
        var saIndex = Math.floor(i / 2) % SUPER_AGENT_NAMES.length;
        var sa = SUPER_AGENT_NAMES[saIndex];
        var txCount = randomInt(4, 17);
        var transactions = [];
        for (var t = 0; t < txCount; t++) {
            transactions.push(generateTransaction(txIndex++, randomDate(startDate, endDate)));
        }
        transactions.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        persons.push({
            id: "AGT-".concat(String(i + 1).padStart(3, '0')),
            nom: nom,
            prenom: prenom,
            wallet: generateWallet(),
            contact: generateContact(),
            transactions: transactions,
            role: 'agent',
            superAgentNom: "".concat(sa.prenom, " ").concat(sa.nom),
        });
    }
    // Generate 5 Super-Agents
    for (var i = 0; i < SUPER_AGENT_NAMES.length; i++) {
        var saEntry = SUPER_AGENT_NAMES[i];
        var nom = saEntry.nom, prenom = saEntry.prenom;
        var txCount = randomInt(6, 20);
        var transactions = [];
        for (var t = 0; t < txCount; t++) {
            transactions.push(generateTransaction(txIndex++, randomDate(startDate, endDate)));
        }
        transactions.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        persons.push({
            id: "SA-".concat(String(i + 1).padStart(3, '0')),
            nom: nom,
            prenom: prenom,
            wallet: generateWallet(),
            contact: generateContact(),
            transactions: transactions,
            role: 'super_agent',
        });
    }
    return persons;
}
// ─── Component ──────────────────────────────────────────────────
var CommissionDashboardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-commission-dashboard',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './commission-dashboard.component.html',
            styleUrls: ['./commission-dashboard.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommissionDashboardComponent = _classThis = /** @class */ (function () {
        function CommissionDashboardComponent_1() {
            // Data
            this.allPersons = [];
            this.filteredPersons = [];
            // Pre-computed rows for current tab (avoid getter re-creation issues)
            this.agentRows = [];
            this.superAgentRows = [];
            this.activeTab = 'agent';
            // Search
            this.searchQuery = '';
            // Modal
            this.selectedPerson = null;
            this.isModalOpen = false;
            // Modal precomputed totals
            this.modalTotalMontant = 0;
            this.modalTotalEtat = 0;
            this.modalTotalIblopay = 0;
            this.modalTotalTierce = 0;
            this.modalTotalPersonnelle = 0;
            // KPI computed values
            this.totalCommissionEtat = 0;
            this.totalCommissionIblopay = 0;
            this.totalCommissionTierce = 0;
            this.totalCommissionPersonnelle = 0;
            this.totalToutesCommissions = 0;
            // Precomputed totals for the table footer
            this.totalsEtat = 0;
            this.totalsIblopay = 0;
            this.totalsTierce = 0;
            this.totalsPersonnelle = 0;
            this.totalsGlobale = 0;
        }
        CommissionDashboardComponent_1.prototype.ngOnInit = function () {
            this.allPersons = generateAllPersons();
            this.applyFilter();
        };
        CommissionDashboardComponent_1.prototype.toRow = function (person) {
            var etat = person.transactions.reduce(function (s, t) { return s + t.commissions.etat; }, 0);
            var iblopay = person.transactions.reduce(function (s, t) { return s + t.commissions.iblopay; }, 0);
            var tierce = person.transactions.reduce(function (s, t) { return s + t.commissions.tierce; }, 0);
            var personnelle = person.transactions.reduce(function (s, t) { return s + t.commissions.personnelle; }, 0);
            return {
                person: person,
                totalCommissionEtat: etat,
                totalCommissionIblopay: iblopay,
                totalCommissionTierce: tierce,
                totalCommissionPersonnelle: personnelle,
                totalToutesCommissions: etat + iblopay + tierce + personnelle,
                initials: getInitials(person.nom, person.prenom),
            };
        };
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "currentRows", {
            get: function () {
                return this.activeTab === 'agent' ? this.agentRows : this.superAgentRows;
            },
            enumerable: false,
            configurable: true
        });
        CommissionDashboardComponent_1.prototype.switchTab = function (tab) {
            this.activeTab = tab;
            this.computeTableTotals();
        };
        CommissionDashboardComponent_1.prototype.onSearch = function () {
            this.applyFilter();
        };
        CommissionDashboardComponent_1.prototype.applyFilter = function () {
            var _this = this;
            var q = this.searchQuery.toLowerCase().trim();
            if (!q) {
                this.filteredPersons = __spreadArray([], this.allPersons, true);
            }
            else {
                this.filteredPersons = this.allPersons.filter(function (p) {
                    return p.nom.toLowerCase().includes(q) ||
                        p.prenom.toLowerCase().includes(q) ||
                        "".concat(p.prenom, " ").concat(p.nom).toLowerCase().includes(q) ||
                        p.wallet.includes(q) ||
                        p.contact.includes(q);
                });
            }
            // Pre-compute rows and totals in one pass
            this.agentRows = this.filteredPersons
                .filter(function (p) { return p.role === 'agent'; })
                .map(function (p) { return _this.toRow(p); });
            this.superAgentRows = this.filteredPersons
                .filter(function (p) { return p.role === 'super_agent'; })
                .map(function (p) { return _this.toRow(p); });
            this.computeKpis();
            this.computeTableTotals();
        };
        CommissionDashboardComponent_1.prototype.computeKpis = function () {
            var visible = this.filteredPersons;
            this.totalCommissionEtat = visible.reduce(function (s, p) { return s + p.transactions.reduce(function (t, tx) { return t + tx.commissions.etat; }, 0); }, 0);
            this.totalCommissionIblopay = visible.reduce(function (s, p) { return s + p.transactions.reduce(function (t, tx) { return t + tx.commissions.iblopay; }, 0); }, 0);
            this.totalCommissionTierce = visible.reduce(function (s, p) { return s + p.transactions.reduce(function (t, tx) { return t + tx.commissions.tierce; }, 0); }, 0);
            this.totalCommissionPersonnelle = visible.reduce(function (s, p) { return s + p.transactions.reduce(function (t, tx) { return t + tx.commissions.personnelle; }, 0); }, 0);
            this.totalToutesCommissions = this.totalCommissionEtat + this.totalCommissionIblopay + this.totalCommissionTierce + this.totalCommissionPersonnelle;
        };
        CommissionDashboardComponent_1.prototype.computeTableTotals = function () {
            var rows = this.currentRows;
            this.totalsEtat = rows.reduce(function (s, r) { return s + r.totalCommissionEtat; }, 0);
            this.totalsIblopay = rows.reduce(function (s, r) { return s + r.totalCommissionIblopay; }, 0);
            this.totalsTierce = rows.reduce(function (s, r) { return s + r.totalCommissionTierce; }, 0);
            this.totalsPersonnelle = rows.reduce(function (s, r) { return s + r.totalCommissionPersonnelle; }, 0);
            this.totalsGlobale = rows.reduce(function (s, r) { return s + r.totalToutesCommissions; }, 0);
        };
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "selectedPersonRoleLabel", {
            get: function () {
                var _a;
                return ((_a = this.selectedPerson) === null || _a === void 0 ? void 0 : _a.role) === 'agent' ? 'Agent' : 'Super-Agent';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "selectedPersonThirdCommissionLabel", {
            get: function () {
                var _a;
                return ((_a = this.selectedPerson) === null || _a === void 0 ? void 0 : _a.role) === 'agent' ? 'Super-Agent' : 'Réseau';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "selectedPersonTransactionCount", {
            get: function () {
                var _a, _b;
                return (_b = (_a = this.selectedPerson) === null || _a === void 0 ? void 0 : _a.transactions.length) !== null && _b !== void 0 ? _b : 0;
            },
            enumerable: false,
            configurable: true
        });
        // ─── Modal ──────────────────────────────────────────────────────
        CommissionDashboardComponent_1.prototype.openDetail = function (person) {
            this.selectedPerson = person;
            this.modalTotalMontant = person.transactions.reduce(function (s, t) { return s + t.montant; }, 0);
            this.modalTotalEtat = person.transactions.reduce(function (s, t) { return s + t.commissions.etat; }, 0);
            this.modalTotalIblopay = person.transactions.reduce(function (s, t) { return s + t.commissions.iblopay; }, 0);
            this.modalTotalTierce = person.transactions.reduce(function (s, t) { return s + t.commissions.tierce; }, 0);
            this.modalTotalPersonnelle = person.transactions.reduce(function (s, t) { return s + t.commissions.personnelle; }, 0);
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
        };
        CommissionDashboardComponent_1.prototype.closeModal = function () {
            this.isModalOpen = false;
            this.selectedPerson = null;
            document.body.style.overflow = '';
        };
        // ─── CSV Export ──────────────────────────────────────────────────
        CommissionDashboardComponent_1.prototype.downloadCsv = function () {
            var _this = this;
            if (!this.selectedPerson)
                return;
            var tx = this.selectedPerson.transactions;
            var header = 'Référence;Date;Type;Montant (FBu);Commission État (FBu);Commission IBLOPay (FBu);Commission Tierce (FBu);Commission Personnelle (FBu);Total Commissions (FBu)';
            var rows = tx.map(function (t) {
                var totalCom = t.commissions.etat + t.commissions.iblopay + t.commissions.tierce + t.commissions.personnelle;
                return [
                    t.reference,
                    _this.formatDate(t.date),
                    _this.transactionTypeLabel(t.type),
                    t.montant.toLocaleString('fr-FR'),
                    t.commissions.etat.toLocaleString('fr-FR'),
                    t.commissions.iblopay.toLocaleString('fr-FR'),
                    t.commissions.tierce.toLocaleString('fr-FR'),
                    t.commissions.personnelle.toLocaleString('fr-FR'),
                    totalCom.toLocaleString('fr-FR'),
                ].join(';');
            });
            var totalRow = [
                'TOTAUX',
                '',
                '',
                this.modalTotalMontant.toLocaleString('fr-FR'),
                this.modalTotalEtat.toLocaleString('fr-FR'),
                this.modalTotalIblopay.toLocaleString('fr-FR'),
                this.modalTotalTierce.toLocaleString('fr-FR'),
                this.modalTotalPersonnelle.toLocaleString('fr-FR'),
                (this.modalTotalEtat + this.modalTotalIblopay + this.modalTotalTierce + this.modalTotalPersonnelle).toLocaleString('fr-FR'),
            ].join(';');
            var csv = '\uFEFF' + header + '\n' + rows.join('\n') + '\n' + totalRow;
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            var safeName = "".concat(this.selectedPerson.prenom, "_").concat(this.selectedPerson.nom).replace(/\s+/g, '_');
            a.href = url;
            a.download = "commissions_".concat(safeName, "_").concat(new Date().toISOString().slice(0, 10), ".csv");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        CommissionDashboardComponent_1.prototype.getInitials = function (nom, prenom) {
            return "".concat(prenom.charAt(0)).concat(nom.charAt(0)).toUpperCase();
        };
        // ─── Format helpers ──────────────────────────────────────────────
        CommissionDashboardComponent_1.prototype.formatBif = function (amount) {
            return "".concat(amount.toLocaleString('fr-FR'), " FBu");
        };
        CommissionDashboardComponent_1.prototype.formatDate = function (date) {
            var d = typeof date === 'string' ? new Date(date) : date;
            return d.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        };
        CommissionDashboardComponent_1.prototype.formatDateShort = function (date) {
            var d = typeof date === 'string' ? new Date(date) : date;
            return d.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
        };
        CommissionDashboardComponent_1.prototype.transactionTypeLabel = function (type) {
            var labels = {
                DEPOT: 'Dépôt',
                RETRAIT: 'Retrait',
                PAIEMENT_NFC: 'Paiement NFC',
                TRANSFERT: 'Transfert',
            };
            return labels[type] || type;
        };
        CommissionDashboardComponent_1.prototype.getTransactionTypeClass = function (type) {
            var classes = {
                DEPOT: 'type-depot',
                RETRAIT: 'type-retrait',
                PAIEMENT_NFC: 'type-nfc',
                TRANSFERT: 'type-transfert',
            };
            return classes[type] || '';
        };
        CommissionDashboardComponent_1.prototype.getAvatarColor = function (initials) {
            var colors = [
                '#3b82f6', '#a855f7', '#22c55e', '#f97316',
                '#ec4899', '#14b8a6', '#eab308', '#06b6d4',
            ];
            var hash = 0;
            for (var i = 0; i < initials.length; i++) {
                hash = initials.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length];
        };
        CommissionDashboardComponent_1.prototype.getMiniBarTitle = function (pct) {
            var e = pct.etat.toFixed(0);
            var i = pct.iblopay.toFixed(0);
            var t = pct.tierce.toFixed(0);
            var p = pct.personnelle.toFixed(0);
            return "\u00C9tat ".concat(e, "% \u00B7 IBLOPay ").concat(i, "% \u00B7 Tierce ").concat(t, "% \u00B7 Perso ").concat(p, "%");
        };
        CommissionDashboardComponent_1.prototype.getMiniBarPercentages = function (commissions) {
            var total = commissions.etat + commissions.iblopay + commissions.tierce + commissions.personnelle;
            if (total === 0)
                return { etat: 0, iblopay: 0, tierce: 0, personnelle: 0 };
            return {
                etat: (commissions.etat / total) * 100,
                iblopay: (commissions.iblopay / total) * 100,
                tierce: (commissions.tierce / total) * 100,
                personnelle: (commissions.personnelle / total) * 100,
            };
        };
        CommissionDashboardComponent_1.prototype.getBarPercentagesFromTotals = function (row) {
            var total = row.totalToutesCommissions;
            if (total === 0)
                return { etat: 0, iblopay: 0, tierce: 0, personnelle: 0 };
            return {
                etat: (row.totalCommissionEtat / total) * 100,
                iblopay: (row.totalCommissionIblopay / total) * 100,
                tierce: (row.totalCommissionTierce / total) * 100,
                personnelle: (row.totalCommissionPersonnelle / total) * 100,
            };
        };
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "percentageEtatGlobale", {
            get: function () {
                return this.totalToutesCommissions > 0 ? (this.totalCommissionEtat / this.totalToutesCommissions) * 100 : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "percentageIblopayGlobale", {
            get: function () {
                return this.totalToutesCommissions > 0 ? (this.totalCommissionIblopay / this.totalToutesCommissions) * 100 : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "percentageTierceGlobale", {
            get: function () {
                return this.totalToutesCommissions > 0 ? (this.totalCommissionTierce / this.totalToutesCommissions) * 100 : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CommissionDashboardComponent_1.prototype, "percentagePersonnelleGlobale", {
            get: function () {
                return this.totalToutesCommissions > 0 ? (this.totalCommissionPersonnelle / this.totalToutesCommissions) * 100 : 0;
            },
            enumerable: false,
            configurable: true
        });
        return CommissionDashboardComponent_1;
    }());
    __setFunctionName(_classThis, "CommissionDashboardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionDashboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionDashboardComponent = _classThis;
}();
export { CommissionDashboardComponent };
//# sourceMappingURL=commission-dashboard.component.js.map