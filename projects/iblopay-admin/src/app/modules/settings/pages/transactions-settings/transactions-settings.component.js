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
import { RouterModule } from '@angular/router';
var TransactionsSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-transactions-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './transactions-settings.component.html',
            styleUrls: ['./transactions-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TransactionsSettingsComponent = _classThis = /** @class */ (function () {
        function TransactionsSettingsComponent_1() {
            this.title = 'Gestion des Transactions';
            this.icon = '💸';
            this.pageSize = 10;
            this.currentDate = new Date().toLocaleDateString('fr-FR');
            this.activeTab = 'toutes';
            this.currentPage = 1;
            // Filtres
            this.searchTerm = '';
            this.filterStatut = 'tous';
            this.filterType = 'tous';
            this.filterPeriode = 'all';
            // Sélection
            this.selectedIds = new Set();
            this.transactions = [];
            this.toastSeq = 0;
            this.modalOpen = false;
            this.selectedTransaction = null;
            this.actionModalOpen = false;
            this.actionModalTitle = '';
            this.actionModalType = '';
            this.actionData = {};
            this.formData = {};
            this.toasts = [];
            this.initializeData();
        }
        TransactionsSettingsComponent_1.prototype.initializeData = function () {
            var types = [
                { key: 'depot', label: 'Dépôt', icon: '💰' },
                { key: 'retrait', label: 'Retrait', icon: '💳' },
                { key: 'transfert', label: 'Transfert Wallet', icon: '🔄' },
                { key: 'paiement', label: 'Paiement', icon: '💳' },
                { key: 'achat', label: 'Achat', icon: '🛍️' },
                { key: 'commission', label: 'Commission', icon: '💵' }
            ];
            var utilisateurs = [
                'Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA',
                'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA', 'Françoise NIKIZA'
            ];
            var agents = ['AG-001', 'AG-002', 'AG-003', 'AG-004', 'AG-005'];
            var statuts = ['effectuee', 'effectuee', 'effectuee', 'en_attente', 'annulee', 'echouee'];
            var descriptions = [
                'Dépôt en espèces', 'Retrait Mobile Money', 'Transfert vers compte',
                'Paiement marchand', 'Achat airtime', 'Commission agent',
                'Paiement facture', 'Transfert reçu', 'Dépôt par carte'
            ];
            var ips = ['192.168.1.1', '10.0.0.1', '172.16.0.1', '41.207.0.1', '197.0.0.1'];
            for (var i = 0; i < 60; i++) {
                var typeIndex = i % types.length;
                var type = types[typeIndex];
                var utilisateurIndex = i % utilisateurs.length;
                var utilisateur = utilisateurs[utilisateurIndex];
                var agentIndex = i % agents.length;
                var agent = agents[agentIndex];
                var statutIndex = i % statuts.length;
                var statut = statuts[statutIndex];
                var descriptionIndex = i % descriptions.length;
                var description = descriptions[descriptionIndex];
                var ipIndex = i % ips.length;
                var ip = ips[ipIndex];
                var montant = 1000 + Math.floor(Math.random() * 200000);
                var date = new Date(Date.now() - i * 3600000 * (1 + Math.floor(Math.random() * 24)));
                this.transactions.push({
                    id: "TXN-".concat(String(100000 + i).padStart(6, '0')),
                    type: type.key,
                    typeLabel: type.label,
                    montant: montant,
                    utilisateur: utilisateur,
                    agent: agent,
                    date: date.toLocaleString('fr-FR'),
                    statut: statut,
                    description: description,
                    reference: "REF-".concat(String(100000 + i).padStart(6, '0')),
                    ip: ip
                });
            }
        };
        // ========== SÉLECTION ==========
        TransactionsSettingsComponent_1.prototype.toggleSelection = function (id) {
            if (this.selectedIds.has(id)) {
                this.selectedIds.delete(id);
            }
            else {
                this.selectedIds.add(id);
            }
        };
        TransactionsSettingsComponent_1.prototype.toggleAll = function (event) {
            var _this = this;
            if (event.target.checked) {
                this.getPaginatedFilteredTransactions().forEach(function (t) { return _this.selectedIds.add(t.id); });
            }
            else {
                this.selectedIds.clear();
            }
        };
        TransactionsSettingsComponent_1.prototype.isSelected = function (id) {
            return this.selectedIds.has(id);
        };
        TransactionsSettingsComponent_1.prototype.isAllSelected = function () {
            var _this = this;
            var list = this.getPaginatedFilteredTransactions();
            return list.length > 0 && list.every(function (t) { return _this.selectedIds.has(t.id); });
        };
        TransactionsSettingsComponent_1.prototype.getSelectedCount = function () {
            return this.selectedIds.size;
        };
        // ========== STATISTIQUES ==========
        TransactionsSettingsComponent_1.prototype.getAllTransactions = function () {
            return this.transactions;
        };
        TransactionsSettingsComponent_1.prototype.getTransactionsByStatut = function (statut) {
            return this.transactions.filter(function (t) { return t.statut === statut; });
        };
        TransactionsSettingsComponent_1.prototype.getMontantTotal = function () {
            return this.transactions.reduce(function (sum, t) { return sum + t.montant; }, 0);
        };
        TransactionsSettingsComponent_1.prototype.getMontantMoyen = function () {
            return this.transactions.length > 0 ? this.getMontantTotal() / this.transactions.length : 0;
        };
        TransactionsSettingsComponent_1.prototype.getTypesCount = function () {
            return new Set(this.transactions.map(function (t) { return t.type; })).size;
        };
        TransactionsSettingsComponent_1.prototype.getTransactionsEnAttente = function () {
            return this.transactions.filter(function (t) { return t.statut === 'en_attente'; });
        };
        TransactionsSettingsComponent_1.prototype.getTransactionsEchouees = function () {
            return this.transactions.filter(function (t) { return t.statut === 'echouee'; });
        };
        TransactionsSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                effectuee: '✅ Effectuée',
                en_attente: '⏳ En attente',
                annulee: '❌ Annulée',
                echouee: '⚠️ Échouée'
            };
            return labels[statut] || statut;
        };
        TransactionsSettingsComponent_1.prototype.getTypeClass = function (type) {
            var classes = {
                depot: 'depot',
                retrait: 'retrait',
                transfert: 'transfert',
                paiement: 'paiement',
                achat: 'achat',
                commission: 'commission'
            };
            return classes[type] || '';
        };
        // ========== ANALYTIQUE ==========
        TransactionsSettingsComponent_1.prototype.getAnalyticsData = function () {
            var total = this.transactions.length;
            var effectuees = this.getTransactionsByStatut('effectuee').length;
            var enAttente = this.getTransactionsByStatut('en_attente').length;
            var annulees = this.getTransactionsByStatut('annulee').length;
            var echouees = this.getTransactionsByStatut('echouee').length;
            var montantTotal = this.getMontantTotal();
            return [
                {
                    icon: '✅',
                    label: 'Taux de succès',
                    value: "".concat(Math.round((effectuees / total) * 100), "%"),
                    sub: "".concat(effectuees, " sur ").concat(total, " transactions"),
                    trend: effectuees / total > 0.8 ? 'up' : 'down',
                    trendValue: "".concat(Math.round((effectuees / total) * 100), "%")
                },
                {
                    icon: '💰',
                    label: 'Volume total',
                    value: "".concat((montantTotal / 1000000).toFixed(1), "M BIF"),
                    sub: "".concat(montantTotal.toLocaleString('fr-FR'), " BIF"),
                    trend: 'up',
                    trendValue: '+12%'
                },
                {
                    icon: '⏳',
                    label: 'En attente',
                    value: enAttente,
                    sub: "".concat(Math.round((enAttente / total) * 100), "% du total"),
                    trend: enAttente > 5 ? 'down' : 'up',
                    trendValue: enAttente > 5 ? '-5%' : '+3%'
                },
                {
                    icon: '⚠️',
                    label: 'Échouées',
                    value: echouees,
                    sub: "".concat(Math.round((echouees / total) * 100), "% du total"),
                    trend: echouees > 10 ? 'down' : 'up',
                    trendValue: echouees > 10 ? '-8%' : '+2%'
                },
                {
                    icon: '📊',
                    label: 'Montant moyen',
                    value: "".concat((this.getMontantMoyen() / 1000).toFixed(1), "K BIF"),
                    sub: "".concat(this.getMontantMoyen().toLocaleString('fr-FR'), " BIF"),
                    trend: 'up',
                    trendValue: '+5%'
                },
                {
                    icon: '🔄',
                    label: 'Types différents',
                    value: this.getTypesCount(),
                    sub: "".concat(this.getTypesCount(), " types de transactions"),
                    trend: 'up',
                    trendValue: '+1'
                }
            ];
        };
        // ========== FILTRES ==========
        TransactionsSettingsComponent_1.prototype.getFilteredTransactions = function () {
            var _this = this;
            var result = this.transactions;
            if (this.searchTerm) {
                var term_1 = this.searchTerm.toLowerCase();
                result = result.filter(function (t) {
                    return t.id.toLowerCase().includes(term_1) ||
                        t.utilisateur.toLowerCase().includes(term_1) ||
                        t.agent.toLowerCase().includes(term_1) ||
                        t.typeLabel.toLowerCase().includes(term_1) ||
                        (t.reference && t.reference.toLowerCase().includes(term_1));
                });
            }
            if (this.filterStatut !== 'tous') {
                result = result.filter(function (t) { return t.statut === _this.filterStatut; });
            }
            if (this.filterType !== 'tous') {
                result = result.filter(function (t) { return t.type === _this.filterType; });
            }
            if (this.filterPeriode !== 'all') {
                var now_1 = new Date();
                result = result.filter(function (t) {
                    var date = new Date(t.date);
                    if (_this.filterPeriode === 'today') {
                        return date.toDateString() === now_1.toDateString();
                    }
                    else if (_this.filterPeriode === 'week') {
                        var weekAgo = new Date(now_1);
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return date >= weekAgo;
                    }
                    else if (_this.filterPeriode === 'month') {
                        var monthAgo = new Date(now_1);
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        return date >= monthAgo;
                    }
                    return true;
                });
            }
            return result;
        };
        TransactionsSettingsComponent_1.prototype.onSearchChange = function () {
            this.currentPage = 1;
            this.selectedIds.clear();
        };
        TransactionsSettingsComponent_1.prototype.onFilterChange = function () {
            this.currentPage = 1;
            this.selectedIds.clear();
        };
        // ========== PAGINATION ==========
        TransactionsSettingsComponent_1.prototype.getPaginatedFilteredTransactions = function () {
            var start = (this.currentPage - 1) * this.pageSize;
            return this.getFilteredTransactions().slice(start, start + this.pageSize);
        };
        TransactionsSettingsComponent_1.prototype.getTotalFilteredPages = function () {
            return Math.ceil(this.getFilteredTransactions().length / this.pageSize);
        };
        TransactionsSettingsComponent_1.prototype.getCurrentPage = function () {
            return this.currentPage;
        };
        TransactionsSettingsComponent_1.prototype.nextPage = function () {
            if (this.currentPage < this.getTotalFilteredPages()) {
                this.currentPage++;
                this.selectedIds.clear();
            }
        };
        TransactionsSettingsComponent_1.prototype.previousPage = function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.selectedIds.clear();
            }
        };
        TransactionsSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPage = 1;
            this.selectedIds.clear();
        };
        // ========== TYPES ==========
        TransactionsSettingsComponent_1.prototype.getTypes = function () {
            var _this = this;
            var typeMap = new Map();
            this.transactions.forEach(function (t) {
                if (!typeMap.has(t.type)) {
                    typeMap.set(t.type, {
                        key: t.type,
                        label: t.typeLabel,
                        count: 0,
                        total: 0,
                        icon: _this.getTypeIcon(t.type),
                        effectuees: 0,
                        enAttente: 0
                    });
                }
                var data = typeMap.get(t.type);
                if (data) {
                    data.count++;
                    data.total += t.montant;
                    if (t.statut === 'effectuee')
                        data.effectuees++;
                    if (t.statut === 'en_attente')
                        data.enAttente++;
                }
            });
            return Array.from(typeMap.values());
        };
        TransactionsSettingsComponent_1.prototype.getTypeIcon = function (type) {
            var icons = {
                depot: '💰',
                retrait: '💳',
                transfert: '🔄',
                paiement: '💳',
                achat: '🛍️',
                commission: '💵'
            };
            return icons[type] || '📋';
        };
        TransactionsSettingsComponent_1.prototype.filterByType = function (type) {
            this.filterType = type;
            this.activeTab = 'toutes';
            this.currentPage = 1;
            this.selectedIds.clear();
        };
        // ========== FILTRES ==========
        TransactionsSettingsComponent_1.prototype.getFiltres = function () {
            var now = new Date();
            return [
                { key: 'date', label: 'Date', icon: '📅', description: 'Filtrer par date', value: now.toLocaleDateString('fr-FR') },
                { key: 'heure', label: 'Heure', icon: '🕐', description: 'Filtrer par heure', value: now.toLocaleTimeString('fr-FR') },
                { key: 'type', label: 'Type', icon: '🔀', description: 'Filtrer par type de transaction', value: this.filterType !== 'tous' ? this.filterType : 'Tous' },
                { key: 'statut', label: 'Statut', icon: '📊', description: 'Filtrer par statut', value: this.filterStatut !== 'tous' ? this.filterStatut : 'Tous' },
                { key: 'utilisateur', label: 'Utilisateur', icon: '👤', description: 'Filtrer par utilisateur' },
                { key: 'agent', label: 'Agent', icon: '🧑‍💼', description: 'Filtrer par agent' },
                { key: 'super_agent', label: 'Super Agent', icon: '👨‍💼', description: 'Filtrer par super agent' },
                { key: 'province', label: 'Province', icon: '🗺️', description: 'Filtrer par province' },
                { key: 'commune', label: 'Commune', icon: '🏘️', description: 'Filtrer par commune' },
                { key: 'montant', label: 'Montant', icon: '💰', description: 'Filtrer par montant', value: 'Min - Max' }
            ];
        };
        TransactionsSettingsComponent_1.prototype.getFilterOptions = function (filterType) {
            var options = {
                type: ['Dépôt', 'Retrait', 'Transfert Wallet', 'Paiement', 'Achat', 'Commission'],
                statut: ['Effectuée', 'En attente', 'Annulée', 'Échouée'],
                utilisateur: ['Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA', 'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA'],
                agent: ['AG-001', 'AG-002', 'AG-003', 'AG-004', 'AG-005'],
                super_agent: ['SA-001', 'SA-002', 'SA-003'],
                province: ['Bujumbura Mairie', 'Gitega', 'Ngozi', 'Muyinga', 'Bururi'],
                commune: ['Mukaza', 'Ntahangwa', 'Muha', 'Gitega', 'Nyanza-Lac']
            };
            return options[filterType] || [];
        };
        TransactionsSettingsComponent_1.prototype.openFilter = function (filter) {
            this.openAction(filter.key);
        };
        // ========== ACTIONS ==========
        TransactionsSettingsComponent_1.prototype.openTransactionDetails = function (transaction) {
            this.selectedTransaction = transaction;
            this.modalOpen = true;
        };
        TransactionsSettingsComponent_1.prototype.openAction = function (actionId, transaction) {
            if (transaction) {
                this.selectedTransaction = transaction;
            }
            this.actionModalType = actionId;
            this.actionModalTitle = this.getActionTitle(actionId);
            this.actionModalOpen = true;
            this.formData = {};
        };
        TransactionsSettingsComponent_1.prototype.getActionTitle = function (actionId) {
            var titles = {
                voir: '📊 Vue d\'ensemble des transactions',
                exporter: '📤 Exporter les transactions',
                imprimer: '🖨️ Imprimer les transactions',
                telecharger_reçu: '📄 Télécharger le reçu',
                corriger: '🔧 Corriger la transaction',
                reattribuer: '🔄 Réattribuer la transaction',
                annuler: '❌ Annuler la transaction',
                annuler_selection: '❌ Annuler les transactions sélectionnées',
                frauduleuse: '🚫 Marquer comme frauduleuse',
                partager: '📤 Partager la transaction',
                date: '📅 Filtrer par date',
                heure: '🕐 Filtrer par heure',
                type: '🔀 Filtrer par type',
                statut: '📊 Filtrer par statut',
                utilisateur: '👤 Filtrer par utilisateur',
                agent: '🧑‍💼 Filtrer par agent',
                super_agent: '👨‍💼 Filtrer par super agent',
                province: '🗺️ Filtrer par province',
                commune: '🏘️ Filtrer par commune',
                montant: '💰 Filtrer par montant'
            };
            return titles[actionId] || actionId;
        };
        TransactionsSettingsComponent_1.prototype.getActionIcon = function () {
            var icons = {
                exporter: '📤',
                imprimer: '🖨️',
                telecharger_reçu: '📄',
                corriger: '🔧',
                reattribuer: '🔄',
                annuler: '❌',
                annuler_selection: '❌',
                frauduleuse: '🚫',
                partager: '📤',
                date: '📅',
                heure: '🕐',
                type: '🔀',
                statut: '📊',
                utilisateur: '👤',
                agent: '🧑‍💼',
                super_agent: '👨‍💼',
                province: '🗺️',
                commune: '🏘️',
                montant: '💰'
            };
            return icons[this.actionModalType] || '📋';
        };
        TransactionsSettingsComponent_1.prototype.confirmAction = function () {
            switch (this.actionModalType) {
                case 'exporter':
                    this.exportTransactions();
                    break;
                case 'corriger':
                    this.corrigerTransaction();
                    break;
                case 'annuler':
                    this.annulerTransaction();
                    break;
                case 'annuler_selection':
                    this.annulerSelection();
                    break;
                case 'telecharger_reçu':
                    this.toast('Reçu téléchargé avec succès.', 'success');
                    break;
                case 'reattribuer':
                    this.reattribuerTransaction();
                    break;
                case 'frauduleuse':
                    this.marquerFrauduleuse();
                    break;
                case 'partager':
                    this.partagerTransaction();
                    break;
                default:
                    this.toast("Filtre \"".concat(this.actionModalType, "\" appliqu\u00E9."), 'info');
            }
            this.closeActionModal();
        };
        // ========== ACTIONS MÉTIER ==========
        TransactionsSettingsComponent_1.prototype.exportTransactions = function () {
            var _this = this;
            var format = this.formData.format || 'excel';
            var periode = this.formData.periode || 'all';
            this.toast("Export en cours (".concat(format, ")..."), 'info');
            setTimeout(function () {
                _this.toast("Export termin\u00E9 avec succ\u00E8s (".concat(format, ")"), 'success');
            }, 1500);
        };
        TransactionsSettingsComponent_1.prototype.corrigerTransaction = function () {
            if (!this.selectedTransaction)
                return;
            var raison = this.formData.raison || 'Correction';
            var nouveauMontant = this.formData.montant;
            var nouveauType = this.formData.type;
            if (nouveauMontant) {
                this.selectedTransaction.montant = nouveauMontant;
            }
            if (nouveauType) {
                var types = {
                    depot: 'Dépôt',
                    retrait: 'Retrait',
                    transfert: 'Transfert Wallet',
                    paiement: 'Paiement',
                    achat: 'Achat',
                    commission: 'Commission'
                };
                this.selectedTransaction.typeLabel = types[nouveauType] || this.selectedTransaction.typeLabel;
                this.selectedTransaction.type = nouveauType;
            }
            this.selectedTransaction.description = "Corrig\u00E9: ".concat(raison);
            this.toast("Transaction ".concat(this.selectedTransaction.id, " corrig\u00E9e avec succ\u00E8s."), 'success');
        };
        TransactionsSettingsComponent_1.prototype.annulerTransaction = function () {
            if (!this.selectedTransaction)
                return;
            var raison = this.formData.raison || 'Annulation';
            this.selectedTransaction.statut = 'annulee';
            this.selectedTransaction.description = "Annul\u00E9: ".concat(raison);
            this.toast("Transaction ".concat(this.selectedTransaction.id, " annul\u00E9e avec succ\u00E8s."), 'warning');
        };
        TransactionsSettingsComponent_1.prototype.annulerSelection = function () {
            var _this = this;
            var ids = Array.from(this.selectedIds);
            if (ids.length === 0) {
                this.toast('Aucune transaction sélectionnée.', 'danger');
                return;
            }
            var raison = this.formData.raison || 'Annulation en masse';
            ids.forEach(function (id) {
                var transaction = _this.transactions.find(function (t) { return t.id === id; });
                if (transaction) {
                    transaction.statut = 'annulee';
                    transaction.description = "Annul\u00E9 en masse: ".concat(raison);
                }
            });
            this.selectedIds.clear();
            this.toast("".concat(ids.length, " transaction(s) annul\u00E9e(s) avec succ\u00E8s."), 'warning');
        };
        TransactionsSettingsComponent_1.prototype.reattribuerTransaction = function () {
            if (!this.selectedTransaction)
                return;
            var nouvelUtilisateur = this.formData.nouvelUtilisateur;
            var nouvelAgent = this.formData.nouvelAgent;
            if (nouvelUtilisateur) {
                this.selectedTransaction.utilisateur = nouvelUtilisateur;
            }
            if (nouvelAgent) {
                this.selectedTransaction.agent = nouvelAgent;
            }
            this.toast("Transaction ".concat(this.selectedTransaction.id, " r\u00E9attribu\u00E9e avec succ\u00E8s."), 'success');
        };
        TransactionsSettingsComponent_1.prototype.marquerFrauduleuse = function () {
            if (!this.selectedTransaction)
                return;
            var raison = this.formData.raison || 'Signalement';
            var risque = this.formData.risque || 'moyen';
            this.selectedTransaction.statut = 'annulee';
            this.selectedTransaction.description = "FRAUDULEUSE (".concat(risque, "): ").concat(raison);
            this.toast("Transaction ".concat(this.selectedTransaction.id, " marqu\u00E9e comme frauduleuse."), 'danger');
        };
        TransactionsSettingsComponent_1.prototype.partagerTransaction = function () {
            if (!this.selectedTransaction)
                return;
            var methode = this.formData.methode || 'email';
            var destinataire = this.formData.destinataire || 'Non spécifié';
            var message = this.formData.message || '';
            this.toast("Transaction partag\u00E9e via ".concat(methode, " vers ").concat(destinataire, "."), 'success');
        };
        // ========== EXPORT ET IMPRESSION ==========
        TransactionsSettingsComponent_1.prototype.exportExcel = function () {
            var _this = this;
            this.toast('Export Excel des transactions en cours...', 'info');
            setTimeout(function () {
                _this.toast('Export Excel terminé avec succès.', 'success');
            }, 1000);
        };
        TransactionsSettingsComponent_1.prototype.printList = function () {
            this.toast('Impression de la liste en cours...', 'info');
            window.print();
        };
        TransactionsSettingsComponent_1.prototype.printTransaction = function () {
            this.toast('Impression du reçu en cours...', 'info');
            window.print();
        };
        // ========== MODALES ==========
        TransactionsSettingsComponent_1.prototype.closeModal = function () {
            this.modalOpen = false;
            this.selectedTransaction = null;
        };
        TransactionsSettingsComponent_1.prototype.closeActionModal = function () {
            this.actionModalOpen = false;
            this.actionModalType = '';
            this.actionModalTitle = '';
            this.formData = {};
            this.selectedTransaction = null;
        };
        // ========== TOASTS ==========
        TransactionsSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        TransactionsSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return TransactionsSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "TransactionsSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionsSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionsSettingsComponent = _classThis;
}();
export { TransactionsSettingsComponent };
//# sourceMappingURL=transactions-settings.component.js.map