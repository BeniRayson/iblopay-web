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
var WalletSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-wallet-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './wallet-settings.component.html',
            styleUrls: ['./wallet-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletSettingsComponent = _classThis = /** @class */ (function () {
        function WalletSettingsComponent_1() {
            this.title = 'Gestion des Wallets';
            this.icon = '💰';
            this.pageSize = 10;
            this.activeTab = 'client';
            this.wallets = [];
            this.transactions = [];
            this.toastSeq = 0;
            this.transactionSeq = 1000;
            // Pagination
            this.currentPages = {
                client: 1,
                agent: 1,
                'super-agent': 1
            };
            // Couleurs pour les avatars
            this.avatarColors = [
                '#111c44', '#2A4A8A', '#1A7A4A', '#B8791C', '#C1443B',
                '#6B3FA0', '#008080', '#D4760A', '#2C7A7B', '#805AD5',
                '#E53E3E', '#38A169', '#2B6CB0', '#D69E2E', '#6B46C1'
            ];
            this.modalOpen = false;
            this.modalTitle = '';
            this.modalAction = '';
            this.selectedWallet = null;
            this.montant = 0;
            this.descriptionTxt = '';
            this.transactionId = '';
            this.agentSource = '';
            this.agentDestinataire = '';
            this.agentsList = [];
            this.historiqueTransactions = [];
            this.toasts = [];
            this.initializeData();
        }
        WalletSettingsComponent_1.prototype.initializeData = function () {
            var _this = this;
            var prenoms = ['Jean', 'Marie', 'Pierre', 'Claire', 'Emmanuel', 'Françoise', 'Joseph', 'Jeanne', 'Michel', 'Thérèse',
                'André', 'Marguerite', 'Philippe', 'Catherine', 'Roger', 'Simone', 'Daniel', 'Anne', 'Jacques', 'Francine',
                'Étienne', 'Nicole', 'Henri', 'Jacqueline', 'Louis', 'Chantal', 'Gaston', 'Odette', 'Maurice', 'Solange'];
            var noms = ['NDAYISHIMIYE', 'NSABIMANA', 'NIZIGIYIMANA', 'NDIKUMANA', 'HABIMANA', 'NKURUNZIZA', 'BIZIMANA', 'NIYONZIMA',
                'MANIRAKIZA', 'NSENGIYUMVA', 'NTAHONKURIYE', 'BARAMPAMA', 'NININAHAZWE', 'NZISABIRA', 'NTAKIRUTIMANA',
                'SINDAGAYA', 'NAHIMANA', 'NIZIGIYIMANA', 'NTAHOMVUKIYE', 'NIRAGIRA', 'NTAKIRUTIMANA', 'NSHIMIRIMANA',
                'NIKIZA', 'NISHIMWE', 'NIYONKURU', 'NIZEYIMANA', 'NSANZABAGANWA', 'NTAKIRUTIMANA', 'NTEZIMANA', 'NIYONGABO'];
            // 50 clients
            for (var i = 0; i < 50; i++) {
                var id = "CL-".concat(String(i + 1).padStart(3, '0'));
                var nom = "".concat(prenoms[i % prenoms.length], " ").concat(noms[i % noms.length]);
                var solde = 5000 + Math.floor(Math.random() * 500000);
                var kycLevel = [1, 2, 3][Math.floor(i % 3)] || 1;
                var statut = i % 7 === 0 ? 'suspendu' : i % 13 === 0 ? 'archive' : 'actif';
                this.wallets.push({
                    id: "WAL-".concat(id),
                    userId: id,
                    userNom: nom,
                    type: 'client',
                    solde: solde,
                    soldeEMoney: 0,
                    soldeCash: 0,
                    soldeDistribution: 0,
                    statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
                    dateCreation: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('fr-FR'),
                    derniereTransaction: new Date(Date.now() - i * 3600000).toISOString(),
                    kycLevel: kycLevel,
                    performance: 0,
                    nbAgents: 0
                });
            }
            // 50 agents
            for (var i = 0; i < 50; i++) {
                var id = "AG-".concat(String(i + 1).padStart(3, '0'));
                var nom = "".concat(prenoms[(i + 5) % prenoms.length], " ").concat(noms[(i + 3) % noms.length]);
                var eMoney = 10000 + Math.floor(Math.random() * 300000);
                var cash = 5000 + Math.floor(Math.random() * 150000);
                var performance_1 = 30 + Math.floor(Math.random() * 60);
                var statut = i % 9 === 0 ? 'suspendu' : i % 17 === 0 ? 'archive' : 'actif';
                this.wallets.push({
                    id: "WAL-".concat(id),
                    userId: id,
                    userNom: nom,
                    type: 'agent',
                    solde: eMoney + cash,
                    soldeEMoney: eMoney,
                    soldeCash: cash,
                    soldeDistribution: 0,
                    statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
                    dateCreation: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('fr-FR'),
                    derniereTransaction: new Date(Date.now() - i * 7200000).toISOString(),
                    kycLevel: 0,
                    performance: performance_1,
                    nbAgents: 0
                });
            }
            // 10 super agents
            for (var i = 0; i < 10; i++) {
                var id = "SA-".concat(String(i + 1).padStart(3, '0'));
                var nom = "Super ".concat(prenoms[(i + 10) % prenoms.length], " ").concat(noms[(i + 7) % noms.length]);
                var distribution = 500000 + Math.floor(Math.random() * 2000000);
                var performance_2 = 40 + Math.floor(Math.random() * 50);
                var nbAgents = 4 + Math.floor(Math.random() * 8);
                var statut = i % 11 === 0 ? 'suspendu' : 'actif';
                this.wallets.push({
                    id: "WAL-".concat(id),
                    userId: id,
                    userNom: nom,
                    type: 'super-agent',
                    solde: distribution,
                    soldeEMoney: 0,
                    soldeCash: 0,
                    soldeDistribution: distribution,
                    statut: statut === 'actif' ? 'actif' : statut === 'suspendu' ? 'suspendu' : 'archive',
                    dateCreation: new Date(Date.now() - i * 86400000 * 5).toLocaleDateString('fr-FR'),
                    derniereTransaction: new Date(Date.now() - i * 86400000).toISOString(),
                    kycLevel: 0,
                    performance: performance_2,
                    nbAgents: nbAgents
                });
            }
            // Transactions
            this.wallets.forEach(function (w) {
                var nbTransactions = 2 + Math.floor(Math.random() * 5);
                for (var i = 0; i < nbTransactions; i++) {
                    var isCredit = Math.random() > 0.5;
                    var montant = 1000 + Math.floor(Math.random() * 100000);
                    var type = isCredit ? 'credit' : 'debit';
                    var typeLabel = isCredit ? 'Crédit' : 'Débit';
                    var description = isCredit ? 'Dépôt effectué' : 'Retrait effectué';
                    _this.transactions.push({
                        id: "TXN-".concat(String(++_this.transactionSeq).padStart(4, '0')),
                        walletId: w.id,
                        userId: w.userId,
                        type: type,
                        typeLabel: typeLabel,
                        montant: montant,
                        description: "".concat(description, " #").concat(i + 1),
                        date: new Date(Date.now() - i * 86400000 * (1 + Math.random() * 3)).toISOString(),
                        statut: 'effectue'
                    });
                }
            });
            this.agentsList = this.wallets
                .filter(function (w) { return w.type === 'agent'; })
                .map(function (w) { return ({
                id: w.userId,
                nom: w.userNom,
                telephone: w.userId
            }); });
        };
        // ========== AVATAR ==========
        WalletSettingsComponent_1.prototype.getAvatarColor = function (userId) {
            var hash = 0;
            for (var i = 0; i < userId.length; i++) {
                hash = userId.charCodeAt(i) + ((hash << 5) - hash);
            }
            var index = Math.abs(hash) % this.avatarColors.length;
            // Utilisation de l'opérateur de coalescence pour garantir une valeur de retour
            return this.avatarColors[index] || '#111c44';
        };
        // ========== PAGINATION ==========
        WalletSettingsComponent_1.prototype.getPaginatedWallets = function (type) {
            var wallets = this.getWalletsByType(type);
            var page = this.currentPages[type] || 1;
            var start = (page - 1) * this.pageSize;
            return wallets.slice(start, start + this.pageSize);
        };
        WalletSettingsComponent_1.prototype.getTotalPages = function (type) {
            var wallets = this.getWalletsByType(type);
            return Math.ceil(wallets.length / this.pageSize);
        };
        WalletSettingsComponent_1.prototype.getCurrentPage = function (type) {
            return this.currentPages[type] || 1;
        };
        WalletSettingsComponent_1.prototype.nextPage = function (type) {
            var totalPages = this.getTotalPages(type);
            var currentPage = this.currentPages[type] || 1;
            if (currentPage < totalPages) {
                this.currentPages[type] = currentPage + 1;
            }
        };
        WalletSettingsComponent_1.prototype.previousPage = function (type) {
            var currentPage = this.currentPages[type] || 1;
            if (currentPage > 1) {
                this.currentPages[type] = currentPage - 1;
            }
        };
        // ========== MÉTHODES PUBLIQUES ==========
        WalletSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPages[tab] = 1;
        };
        WalletSettingsComponent_1.prototype.getWalletsByType = function (type) {
            return this.wallets.filter(function (w) { return w.type === type; });
        };
        WalletSettingsComponent_1.prototype.getTotalSolde = function (type) {
            var wallets = this.wallets.filter(function (w) { return w.type === type; });
            return wallets.reduce(function (sum, w) { return sum + w.solde; }, 0);
        };
        WalletSettingsComponent_1.prototype.getTotalGeneral = function () {
            return this.wallets.reduce(function (sum, w) { return sum + w.solde; }, 0);
        };
        WalletSettingsComponent_1.prototype.getInitials = function (nom) {
            return (nom || '')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(function (w) { var _a; return (_a = w[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase(); })
                .join('');
        };
        WalletSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                actif: 'Actif',
                bloque: 'Bloqué',
                suspendu: 'Suspendu',
                archive: 'Archivé'
            };
            return labels[statut] || statut;
        };
        WalletSettingsComponent_1.prototype.getKycLevel = function (userId) {
            var wallet = this.wallets.find(function (w) { return w.userId === userId; });
            return wallet ? wallet.kycLevel : 1;
        };
        WalletSettingsComponent_1.prototype.getAgentPerformance = function (userId) {
            var wallet = this.wallets.find(function (w) { return w.userId === userId; });
            return wallet ? wallet.performance : 0;
        };
        WalletSettingsComponent_1.prototype.getSuperPerformance = function (userId) {
            var wallet = this.wallets.find(function (w) { return w.userId === userId; });
            return wallet ? wallet.performance : 0;
        };
        WalletSettingsComponent_1.prototype.getNbAgentsForSuper = function (superId) {
            var wallet = this.wallets.find(function (w) { return w.userId === superId; });
            return wallet ? wallet.nbAgents : 0;
        };
        // ========== ACTIONS ==========
        WalletSettingsComponent_1.prototype.openWalletHistory = function (wallet) {
            this.selectedWallet = wallet;
            this.modalTitle = "Historique - ".concat(wallet.userNom);
            this.modalAction = 'historique';
            this.modalOpen = true;
            this.historiqueTransactions = this.transactions
                .filter(function (t) { return t.walletId === wallet.id; })
                .sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                .slice(0, 20)
                .map(function (t) { return ({
                date: new Date(t.date).toLocaleString('fr-FR'),
                type: t.type,
                typeLabel: t.typeLabel,
                montant: (t.type === 'credit' || t.type === 'reception' ? '+' : '-') + ' ' + t.montant.toLocaleString('fr-FR') + ' BIF',
                description: t.description
            }); });
        };
        WalletSettingsComponent_1.prototype.openWalletAction = function (wallet, action) {
            this.selectedWallet = wallet;
            this.modalAction = action;
            this.modalTitle = this.getActionTitle(action, wallet.userNom);
            this.modalOpen = true;
            this.montant = 0;
            this.descriptionTxt = '';
            this.agentSource = '';
            this.agentDestinataire = '';
        };
        WalletSettingsComponent_1.prototype.openGlobalAction = function (type, action) {
            this.selectedWallet = null;
            this.modalAction = action;
            this.modalTitle = this.getGlobalActionTitle(type, action);
            this.modalOpen = true;
            this.montant = 0;
            this.descriptionTxt = '';
            this.agentSource = '';
            this.agentDestinataire = '';
            if (action === 'historique') {
                var wallets = this.wallets.filter(function (w) { return w.type === type; });
                var walletIds_1 = wallets.map(function (w) { return w.id; });
                this.historiqueTransactions = this.transactions
                    .filter(function (t) { return walletIds_1.includes(t.walletId); })
                    .sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                    .slice(0, 30)
                    .map(function (t) { return ({
                    date: new Date(t.date).toLocaleString('fr-FR'),
                    type: t.type,
                    typeLabel: t.typeLabel,
                    montant: (t.type === 'credit' || t.type === 'reception' ? '+' : '-') + ' ' + t.montant.toLocaleString('fr-FR') + ' BIF',
                    description: t.description
                }); });
            }
        };
        WalletSettingsComponent_1.prototype.getActionTitle = function (action, nom) {
            var titles = {
                crediter: "Cr\u00E9diter - ".concat(nom),
                debiter: "D\u00E9biter - ".concat(nom),
                bloquer: "Bloquer - ".concat(nom),
                debloquer: "D\u00E9bloquer - ".concat(nom),
                solde: "Solde - ".concat(nom),
                distribution: "Distribuer - ".concat(nom),
                reception: "R\u00E9ception - ".concat(nom),
                reattribuer: "R\u00E9attribuer - ".concat(nom)
            };
            return titles[action] || "Action - ".concat(nom);
        };
        WalletSettingsComponent_1.prototype.getGlobalActionTitle = function (type, action) {
            var typeLabels = {
                client: 'Clients',
                agent: 'Agents',
                'super-agent': 'Super Agents'
            };
            var actionLabels = {
                crediter: 'Créditer tous les',
                debiter: 'Débiter tous les',
                distribution: 'Distribuer aux',
                reception: 'Réception pour les',
                historique: 'Historique des',
                reattribuer: 'Réattribuer e-Money des'
            };
            return "".concat(actionLabels[action] || action, " ").concat(typeLabels[type] || type);
        };
        WalletSettingsComponent_1.prototype.confirmModal = function () {
            if (this.selectedWallet) {
                this.executeWalletAction(this.selectedWallet);
            }
            else {
                this.executeGlobalAction();
            }
            this.closeModal();
        };
        WalletSettingsComponent_1.prototype.executeWalletAction = function (wallet) {
            var _this = this;
            switch (this.modalAction) {
                case 'crediter':
                    if (this.montant > 0) {
                        wallet.solde += this.montant;
                        if (wallet.type === 'agent')
                            wallet.soldeEMoney += this.montant;
                        if (wallet.type === 'super-agent')
                            wallet.soldeDistribution += this.montant;
                        this.addTransaction(wallet, 'credit', this.montant, this.descriptionTxt || 'Crédit manuel');
                        this.toast("Cr\u00E9dit de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9 sur ").concat(wallet.userNom, "."), 'success');
                    }
                    else {
                        this.toast('Le montant doit être supérieur à 0.', 'danger');
                    }
                    break;
                case 'debiter':
                    if (this.montant > 0 && wallet.solde >= this.montant) {
                        wallet.solde -= this.montant;
                        if (wallet.type === 'agent')
                            wallet.soldeEMoney -= this.montant;
                        if (wallet.type === 'super-agent')
                            wallet.soldeDistribution -= this.montant;
                        this.addTransaction(wallet, 'debit', this.montant, this.descriptionTxt || 'Débit manuel');
                        this.toast("D\u00E9bit de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9 sur ").concat(wallet.userNom, "."), 'success');
                    }
                    else {
                        this.toast('Montant invalide ou solde insuffisant.', 'danger');
                    }
                    break;
                case 'bloquer':
                    if (wallet.statut === 'actif') {
                        wallet.statut = 'bloque';
                        this.addTransaction(wallet, 'debit', 0, "Blocage du compte : ".concat(this.descriptionTxt || 'Motif non spécifié'));
                        this.toast("Wallet de ".concat(wallet.userNom, " bloqu\u00E9 avec succ\u00E8s."), 'warning');
                    }
                    else {
                        this.toast('Le wallet n\'est pas actif.', 'danger');
                    }
                    break;
                case 'debloquer':
                    if (wallet.statut === 'bloque') {
                        wallet.statut = 'actif';
                        this.addTransaction(wallet, 'credit', 0, "D\u00E9blocage du compte : ".concat(this.descriptionTxt || 'Motif non spécifié'));
                        this.toast("Wallet de ".concat(wallet.userNom, " d\u00E9bloqu\u00E9 avec succ\u00E8s."), 'success');
                    }
                    else {
                        this.toast('Le wallet n\'est pas bloqué.', 'danger');
                    }
                    break;
                case 'distribution':
                    if (this.montant > 0 && this.agentDestinataire) {
                        var agentWallet = this.wallets.find(function (w) { return w.userId === _this.agentDestinataire && w.type === 'agent'; });
                        if (agentWallet && wallet.solde >= this.montant) {
                            wallet.solde -= this.montant;
                            wallet.soldeDistribution -= this.montant;
                            agentWallet.solde += this.montant;
                            agentWallet.soldeEMoney += this.montant;
                            this.addTransaction(wallet, 'distribution', this.montant, "Distribution \u00E0 ".concat(agentWallet.userNom));
                            this.addTransaction(agentWallet, 'credit', this.montant, "R\u00E9ception de distribution de ".concat(wallet.userNom));
                            this.toast("Distribution de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9e."), 'success');
                        }
                        else {
                            this.toast('Agent introuvable ou solde insuffisant.', 'danger');
                        }
                    }
                    else {
                        this.toast('Veuillez remplir tous les champs.', 'danger');
                    }
                    break;
                case 'reception':
                    if (this.montant > 0) {
                        wallet.solde += this.montant;
                        wallet.soldeDistribution += this.montant;
                        this.addTransaction(wallet, 'reception', this.montant, "R\u00E9ception : ".concat(this.descriptionTxt || 'Source externe'));
                        this.toast("R\u00E9ception de ".concat(this.montant.toLocaleString('fr-FR'), " BIF enregistr\u00E9e."), 'success');
                    }
                    else {
                        this.toast('Le montant doit être supérieur à 0.', 'danger');
                    }
                    break;
                default:
                    this.toast('Action non reconnue.', 'info');
            }
        };
        WalletSettingsComponent_1.prototype.executeGlobalAction = function () {
            var _this = this;
            var type = 'client';
            if (this.modalTitle.includes('Agents') && !this.modalTitle.includes('Super'))
                type = 'agent';
            else if (this.modalTitle.includes('Super'))
                type = 'super-agent';
            else if (this.modalTitle.includes('Clients'))
                type = 'client';
            var wallets = this.wallets.filter(function (w) { return w.type === type; });
            switch (this.modalAction) {
                case 'crediter':
                    if (this.montant > 0) {
                        var montantParWallet_1 = this.montant / (wallets.length || 1);
                        wallets.forEach(function (w) {
                            w.solde += montantParWallet_1;
                            if (w.type === 'agent')
                                w.soldeEMoney += montantParWallet_1;
                            if (w.type === 'super-agent')
                                w.soldeDistribution += montantParWallet_1;
                            _this.addTransaction(w, 'credit', montantParWallet_1, _this.descriptionTxt || 'Crédit global');
                        });
                        this.toast("Cr\u00E9dit de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9 sur ").concat(wallets.length, " wallet(s)."), 'success');
                    }
                    else {
                        this.toast('Le montant doit être supérieur à 0.', 'danger');
                    }
                    break;
                case 'debiter':
                    if (this.montant > 0) {
                        var soldeTotal = wallets.reduce(function (sum, w) { return sum + w.solde; }, 0);
                        if (soldeTotal >= this.montant) {
                            var proportion_1 = this.montant / soldeTotal;
                            wallets.forEach(function (w) {
                                var debit = w.solde * proportion_1;
                                w.solde -= debit;
                                if (w.type === 'agent')
                                    w.soldeEMoney -= debit;
                                if (w.type === 'super-agent')
                                    w.soldeDistribution -= debit;
                                _this.addTransaction(w, 'debit', debit, _this.descriptionTxt || 'Débit global');
                            });
                            this.toast("D\u00E9bit de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9."), 'success');
                        }
                        else {
                            this.toast('Solde total insuffisant.', 'danger');
                        }
                    }
                    else {
                        this.toast('Le montant doit être supérieur à 0.', 'danger');
                    }
                    break;
                case 'distribution':
                    if (this.montant > 0 && this.agentDestinataire) {
                        var agentWallet_1 = this.wallets.find(function (w) { return w.userId === _this.agentDestinataire && w.type === 'agent'; });
                        if (agentWallet_1) {
                            var soldeTotal = wallets.reduce(function (sum, w) { return sum + w.solde; }, 0);
                            if (soldeTotal >= this.montant) {
                                var proportion_2 = this.montant / soldeTotal;
                                wallets.forEach(function (w) {
                                    var debit = w.solde * proportion_2;
                                    w.solde -= debit;
                                    w.soldeDistribution -= debit;
                                    _this.addTransaction(w, 'distribution', debit, "Distribution \u00E0 ".concat(agentWallet_1.userNom));
                                });
                                agentWallet_1.solde += this.montant;
                                agentWallet_1.soldeEMoney += this.montant;
                                this.addTransaction(agentWallet_1, 'credit', this.montant, "R\u00E9ception de distribution globale");
                                this.toast("Distribution de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9e."), 'success');
                            }
                            else {
                                this.toast('Solde total insuffisant.', 'danger');
                            }
                        }
                        else {
                            this.toast('Agent destinataire introuvable.', 'danger');
                        }
                    }
                    else {
                        this.toast('Veuillez remplir tous les champs.', 'danger');
                    }
                    break;
                case 'reception':
                    if (this.montant > 0) {
                        var montantParWallet_2 = this.montant / (wallets.length || 1);
                        wallets.forEach(function (w) {
                            w.solde += montantParWallet_2;
                            w.soldeDistribution += montantParWallet_2;
                            _this.addTransaction(w, 'reception', montantParWallet_2, "R\u00E9ception : ".concat(_this.descriptionTxt || 'Source externe'));
                        });
                        this.toast("R\u00E9ception de ".concat(this.montant.toLocaleString('fr-FR'), " BIF enregistr\u00E9e."), 'success');
                    }
                    else {
                        this.toast('Le montant doit être supérieur à 0.', 'danger');
                    }
                    break;
                case 'reattribuer':
                    if (this.montant > 0 && this.agentSource && this.agentDestinataire) {
                        var sourceWallet = this.wallets.find(function (w) { return w.userId === _this.agentSource && w.type === 'agent'; });
                        var destWallet = this.wallets.find(function (w) { return w.userId === _this.agentDestinataire && w.type === 'agent'; });
                        if (sourceWallet && destWallet && sourceWallet.soldeEMoney >= this.montant) {
                            sourceWallet.soldeEMoney -= this.montant;
                            sourceWallet.solde -= this.montant;
                            destWallet.soldeEMoney += this.montant;
                            destWallet.solde += this.montant;
                            this.addTransaction(sourceWallet, 'transfert', this.montant, "R\u00E9attribution e-Money vers ".concat(destWallet.userNom));
                            this.addTransaction(destWallet, 'credit', this.montant, "R\u00E9attribution e-Money depuis ".concat(sourceWallet.userNom));
                            this.toast("R\u00E9attribution de ".concat(this.montant.toLocaleString('fr-FR'), " BIF effectu\u00E9e."), 'success');
                        }
                        else {
                            this.toast('Source/destinataire invalide ou solde insuffisant.', 'danger');
                        }
                    }
                    else {
                        this.toast('Veuillez remplir tous les champs.', 'danger');
                    }
                    break;
                default:
                    this.toast('Action non reconnue.', 'info');
            }
        };
        WalletSettingsComponent_1.prototype.addTransaction = function (wallet, type, montant, description) {
            var typeLabels = {
                credit: 'Crédit',
                debit: 'Débit',
                transfert: 'Transfert',
                distribution: 'Distribution',
                reception: 'Réception'
            };
            this.transactions.push({
                id: "TXN-".concat(String(++this.transactionSeq).padStart(4, '0')),
                walletId: wallet.id,
                userId: wallet.userId,
                type: type,
                typeLabel: typeLabels[type] || type,
                montant: montant,
                description: description,
                date: new Date().toISOString(),
                statut: 'effectue'
            });
        };
        WalletSettingsComponent_1.prototype.closeModal = function () {
            this.modalOpen = false;
            this.selectedWallet = null;
        };
        WalletSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        WalletSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        return WalletSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "WalletSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletSettingsComponent = _classThis;
}();
export { WalletSettingsComponent };
//# sourceMappingURL=wallet-settings.component.js.map