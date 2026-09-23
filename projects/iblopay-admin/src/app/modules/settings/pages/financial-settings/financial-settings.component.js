var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var FinancialSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-financial-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './financial-settings.component.html',
            styleUrls: ['./financial-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FinancialSettingsComponent = _classThis = /** @class */ (function () {
        function FinancialSettingsComponent_1() {
            this.title = 'Gestion Financière';
            this.icon = '🏦';
            this.pageSize = 10;
            this.STORAGE_KEY = 'financial_data';
            this.tabs = [
                { key: 'bordereaux', label: 'Bordereaux', icon: '📋', count: 0 },
                { key: 'comptabilite', label: 'Comptabilité', icon: '🧾', count: 0 },
                { key: 'rapports', label: 'Rapports', icon: '📄', count: 0 },
                { key: 'configuration', label: 'Configuration', icon: '⚙️' }
            ];
            this.activeTab = 'bordereaux';
            this.currentPages = {
                bordereaux: 1,
                comptabilite: 1
            };
            this.bordereaux = [];
            this.comptabiliteData = [];
            this.rapportsData = [];
            this.configData = [];
            this.soldeDisponible = 500000000;
            this.liquiditeUtilisee = 0;
            this.toastSeq = 0;
            this.modalOpen = false;
            this.modalTitle = '';
            this.modalType = '';
            this.modalIcon = '';
            this.selectedItem = null;
            this.formData = {};
            this.rapportPreview = '';
            this.toasts = [];
            this.loadData();
            this.initializeData();
            this.updateTabsCount();
        }
        FinancialSettingsComponent_1.prototype.loadData = function () {
            var saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try {
                    var data = JSON.parse(saved);
                    if (data.bordereaux)
                        this.bordereaux = data.bordereaux;
                    if (data.comptabiliteData)
                        this.comptabiliteData = data.comptabiliteData;
                    if (data.rapportsData)
                        this.rapportsData = data.rapportsData;
                    if (data.configData)
                        this.configData = data.configData;
                    if (data.soldeDisponible)
                        this.soldeDisponible = data.soldeDisponible;
                    if (data.liquiditeUtilisee)
                        this.liquiditeUtilisee = data.liquiditeUtilisee;
                    return;
                }
                catch (e) {
                    console.error('Erreur de chargement des données', e);
                }
            }
        };
        FinancialSettingsComponent_1.prototype.saveData = function () {
            var data = {
                bordereaux: this.bordereaux,
                comptabiliteData: this.comptabiliteData,
                rapportsData: this.rapportsData,
                configData: this.configData,
                soldeDisponible: this.soldeDisponible,
                liquiditeUtilisee: this.liquiditeUtilisee
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        };
        FinancialSettingsComponent_1.prototype.updateTabsCount = function () {
            var _this = this;
            var tabKeys = ['bordereaux', 'comptabilite', 'rapports'];
            var dataArrays = [
                this.bordereaux,
                this.comptabiliteData,
                this.rapportsData
            ];
            tabKeys.forEach(function (key, index) {
                var _a;
                var tab = _this.tabs.find(function (t) { return t.key === key; });
                if (tab) {
                    tab.count = ((_a = dataArrays[index]) === null || _a === void 0 ? void 0 : _a.length) || 0;
                }
            });
        };
        FinancialSettingsComponent_1.prototype.initializeData = function () {
            if (this.bordereaux.length > 0 || this.comptabiliteData.length > 0) {
                return;
            }
            // Bordereaux
            var noms = ['Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA', 'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA'];
            var statuts = ['valide', 'valide', 'valide', 'en_attente', 'rejete'];
            for (var i = 0; i < 25; i++) {
                var nomIndex = i % noms.length;
                var nom = noms[nomIndex];
                var statutIndex = i % statuts.length;
                var statut = statuts[statutIndex];
                var montant = 50000 + Math.floor(Math.random() * 450000);
                this.bordereaux.push({
                    id: "BR-".concat(String(100000 + i).padStart(6, '0')),
                    numero: "BOR-".concat(String(100000 + i).padStart(6, '0')),
                    nomVersant: nom,
                    montant: montant,
                    date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('fr-FR'),
                    statut: statut,
                    description: "Versement #".concat(i + 1)
                });
                this.liquiditeUtilisee += montant;
            }
            // Comptabilité
            var comptes = [
                { code: '411001', label: 'Clients' },
                { code: '512001', label: 'Banque' },
                { code: '531001', label: 'Caisse' },
                { code: '701001', label: 'Ventes' },
                { code: '411002', label: 'Agents' },
                { code: '411003', label: 'Super Agents' },
                { code: '512002', label: 'Trust Account' },
                { code: '706001', label: 'Commissions' }
            ];
            var libelles = ['Vente de carte', 'Commission agent', 'Dépôt client', 'Retrait agent', 'Transfert e-Money', 'Frais de transaction'];
            var typesEcriture = ['achat', 'vente', 'transfert', 'ajustement', 'commission'];
            for (var i = 0; i < 20; i++) {
                var compteIndex = i % comptes.length;
                var compte = comptes[compteIndex];
                var libelleIndex = i % libelles.length;
                var libelle = libelles[libelleIndex];
                var debit = i % 2 === 0 ? 10000 + Math.floor(Math.random() * 50000) : null;
                var credit = i % 2 !== 0 ? 10000 + Math.floor(Math.random() * 50000) : null;
                this.comptabiliteData.push({
                    id: "EC-".concat(String(100000 + i).padStart(6, '0')),
                    date: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('fr-FR'),
                    compte: "".concat(compte.code, " - ").concat(compte.label),
                    libelle: libelle,
                    debit: debit,
                    credit: credit,
                    reference: "REF-".concat(String(100000 + i).padStart(6, '0')),
                    typeEcriture: typesEcriture[i % typesEcriture.length] || 'transfert'
                });
            }
            // Rapports avec contenu
            this.rapportsData = [
                {
                    id: 'RP-001',
                    titre: 'Rapport Journalier',
                    description: 'Résumé complet des transactions du jour',
                    icon: '📅',
                    date: new Date().toLocaleDateString('fr-FR'),
                    taille: '245 KB',
                    type: 'Journalier',
                    contenu: this.generateRapportJournalier()
                },
                {
                    id: 'RP-002',
                    titre: 'Rapport Hebdomadaire',
                    description: 'Analyse détaillée des 7 derniers jours',
                    icon: '📊',
                    date: new Date(Date.now() - 2 * 86400000).toLocaleDateString('fr-FR'),
                    taille: '1.2 MB',
                    type: 'Hebdomadaire',
                    contenu: this.generateRapportHebdomadaire()
                },
                {
                    id: 'RP-003',
                    titre: 'Rapport Mensuel',
                    description: 'Bilan financier complet du mois',
                    icon: '📈',
                    date: new Date(Date.now() - 5 * 86400000).toLocaleDateString('fr-FR'),
                    taille: '3.8 MB',
                    type: 'Mensuel',
                    contenu: this.generateRapportMensuel()
                },
                {
                    id: 'RP-004',
                    titre: 'Rapport des Commissions',
                    description: 'Détail des commissions par agent',
                    icon: '💵',
                    date: new Date(Date.now() - 7 * 86400000).toLocaleDateString('fr-FR'),
                    taille: '890 KB',
                    type: 'Commissions',
                    contenu: this.generateRapportCommissions()
                },
                {
                    id: 'RP-005',
                    titre: 'Rapport des Bordereaux',
                    description: 'Liste des bordereaux de versement',
                    icon: '📋',
                    date: new Date(Date.now() - 14 * 86400000).toLocaleDateString('fr-FR'),
                    taille: '567 KB',
                    type: 'Bordereaux',
                    contenu: this.generateRapportBordereaux()
                }
            ];
            // Configuration
            this.configData = [
                {
                    icon: '💰',
                    nom: 'Limites et Plafonds',
                    items: [
                        { label: 'Plafond max transaction', value: '500,000 BIF' },
                        { label: 'Plafond journalier client', value: '1,000,000 BIF' },
                        { label: 'Plafond carte', value: '500,000 BIF' },
                        { label: 'Limite min transaction', value: '100 BIF' }
                    ]
                },
                {
                    icon: '💳',
                    nom: 'Frais et Commissions',
                    items: [
                        { label: "Frais d'émission carte", value: '5,000 BIF' },
                        { label: 'Frais de renouvellement', value: '2,500 BIF' },
                        { label: 'Frais de transaction', value: '1.5%' },
                        { label: 'Frais de retrait', value: '2.0%' }
                    ]
                },
                {
                    icon: '🔒',
                    nom: 'Sécurité Financière',
                    items: [
                        { label: "Seuil d'alerte solde", value: '10,000,000 BIF' },
                        { label: 'Seuil transaction suspecte', value: '2,000,000 BIF' },
                        { label: 'Double authentification', value: 'Activée' },
                        { label: "Délai d'expiration", value: '30 minutes' }
                    ]
                }
            ];
            this.saveData();
        };
        // ========== GÉNÉRATION DE RAPPORTS ==========
        FinancialSettingsComponent_1.prototype.generateRapportJournalier = function () {
            return "\uD83D\uDCCA RAPPORT JOURNALIER - ".concat(new Date().toLocaleDateString('fr-FR'), "\n\n") +
                "\uD83D\uDCCB Total Bordereaux: ".concat(this.bordereaux.length, "\n") +
                "\uD83D\uDCB0 Montant Total: ".concat(this.getTotalMontantBordereaux().toLocaleString('fr-FR'), " BIF\n") +
                "\uD83D\uDCCA Transactions: ".concat(this.getNombreTransactions(), "\n\n") +
                "\u2705 Valid\u00E9s: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'valide'; }).length, "\n") +
                "\u23F3 En attente: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'en_attente'; }).length, "\n") +
                "\u274C Rejet\u00E9s: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'rejete'; }).length);
        };
        FinancialSettingsComponent_1.prototype.generateRapportHebdomadaire = function () {
            return "\uD83D\uDCC8 RAPPORT HEBDOMADAIRE\n\n" +
                "\uD83D\uDCCA P\u00E9riode du ".concat(new Date(Date.now() - 7 * 86400000).toLocaleDateString('fr-FR'), " au ").concat(new Date().toLocaleDateString('fr-FR'), "\n\n") +
                "\uD83D\uDCCB Bordereaux: ".concat(this.bordereaux.length, "\n") +
                "\uD83D\uDCB0 Montant Total: ".concat(this.getTotalMontantBordereaux().toLocaleString('fr-FR'), " BIF\n") +
                "\uD83D\uDCC8 \u00C9volution: +15% vs semaine derni\u00E8re";
        };
        FinancialSettingsComponent_1.prototype.generateRapportMensuel = function () {
            return "\uD83D\uDCCA RAPPORT MENSUEL - ".concat(new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }), "\n\n") +
                "\uD83D\uDCCB Total Bordereaux: ".concat(this.bordereaux.length, "\n") +
                "\uD83D\uDCB0 Montant Total: ".concat(this.getTotalMontantBordereaux().toLocaleString('fr-FR'), " BIF\n") +
                "\uD83D\uDCCA Transactions: ".concat(this.getNombreTransactions(), "\n\n") +
                "\uD83D\uDCC8 Croissance: +12%\n" +
                "\uD83C\uDFAF Objectif: 85% atteint";
        };
        FinancialSettingsComponent_1.prototype.generateRapportCommissions = function () {
            return "\uD83D\uDCB5 RAPPORT DES COMMISSIONS\n\n" +
                "\uD83D\uDCCB D\u00E9tail des commissions par agent\n\n" +
                "\uD83D\uDC68\u200D\uD83D\uDCBC Super Agents: 2 agents\n" +
                "\uD83D\uDCB0 Total: 2,500,000 BIF\n" +
                "\uD83D\uDCCA Taux moyen: 2.5%\n\n" +
                "\uD83C\uDFC6 Top: Pierre NIZIGIYIMANA - 850,000 BIF";
        };
        FinancialSettingsComponent_1.prototype.generateRapportBordereaux = function () {
            return "\uD83D\uDCCB RAPPORT DES BORDEREAUX\n\n" +
                "\uD83D\uDCCA Liste des bordereaux de versement\n\n" +
                "\uD83D\uDCCB Total: ".concat(this.bordereaux.length, "\n") +
                "\uD83D\uDCB0 Montant total: ".concat(this.getTotalMontantBordereaux().toLocaleString('fr-FR'), " BIF\n\n") +
                "\u2705 Valid\u00E9s: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'valide'; }).length, "\n") +
                "\u23F3 En attente: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'en_attente'; }).length, "\n") +
                "\u274C Rejet\u00E9s: ".concat(this.bordereaux.filter(function (b) { return b.statut === 'rejete'; }).length);
        };
        // ========== KPI DATA ==========
        FinancialSettingsComponent_1.prototype.getKpiData = function () {
            return [
                {
                    icon: '📋',
                    label: 'Bordereaux',
                    value: this.getTotalBordereaux(),
                    color: '#E8EDF5',
                    trend: 'up',
                    trendValue: "".concat(this.getBordereauxEnAttente().length, " en attente")
                },
                {
                    icon: '💰',
                    label: 'Montant Total',
                    value: this.getTotalMontantBordereaux().toLocaleString('fr-FR'),
                    color: '#E6F4EE',
                    trend: 'up',
                    trendValue: 'BIF'
                },
                {
                    icon: '📊',
                    label: 'Transactions',
                    value: this.getNombreTransactions(),
                    color: '#FBEBEA',
                    trend: 'up',
                    trendValue: "".concat(this.getTransactionsEffectuees(), " effectu\u00E9es")
                },
                {
                    icon: '📄',
                    label: 'Rapports',
                    value: this.rapportsData.length,
                    color: '#FCF1DD',
                    trend: 'up',
                    trendValue: 'disponibles'
                }
            ];
        };
        // ========== BORDEREAUX ==========
        FinancialSettingsComponent_1.prototype.getTotalBordereaux = function () {
            return this.bordereaux.length;
        };
        FinancialSettingsComponent_1.prototype.getBordereauxEnAttente = function () {
            return this.bordereaux.filter(function (b) { return b.statut === 'en_attente'; });
        };
        FinancialSettingsComponent_1.prototype.getTotalMontantBordereaux = function () {
            return this.bordereaux.reduce(function (sum, b) { return sum + b.montant; }, 0);
        };
        FinancialSettingsComponent_1.prototype.getMontantMoyenBordereau = function () {
            return this.bordereaux.length > 0 ? this.getTotalMontantBordereaux() / this.bordereaux.length : 0;
        };
        FinancialSettingsComponent_1.prototype.getBordereaux = function () {
            return this.bordereaux.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        };
        FinancialSettingsComponent_1.prototype.getPaginatedBordereaux = function () {
            var page = this.currentPages['bordereaux'] || 1;
            var start = (page - 1) * this.pageSize;
            return this.getBordereaux().slice(start, start + this.pageSize);
        };
        FinancialSettingsComponent_1.prototype.getTotalBordereauxPages = function () {
            return Math.ceil(this.getBordereaux().length / this.pageSize);
        };
        FinancialSettingsComponent_1.prototype.deleteBordereau = function (item) {
            if (confirm("Voulez-vous vraiment supprimer le bordereau ".concat(item.numero, " ?"))) {
                this.bordereaux = this.bordereaux.filter(function (b) { return b.id !== item.id; });
                this.updateTabsCount();
                this.saveData();
                this.toast("Bordereau ".concat(item.numero, " supprim\u00E9 avec succ\u00E8s."), 'success');
            }
        };
        // ========== TRANSACTIONS ==========
        FinancialSettingsComponent_1.prototype.getNombreTransactions = function () {
            return this.bordereaux.length + this.comptabiliteData.length;
        };
        FinancialSettingsComponent_1.prototype.getTransactionsEffectuees = function () {
            return this.bordereaux.filter(function (b) { return b.statut === 'valide'; }).length;
        };
        // ========== COMPTABILITÉ ==========
        FinancialSettingsComponent_1.prototype.getComptabiliteData = function () {
            return this.comptabiliteData.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        };
        FinancialSettingsComponent_1.prototype.getPaginatedComptabilite = function () {
            var page = this.currentPages['comptabilite'] || 1;
            var start = (page - 1) * this.pageSize;
            return this.getComptabiliteData().slice(start, start + this.pageSize);
        };
        FinancialSettingsComponent_1.prototype.getTotalComptabilitePages = function () {
            return Math.ceil(this.getComptabiliteData().length / this.pageSize);
        };
        // ========== RAPPORTS ==========
        FinancialSettingsComponent_1.prototype.getRapports = function () {
            return this.rapportsData;
        };
        FinancialSettingsComponent_1.prototype.viewRapport = function (rapport) {
            this.selectedItem = rapport;
            this.modalType = 'voir_rapport';
            this.modalTitle = "\uD83D\uDCC4 ".concat(rapport.titre);
            this.modalIcon = rapport.icon;
            this.rapportPreview = rapport.contenu || 'Aucun contenu disponible pour ce rapport.';
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.downloadRapport = function (rapport) {
            var content = rapport.contenu || "Rapport: ".concat(rapport.titre, "\nDate: ").concat(rapport.date, "\nType: ").concat(rapport.type);
            var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            var url = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = "".concat(rapport.titre.toLowerCase().replace(/\s/g, '_'), "_").concat(new Date().toISOString().slice(0, 10), ".txt");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            this.toast("Rapport \"".concat(rapport.titre, "\" t\u00E9l\u00E9charg\u00E9 avec succ\u00E8s."), 'success');
        };
        // ========== CONFIGURATION ==========
        FinancialSettingsComponent_1.prototype.getConfiguration = function () {
            return this.configData;
        };
        // ========== PAGINATION ==========
        FinancialSettingsComponent_1.prototype.getCurrentPage = function (type) {
            return this.currentPages[type] || 1;
        };
        FinancialSettingsComponent_1.prototype.nextPage = function (type) {
            var totalPages = type === 'bordereaux' ? this.getTotalBordereauxPages() : this.getTotalComptabilitePages();
            var current = this.currentPages[type] || 1;
            if (current < totalPages) {
                this.currentPages[type] = current + 1;
            }
        };
        FinancialSettingsComponent_1.prototype.prevPage = function (type) {
            var current = this.currentPages[type] || 1;
            if (current > 1) {
                this.currentPages[type] = current - 1;
            }
        };
        FinancialSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPages[tab] = 1;
        };
        // ========== MODALES ==========
        FinancialSettingsComponent_1.prototype.openNouveauBordereau = function () {
            this.modalType = 'nouveau_bordereau';
            this.modalTitle = '📋 Nouveau Bordereau';
            this.modalIcon = '📋';
            this.formData = {
                nomVersant: '',
                montant: 0,
                date: new Date().toISOString().split('T')[0],
                description: ''
            };
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.openNouvelleEcriture = function () {
            this.modalType = 'nouvelle_ecriture';
            this.modalTitle = '✏️ Nouvelle Écriture Comptable';
            this.modalIcon = '✏️';
            this.formData = {
                compte: '512001 - Banque',
                libelle: '',
                debit: 0,
                credit: 0,
                typeEcriture: 'transfert'
            };
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.openCorrigerEcriture = function (item) {
            this.selectedItem = item;
            this.modalType = 'corriger_ecriture';
            this.modalTitle = '🔧 Corriger Écriture';
            this.modalIcon = '🔧';
            this.formData = __assign({}, item);
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.openGenererRapport = function () {
            this.modalType = 'generer_rapport';
            this.modalTitle = '📄 Générer un Rapport';
            this.modalIcon = '📄';
            this.formData = {
                type: 'journalier',
                format: 'pdf'
            };
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.openModifierConfig = function (item) {
            this.selectedItem = item;
            this.modalType = 'modifier_config';
            this.modalTitle = '✏️ Modifier la Configuration';
            this.modalIcon = '✏️';
            this.formData = {
                nouvelleValeur: item.value,
                raison: ''
            };
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.viewBordereau = function (item) {
            this.selectedItem = item;
            this.modalType = 'voir_bordereau';
            this.modalTitle = '👁️ Détails du bordereau';
            this.modalIcon = '👁️';
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.viewEcriture = function (item) {
            this.selectedItem = item;
            this.modalType = 'voir_ecriture';
            this.modalTitle = '👁️ Détails de l\'écriture';
            this.modalIcon = '👁️';
            this.modalOpen = true;
        };
        FinancialSettingsComponent_1.prototype.closeModal = function () {
            this.modalOpen = false;
            this.selectedItem = null;
            this.rapportPreview = '';
        };
        FinancialSettingsComponent_1.prototype.confirmModal = function () {
            switch (this.modalType) {
                case 'nouveau_bordereau':
                    this.ajouterBordereau();
                    break;
                case 'nouvelle_ecriture':
                case 'corriger_ecriture':
                    this.toast('Écriture comptable enregistrée avec succès.', 'success');
                    break;
                case 'generer_rapport':
                    this.genererRapport();
                    break;
                case 'modifier_config':
                    this.modifierConfiguration();
                    break;
            }
            this.closeModal();
        };
        FinancialSettingsComponent_1.prototype.ajouterBordereau = function () {
            var nomVersant = this.formData.nomVersant;
            var montant = this.formData.montant;
            var date = this.formData.date;
            var description = this.formData.description;
            if (!nomVersant || montant <= 0) {
                this.toast('Veuillez remplir tous les champs correctement.', 'danger');
                return;
            }
            var nouveauBordereau = {
                id: "BR-".concat(String(100000 + this.bordereaux.length + 1).padStart(6, '0')),
                numero: "BOR-".concat(String(100000 + this.bordereaux.length + 1).padStart(6, '0')),
                nomVersant: nomVersant,
                montant: montant,
                date: date,
                statut: 'en_attente',
                description: description || 'Nouveau versement'
            };
            this.bordereaux.push(nouveauBordereau);
            this.liquiditeUtilisee += montant;
            this.updateTabsCount();
            this.saveData();
            this.toast("Bordereau ".concat(nouveauBordereau.numero, " cr\u00E9\u00E9 avec succ\u00E8s."), 'success');
        };
        FinancialSettingsComponent_1.prototype.genererRapport = function () {
            var type = this.formData.type || 'journalier';
            var format = this.formData.format || 'pdf';
            var contenu = '';
            var titre = '';
            switch (type) {
                case 'journalier':
                    titre = 'Rapport Journalier';
                    contenu = this.generateRapportJournalier();
                    break;
                case 'hebdomadaire':
                    titre = 'Rapport Hebdomadaire';
                    contenu = this.generateRapportHebdomadaire();
                    break;
                case 'mensuel':
                    titre = 'Rapport Mensuel';
                    contenu = this.generateRapportMensuel();
                    break;
                case 'commissions':
                    titre = 'Rapport des Commissions';
                    contenu = this.generateRapportCommissions();
                    break;
                case 'bordereaux':
                    titre = 'Rapport des Bordereaux';
                    contenu = this.generateRapportBordereaux();
                    break;
                default:
                    contenu = 'Type de rapport non reconnu.';
            }
            var nouveauRapport = {
                id: "RP-".concat(String(100000 + this.rapportsData.length + 1).padStart(6, '0')),
                titre: titre,
                description: "Rapport ".concat(type, " g\u00E9n\u00E9r\u00E9 le ").concat(new Date().toLocaleDateString('fr-FR')),
                icon: '📄',
                date: new Date().toLocaleDateString('fr-FR'),
                taille: "".concat(Math.ceil(contenu.length / 1024), " KB"),
                type: type.charAt(0).toUpperCase() + type.slice(1),
                contenu: contenu
            };
            this.rapportsData.push(nouveauRapport);
            this.updateTabsCount();
            this.saveData();
            this.toast("Rapport \"".concat(titre, "\" g\u00E9n\u00E9r\u00E9 avec succ\u00E8s."), 'success');
        };
        FinancialSettingsComponent_1.prototype.modifierConfiguration = function () {
            if (!this.selectedItem)
                return;
            var nouvelleValeur = this.formData.nouvelleValeur;
            var raison = this.formData.raison;
            if (!nouvelleValeur) {
                this.toast('Veuillez entrer une nouvelle valeur.', 'danger');
                return;
            }
            this.selectedItem.value = nouvelleValeur;
            this.saveData();
            this.toast("Configuration \"".concat(this.selectedItem.label, "\" modifi\u00E9e avec succ\u00E8s."), 'success');
        };
        FinancialSettingsComponent_1.prototype.getRapportPeriode = function () {
            if (this.formData.type === 'journalier')
                return 'Aujourd\'hui';
            if (this.formData.type === 'hebdomadaire')
                return 'Cette semaine';
            if (this.formData.type === 'mensuel')
                return 'Ce mois';
            if (this.formData.type === 'commissions')
                return 'Période des commissions';
            if (this.formData.type === 'bordereaux')
                return 'Période des bordereaux';
            return 'Période personnalisée';
        };
        // ========== EXPORTS ==========
        FinancialSettingsComponent_1.prototype.exportBordereaux = function () {
            var data = JSON.stringify(this.bordereaux, null, 2);
            this.downloadFile(data, 'bordereaux.json', 'application/json');
            this.toast('Export des bordereaux terminé.', 'success');
        };
        FinancialSettingsComponent_1.prototype.printBordereaux = function () {
            this.toast('Impression en cours...', 'info');
            window.print();
        };
        FinancialSettingsComponent_1.prototype.exportComptabilite = function () {
            var data = JSON.stringify(this.comptabiliteData, null, 2);
            this.downloadFile(data, 'comptabilite.json', 'application/json');
            this.toast('Export de la comptabilité terminé.', 'success');
        };
        FinancialSettingsComponent_1.prototype.printComptabilite = function () {
            this.toast('Impression en cours...', 'info');
            window.print();
        };
        FinancialSettingsComponent_1.prototype.downloadBordereau = function (item) {
            var data = JSON.stringify(item, null, 2);
            this.downloadFile(data, "bordereau_".concat(item.numero, ".json"), 'application/json');
            this.toast("Bordereau ".concat(item.numero, " t\u00E9l\u00E9charg\u00E9."), 'success');
        };
        FinancialSettingsComponent_1.prototype.downloadFile = function (content, filename, mimeType) {
            var blob = new Blob([content], { type: "".concat(mimeType, ";charset=utf-8") });
            var url = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        };
        // ========== UTILITAIRES ==========
        FinancialSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                valide: '✅ Validé',
                en_attente: '⏳ En attente',
                rejete: '❌ Rejeté'
            };
            return labels[statut] || statut;
        };
        // ========== TOASTS ==========
        FinancialSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        FinancialSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return FinancialSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "FinancialSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinancialSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinancialSettingsComponent = _classThis;
}();
export { FinancialSettingsComponent };
//# sourceMappingURL=financial-settings.component.js.map