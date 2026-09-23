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
var CardsSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-cards-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './cards-settings.component.html',
            styleUrls: ['./cards-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CardsSettingsComponent = _classThis = /** @class */ (function () {
        function CardsSettingsComponent_1() {
            this.title = 'Gestion des Cartes';
            this.icon = '💳';
            this.pageSize = 10;
            this.activeTab = 'cartes';
            this.currentPages = {
                cartes: 1,
                stocks: 1
            };
            // Filtres
            this.searchTerm = '';
            this.filterStatut = 'tous';
            this.filterType = 'tous';
            this.cartes = [];
            this.historique = [];
            this.toastSeq = 0;
            this.modalOpen = false;
            this.selectedCard = null;
            // Gestion du PIN
            this.pinModalOpen = false;
            this.pinActionType = '';
            this.pinData = {};
            this.pinError = false;
            this.actionModalOpen = false;
            this.actionModalTitle = '';
            this.actionModalType = '';
            this.formData = {
                pin: '',
                nouveauPin: '',
                confirmPin: ''
            };
            this.historiqueCartes = [];
            this.toasts = [];
            // ========== GESTION PIN ==========
            this.pendingAction = null;
            this.initializeData();
        }
        CardsSettingsComponent_1.prototype.initializeData = function () {
            var utilisateurs = [
                { id: 'CL-001', nom: 'Jean NDAYISHIMIYE' },
                { id: 'CL-002', nom: 'Marie NSABIMANA' },
                { id: 'CL-003', nom: 'Pierre NIZIGIYIMANA' },
                { id: 'CL-004', nom: 'Claire NDIKUMANA' },
                { id: 'CL-005', nom: 'Emmanuel NTAKIRUTIMANA' },
                { id: 'CL-006', nom: 'Françoise NIKIZA' },
                { id: 'CL-007', nom: 'Joseph NISHIMWE' },
                { id: 'CL-008', nom: 'Jeanne NIYONKURU' },
                { id: 'CL-009', nom: 'Michel NIZEYIMANA' },
                { id: 'CL-010', nom: 'Thérèse NSANZABAGANWA' },
                { id: 'CL-011', nom: 'Gaston NTEZIMANA' },
                { id: 'CL-012', nom: 'Odette NIYONGABO' }
            ];
            for (var i = 0; i < 60; i++) {
                var isParent = i % 3 === 0;
                var userIndex = i % utilisateurs.length;
                var user = utilisateurs[userIndex] || utilisateurs[0];
                var dateEmission = new Date(Date.now() - i * 86400000 * 15);
                var dateExpiration = new Date(dateEmission);
                dateExpiration.setFullYear(dateExpiration.getFullYear() + 3);
                var statuts = ['active', 'active', 'active', 'bloquee', 'desactivee', 'inactive'];
                var statutIndex = i % statuts.length;
                var statut = statuts[statutIndex] || 'active';
                this.cartes.push({
                    id: "CARD-".concat(String(i + 1).padStart(4, '0')),
                    numero: "IBLO".concat(String(100000 + i).padStart(6, '0')),
                    uid: "UID-".concat(String(10000 + i).padStart(5, '0')),
                    typeCarte: isParent ? 'parent' : 'enfant',
                    utilisateur: user ? user.nom : 'Utilisateur Inconnu',
                    userId: user ? user.id : 'UNKNOWN',
                    solde: isParent ? 100000 + Math.floor(Math.random() * 400000) : 5000 + Math.floor(Math.random() * 50000),
                    statut: statut,
                    dateEmission: dateEmission.toLocaleDateString('fr-FR'),
                    dateExpiration: dateExpiration.toLocaleDateString('fr-FR')
                });
            }
            // Générer l'historique complet avec 5 lignes par carte
            var actions = [
                'Paiement Bus', 'Paiement Taxi', 'Achat Marché', 'Achat Engrais Chimique',
                'Paiement Électricité', 'Achat Nourriture', 'Transfert Mobile', 'Paiement Eau',
                'Achat Pharmacie', 'Paiement Scolarité', 'Achat Vêtements', 'Paiement Loyer',
                'Achat Matériel', 'Paiement Service', 'Achat Carburant', 'Paiement Internet',
                'Achat Entretien', 'Paiement Assurance', 'Achat Semences', 'Paiement Santé'
            ];
            var montants = [5000, 10000, 15000, 20000, 25000, 30000, 50000, 75000, 100000, 200000];
            // Générer 5 transactions par carte
            for (var i = 0; i < this.cartes.length; i++) {
                var card = this.cartes[i];
                if (card) {
                    for (var j = 0; j < 5; j++) {
                        var montantIndex = Math.floor(Math.random() * montants.length);
                        var montant = montants[montantIndex] || 10000;
                        var isCredit = Math.random() > 0.5;
                        var actionIndex = Math.floor(Math.random() * actions.length);
                        var action = actions[actionIndex] || 'Transaction';
                        this.historique.push({
                            date: new Date(Date.now() - (i * 5 + j) * 86400000 * (1 + Math.floor(Math.random() * 3))).toLocaleString('fr-FR'),
                            action: action,
                            detail: "Carte ".concat(card.numero, " - ").concat(action),
                            utilisateur: card.utilisateur,
                            montant: (isCredit ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
                            isCredit: isCredit,
                            montantValue: montant
                        });
                    }
                }
            }
        };
        // ========== FILTRES ==========
        CardsSettingsComponent_1.prototype.getFilteredCartes = function () {
            var _this = this;
            var result = this.cartes;
            if (this.searchTerm) {
                var term_1 = this.searchTerm.toLowerCase();
                result = result.filter(function (c) {
                    return c.numero.toLowerCase().includes(term_1) ||
                        c.uid.toLowerCase().includes(term_1) ||
                        c.id.toLowerCase().includes(term_1) ||
                        c.utilisateur.toLowerCase().includes(term_1) ||
                        c.userId.toLowerCase().includes(term_1);
                });
            }
            if (this.filterStatut !== 'tous') {
                result = result.filter(function (c) { return c.statut === _this.filterStatut; });
            }
            if (this.filterType !== 'tous') {
                result = result.filter(function (c) { return c.typeCarte === _this.filterType; });
            }
            return result;
        };
        CardsSettingsComponent_1.prototype.getFilteredStock = function () {
            var result = this.getCartesInactives();
            if (this.searchTerm) {
                var term_2 = this.searchTerm.toLowerCase();
                result = result.filter(function (c) {
                    return c.numero.toLowerCase().includes(term_2) ||
                        c.uid.toLowerCase().includes(term_2) ||
                        c.id.toLowerCase().includes(term_2);
                });
            }
            return result;
        };
        CardsSettingsComponent_1.prototype.onSearchChange = function () {
            this.currentPages['cartes'] = 1;
            this.currentPages['stocks'] = 1;
        };
        CardsSettingsComponent_1.prototype.onFilterChange = function () {
            this.currentPages['cartes'] = 1;
            this.currentPages['stocks'] = 1;
        };
        // ========== STATISTIQUES ==========
        CardsSettingsComponent_1.prototype.getTotalCartes = function () {
            return this.cartes.length;
        };
        CardsSettingsComponent_1.prototype.getCartesByStatut = function (statut) {
            return this.cartes.filter(function (c) { return c.statut === statut; });
        };
        CardsSettingsComponent_1.prototype.getCartesParent = function () {
            return this.cartes.filter(function (c) { return c.typeCarte === 'parent'; });
        };
        CardsSettingsComponent_1.prototype.getCartesEnfant = function () {
            return this.cartes.filter(function (c) { return c.typeCarte === 'enfant'; });
        };
        CardsSettingsComponent_1.prototype.getCartesInactives = function () {
            return this.cartes.filter(function (c) { return c.statut === 'inactive'; });
        };
        CardsSettingsComponent_1.prototype.getAllCartes = function () {
            return this.cartes;
        };
        CardsSettingsComponent_1.prototype.getStockTotal = function () {
            return this.getCartesInactives().length;
        };
        CardsSettingsComponent_1.prototype.getTotalGeneral = function () {
            return this.getTotalCartes() + this.getStockTotal();
        };
        CardsSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                active: 'Active',
                bloquee: 'Bloquée',
                desactivee: 'Désactivée',
                expiree: 'Expirée',
                inactive: 'Inactive'
            };
            return labels[statut] || statut;
        };
        // ========== PAGINATION ==========
        CardsSettingsComponent_1.prototype.getPaginatedFilteredCartes = function () {
            var page = this.currentPages['cartes'] || 1;
            var start = (page - 1) * this.pageSize;
            return this.getFilteredCartes().slice(start, start + this.pageSize);
        };
        CardsSettingsComponent_1.prototype.getPaginatedFilteredStock = function () {
            var page = this.currentPages['stocks'] || 1;
            var start = (page - 1) * this.pageSize;
            return this.getFilteredStock().slice(start, start + this.pageSize);
        };
        CardsSettingsComponent_1.prototype.getTotalFilteredPages = function (type) {
            var items = type === 'cartes' ? this.getFilteredCartes() : this.getFilteredStock();
            return Math.ceil(items.length / this.pageSize);
        };
        CardsSettingsComponent_1.prototype.getCurrentPage = function (type) {
            return this.currentPages[type] || 1;
        };
        CardsSettingsComponent_1.prototype.nextPage = function (type) {
            var totalPages = this.getTotalFilteredPages(type);
            var currentPage = this.currentPages[type] || 1;
            if (currentPage < totalPages) {
                this.currentPages[type] = currentPage + 1;
            }
        };
        CardsSettingsComponent_1.prototype.previousPage = function (type) {
            var currentPage = this.currentPages[type] || 1;
            if (currentPage > 1) {
                this.currentPages[type] = currentPage - 1;
            }
        };
        CardsSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPages[tab] = 1;
        };
        CardsSettingsComponent_1.prototype.openCardAction = function (card, action) {
            this.selectedCard = card;
            this.pendingAction = { type: action, card: card };
            this.formData = {
                cardId: card.id,
                pin: '',
                nouveauPin: '',
                confirmPin: ''
            };
            this.pinError = false;
            this.pinModalOpen = true;
            this.pinActionType = action;
            this.pinData = { cardId: card.id };
        };
        CardsSettingsComponent_1.prototype.onPinChange = function () {
            if (this.formData.pin.length === 4) {
                this.pinError = false;
            }
        };
        CardsSettingsComponent_1.prototype.closePinModal = function () {
            this.pinModalOpen = false;
            this.formData.pin = '';
            this.pinError = false;
            this.pendingAction = null;
        };
        CardsSettingsComponent_1.prototype.confirmPin = function () {
            if (this.formData.pin !== '1234') {
                this.pinError = true;
                this.formData.pin = '';
                return;
            }
            this.pinError = false;
            this.pinModalOpen = false;
            if (this.pendingAction) {
                this.actionModalType = this.pendingAction.type;
                this.actionModalTitle = this.getActionTitle(this.pendingAction.type);
                this.actionModalOpen = true;
                this.formData.pin = '';
                if (this.pendingAction.card) {
                    this.selectedCard = this.pendingAction.card;
                }
            }
        };
        CardsSettingsComponent_1.prototype.getActionIcon = function () {
            var icons = {
                emettre: '➕',
                associer: '🔗',
                desassocier: '🔓',
                activer: '✅',
                desactiver: '⛔',
                bloquer: '🔒',
                debloquer: '🔓',
                renouveler: '🔄',
                reinitialiser_pin: '🔢',
                detruire: '🗑️'
            };
            return icons[this.actionModalType] || '📋';
        };
        // ========== ACTIONS ==========
        CardsSettingsComponent_1.prototype.openAction = function (actionId) {
            this.actionModalType = actionId;
            this.actionModalTitle = this.getActionTitle(actionId);
            this.actionModalOpen = true;
            this.formData = { pin: '', nouveauPin: '', confirmPin: '' };
            if (actionId === 'historique') {
                this.historiqueCartes = this.historique.slice(0, 20);
            }
        };
        CardsSettingsComponent_1.prototype.openCardDetails = function (card) {
            this.selectedCard = card;
            this.modalOpen = true;
        };
        CardsSettingsComponent_1.prototype.openCardHistory = function (card) {
            this.selectedCard = card;
            this.actionModalType = 'historique';
            this.actionModalTitle = "Historique - ".concat(card.numero);
            this.actionModalOpen = true;
            this.formData = { pin: '' };
            // Filtrer l'historique pour la carte sélectionnée
            this.historiqueCartes = this.historique
                .filter(function (h) { return h.detail.includes(card.numero); })
                .sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                .slice(0, 10);
            if (this.historiqueCartes.length === 0) {
                // Si pas d'historique, générer un historique factice
                this.historiqueCartes = this.generateFakeHistory(card);
            }
        };
        CardsSettingsComponent_1.prototype.generateFakeHistory = function (card) {
            var actions = ['Paiement Bus', 'Paiement Taxi', 'Achat Marché', 'Achat Engrais Chimique'];
            var montants = [5000, 10000, 15000, 25000, 30000, 50000];
            var history = [];
            for (var i = 0; i < 5; i++) {
                var montant = montants[Math.floor(Math.random() * montants.length)] || 10000;
                var isCredit = Math.random() > 0.5;
                history.push({
                    date: new Date(Date.now() - i * 86400000 * (1 + Math.floor(Math.random() * 3))).toLocaleString('fr-FR'),
                    action: actions[Math.floor(Math.random() * actions.length)],
                    detail: "Carte ".concat(card.numero, " - ").concat(actions[Math.floor(Math.random() * actions.length)]),
                    utilisateur: card.utilisateur,
                    montant: (isCredit ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
                    isCredit: isCredit,
                    montantValue: montant
                });
            }
            return history;
        };
        CardsSettingsComponent_1.prototype.getActionClass = function (action) {
            var creditActions = ['Dépôt', 'Crédit', 'Réception', 'Transfert reçu'];
            var debitActions = ['Retrait', 'Débit', 'Paiement', 'Transfert envoyé', 'Achat'];
            for (var _i = 0, creditActions_1 = creditActions; _i < creditActions_1.length; _i++) {
                var ca = creditActions_1[_i];
                if (action.includes(ca))
                    return 'credit';
            }
            for (var _a = 0, debitActions_1 = debitActions; _a < debitActions_1.length; _a++) {
                var da = debitActions_1[_a];
                if (action.includes(da))
                    return 'debit';
            }
            return 'neutral';
        };
        CardsSettingsComponent_1.prototype.getMontantClass = function (montant) {
            if (!montant)
                return '';
            if (montant.startsWith('+'))
                return 'montant-credit';
            if (montant.startsWith('-'))
                return 'montant-debit';
            return 'montant-neutral';
        };
        CardsSettingsComponent_1.prototype.getActionTitle = function (actionId) {
            var titles = {
                emettre: 'Émettre une nouvelle carte',
                associer: 'Associer une carte à un utilisateur',
                desassocier: 'Désassocier une carte',
                activer: 'Activer une carte',
                desactiver: 'Désactiver une carte',
                bloquer: 'Bloquer une carte',
                debloquer: 'Débloquer une carte',
                renouveler: 'Renouveler une carte',
                reinitialiser_pin: 'Réinitialiser le PIN',
                historique: 'Historique des cartes',
                inventaire: 'Inventaire des cartes',
                detruire: 'Détruire une carte'
            };
            return titles[actionId] || actionId;
        };
        CardsSettingsComponent_1.prototype.confirmAction = function () {
            switch (this.actionModalType) {
                case 'emettre':
                    this.emettreCarte();
                    break;
                case 'associer':
                    this.associerCarte();
                    break;
                case 'desassocier':
                    this.desassocierCarte();
                    break;
                case 'activer':
                    this.activerCarte();
                    break;
                case 'desactiver':
                    this.desactiverCarte();
                    break;
                case 'bloquer':
                    this.bloquerCarte();
                    break;
                case 'debloquer':
                    this.debloquerCarte();
                    break;
                case 'renouveler':
                    this.renouvelerCarte();
                    break;
                case 'reinitialiser_pin':
                    this.reinitialiserPin();
                    break;
                case 'detruire':
                    this.detruireCarte();
                    break;
                default:
                    this.toast("Action \"".concat(this.actionModalType, "\" ex\u00E9cut\u00E9e avec succ\u00E8s."), 'success');
            }
            this.closeActionModal();
        };
        // ========== ACTIONS MÉTIER ==========
        CardsSettingsComponent_1.prototype.emettreCarte = function () {
            var typeCarte = this.formData.typeCarte || 'parent';
            var quantite = this.formData.quantite || 1;
            var soldeInitial = this.formData.soldeInitial || 0;
            var count = this.cartes.length;
            var utilisateurs = [
                { id: 'CL-001', nom: 'Jean NDAYISHIMIYE' },
                { id: 'CL-002', nom: 'Marie NSABIMANA' },
                { id: 'CL-003', nom: 'Pierre NIZIGIYIMANA' }
            ];
            for (var i = 0; i < quantite; i++) {
                var num = count + i + 1;
                var user = utilisateurs[i % utilisateurs.length] || utilisateurs[0];
                this.cartes.push({
                    id: "CARD-".concat(String(num).padStart(4, '0')),
                    numero: "IBLO".concat(String(100000 + num).padStart(6, '0')),
                    uid: "UID-".concat(String(10000 + num).padStart(5, '0')),
                    typeCarte: typeCarte === 'parent' ? 'parent' : 'enfant',
                    utilisateur: user ? user.nom : 'Utilisateur Inconnu',
                    userId: user ? user.id : 'UNKNOWN',
                    solde: soldeInitial,
                    statut: 'active',
                    dateEmission: new Date().toLocaleDateString('fr-FR'),
                    dateExpiration: new Date(Date.now() + 3 * 365 * 86400000).toLocaleDateString('fr-FR')
                });
            }
            this.toast("".concat(quantite, " carte(s) ").concat(typeCarte, " \u00E9mise(s) avec succ\u00E8s."), 'success');
        };
        CardsSettingsComponent_1.prototype.associerCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card) {
                card.utilisateur = "Utilisateur ".concat(this.formData.userId);
                card.userId = this.formData.userId;
                card.statut = 'active';
                this.toast("Carte ".concat(card.numero, " associ\u00E9e \u00E0 l'utilisateur ").concat(this.formData.userId, "."), 'success');
            }
            else {
                this.toast('Carte non trouvée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.desassocierCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card) {
                card.utilisateur = 'Non assigné';
                card.userId = 'N/A';
                card.statut = 'inactive';
                this.toast("Carte ".concat(card.numero, " d\u00E9sassoci\u00E9e avec succ\u00E8s."), 'success');
            }
            else {
                this.toast('Carte non trouvée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.activerCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card && card.statut === 'inactive') {
                card.statut = 'active';
                this.toast("Carte ".concat(card.numero, " activ\u00E9e avec succ\u00E8s."), 'success');
            }
            else {
                this.toast('Carte non trouvée ou déjà active.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.desactiverCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card && card.statut === 'active') {
                card.statut = 'desactivee';
                this.toast("Carte ".concat(card.numero, " d\u00E9sactiv\u00E9e avec succ\u00E8s."), 'success');
            }
            else {
                this.toast('Carte non trouvée ou déjà désactivée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.bloquerCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card && (card.statut === 'active' || card.statut === 'desactivee')) {
                card.statut = 'bloquee';
                this.toast("Carte ".concat(card.numero, " bloqu\u00E9e avec succ\u00E8s."), 'warning');
            }
            else {
                this.toast('Carte non trouvée ou déjà bloquée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.debloquerCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card && card.statut === 'bloquee') {
                card.statut = 'active';
                this.toast("Carte ".concat(card.numero, " d\u00E9bloqu\u00E9e avec succ\u00E8s."), 'success');
            }
            else {
                this.toast('Carte non trouvée ou déjà débloquée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.renouvelerCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card) {
                var dateExpiration = new Date(Date.now() + 3 * 365 * 86400000);
                card.dateExpiration = dateExpiration.toLocaleDateString('fr-FR');
                card.statut = 'active';
                this.toast("Carte ".concat(card.numero, " renouvel\u00E9e jusqu'au ").concat(card.dateExpiration, "."), 'success');
            }
            else {
                this.toast('Carte non trouvée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.reinitialiserPin = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card) {
                if (!this.formData.nouveauPin || this.formData.nouveauPin.length !== 4) {
                    this.toast('Le nouveau PIN doit contenir 4 chiffres.', 'danger');
                    return;
                }
                if (this.formData.nouveauPin !== this.formData.confirmPin) {
                    this.toast('Les PIN ne correspondent pas.', 'danger');
                    return;
                }
                this.toast("PIN r\u00E9initialis\u00E9 avec succ\u00E8s pour la carte ".concat(card.numero, "."), 'success');
            }
            else {
                this.toast('Carte non trouvée.', 'danger');
            }
        };
        CardsSettingsComponent_1.prototype.detruireCarte = function () {
            var _this = this;
            var card = this.cartes.find(function (c) { return c.id === _this.formData.cardId; });
            if (card) {
                this.cartes = this.cartes.filter(function (c) { return c.id !== card.id; });
                this.toast("Carte ".concat(card.numero, " d\u00E9truite avec succ\u00E8s."), 'success');
            }
            else {
                this.toast('Carte non trouvée.', 'danger');
            }
        };
        // ========== EXPORT ET IMPRESSION ==========
        CardsSettingsComponent_1.prototype.exportExcel = function () {
            var _this = this;
            this.toast('Export Excel des cartes en cours...', 'info');
            setTimeout(function () {
                _this.toast('Export Excel terminé avec succès.', 'success');
            }, 1000);
        };
        CardsSettingsComponent_1.prototype.exportExcelStock = function () {
            var _this = this;
            this.toast('Export Excel du stock en cours...', 'info');
            setTimeout(function () {
                _this.toast('Export Excel du stock terminé avec succès.', 'success');
            }, 1000);
        };
        CardsSettingsComponent_1.prototype.exportHistoryExcel = function () {
            var _this = this;
            this.toast('Export Excel de l\'historique en cours...', 'info');
            setTimeout(function () {
                _this.toast('Export Excel de l\'historique terminé avec succès.', 'success');
            }, 1000);
        };
        CardsSettingsComponent_1.prototype.printList = function () {
            this.toast('Impression de la liste en cours...', 'info');
            window.print();
        };
        CardsSettingsComponent_1.prototype.printStock = function () {
            this.toast('Impression du stock en cours...', 'info');
            window.print();
        };
        CardsSettingsComponent_1.prototype.printHistory = function () {
            this.toast('Impression de l\'historique en cours...', 'info');
            window.print();
        };
        CardsSettingsComponent_1.prototype.printCardDetail = function () {
            this.toast('Impression des détails de la carte en cours...', 'info');
            window.print();
        };
        // ========== MODALES ==========
        CardsSettingsComponent_1.prototype.closeModal = function () {
            this.modalOpen = false;
            this.selectedCard = null;
        };
        CardsSettingsComponent_1.prototype.closeActionModal = function () {
            this.actionModalOpen = false;
            this.actionModalType = '';
            this.actionModalTitle = '';
            this.formData = { pin: '', nouveauPin: '', confirmPin: '' };
            this.pendingAction = null;
        };
        // ========== TOASTS ==========
        CardsSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        CardsSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return CardsSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "CardsSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CardsSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CardsSettingsComponent = _classThis;
}();
export { CardsSettingsComponent };
//# sourceMappingURL=cards-settings.component.js.map