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
// src/app/modules/agents/pages/agent-approvisionnement/agent-approvisionnement.component.ts
import { Component } from '@angular/core';
var AgentApprovisionnementComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-agent-approvisionnement',
            templateUrl: './agent-approvisionnement.component.html',
            styleUrls: ['./agent-approvisionnement.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AgentApprovisionnementComponent = _classThis = /** @class */ (function () {
        function AgentApprovisionnementComponent_1(route, router, agentService, cdr) {
            this.route = route;
            this.router = router;
            this.agentService = agentService;
            this.cdr = cdr;
            this.agent = null;
            this.isLoading = true;
            this.isDarkMode = false;
            this.fundLoading = false;
            this.fundError = '';
            this.fundSuccess = '';
            this.fundHistory = [];
            // --- Banques agréées au Burundi ---
            this.banks = [
                { code: 'BANCOBU', name: 'Banque Commerciale du Burundi' },
                { code: 'BCB', name: 'Banque de Crédit de Bujumbura' },
                { code: 'BBCI', name: 'Banque Burundaise pour le Commerce et l\'Investissement' },
                { code: 'BGF', name: 'Banque de Gestion et de Financement' },
                { code: 'IBB', name: 'Interbank Burundi' },
                { code: 'FINBANK', name: 'FinBank' },
                { code: 'ECOBANK', name: 'Ecobank Burundi' },
                { code: 'DTB', name: 'Diamond Trust Bank Burundi' },
                { code: 'KCB', name: 'KCB Bank Burundi' },
                { code: 'CRDB', name: 'CRDB Bank Burundi' },
                { code: 'BCAB', name: 'Banque Communautaire et Agricole du Burundi' },
                { code: 'BIJE', name: 'Banque d\'Investissement pour les Jeunes' },
                { code: 'BHB', name: 'Banque de l\'Habitat du Burundi' },
                { code: 'BIDF', name: 'Banque d\'Investissement et de Développement pour les Femmes' },
                { code: 'BFB', name: 'Bedrock Financial Bank' }
            ];
            // --- Règles de contrôle ---
            this.APPROVAL_THRESHOLD = 5000000;
            this.RECEIPT_MAX_AGE_DAYS = 7;
            this.MAX_PIN_ATTEMPTS = 3;
            this.PIN_LOCK_DURATION_MS = 30000;
            this.currentAdmin = 'Admin. J. Bizimana';
            this.mockAdminPin = '1234';
            this.trustAccountBalance = 128500000;
            this.fundData = {
                receiptReference: '',
                amount: 0,
                bank: '',
                branch: '',
                depositDate: '',
                trustAccountVerified: false,
                reinforcedVerification: false,
                adminNote: ''
            };
            // Modale de rejet
            this.showRejectModal = false;
            this.rejectionTargetId = null;
            this.rejectionReason = '';
            // Modale PIN
            this.showPinModal = false;
            this.pinValue = '';
            this.pinError = '';
            this.pinAttempts = 0;
            this.pinLockedUntil = null;
            this.pendingAction = null;
            this.pendingApproveItem = null;
            // Carte récapitulative
            this.showSummaryModal = false;
            this.summaryData = null;
            // Écran de traitement
            this.showProcessingOverlay = false;
            this.processingLabel = '';
            this.usedReferences = new Set();
            this.colorPalette = [
                ['#4f46e5', '#7c3aed'],
                ['#ec4899', '#f43f5e'],
                ['#8b5cf6', '#6d28d9'],
                ['#3b82f6', '#2563eb'],
                ['#10b981', '#059669'],
                ['#f59e0b', '#d97706'],
                ['#ef4444', '#dc2626'],
                ['#14b8a6', '#0d9488']
            ];
        }
        AgentApprovisionnementComponent_1.prototype.ngOnInit = function () {
            var id = this.route.snapshot.paramMap.get('id');
            if (id) {
                this.loadAgent(id);
            }
            else {
                this.router.navigate(['/agents']);
            }
            this.loadTheme();
            this.loadFundHistory();
            this.setDefaultDate();
        };
        AgentApprovisionnementComponent_1.prototype.loadTheme = function () {
            var saved = localStorage.getItem('iblopay-theme');
            if (saved === 'dark') {
                this.isDarkMode = true;
                document.body.classList.add('dark-mode');
            }
        };
        AgentApprovisionnementComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
        };
        AgentApprovisionnementComponent_1.prototype.loadAgent = function (id) {
            var _this = this;
            this.isLoading = true;
            this.agentService.getAgentById(id).subscribe({
                next: function (data) {
                    _this.agent = data;
                    _this.isLoading = false;
                },
                error: function () {
                    _this.isLoading = false;
                    _this.router.navigate(['/agents']);
                }
            });
        };
        AgentApprovisionnementComponent_1.prototype.loadFundHistory = function () {
            var _this = this;
            this.fundHistory = [
                {
                    id: 'txn-1',
                    receiptReference: 'DEP-2026-07-16-001',
                    amount: 5000000,
                    date: new Date(Date.now() - 3600000),
                    agentName: 'Jean Mukiza',
                    status: 'ACTIVE',
                    createdBy: 'Admin. J. Bizimana',
                    validatedBy: 'Superviseur A. Ndayishimiye'
                },
                {
                    id: 'txn-2',
                    receiptReference: 'DEP-2026-07-15-003',
                    amount: 2500000,
                    date: new Date(Date.now() - 7200000),
                    agentName: 'Marie Uwimana',
                    status: 'ACTIVE',
                    createdBy: 'Admin. J. Bizimana'
                },
                {
                    id: 'txn-3',
                    receiptReference: 'DEP-2026-07-14-002',
                    amount: 10000000,
                    date: new Date(Date.now() - 86400000),
                    agentName: 'Pierre Niyonzima',
                    status: 'PENDING_APPROVAL',
                    createdBy: 'Admin. J. Bizimana'
                }
            ];
            this.fundHistory.forEach(function (item) {
                if (item.status !== 'REJECTED') {
                    _this.usedReferences.add(_this.normalizeReference(item.receiptReference));
                }
            });
        };
        AgentApprovisionnementComponent_1.prototype.setDefaultDate = function () {
            var now = new Date();
            var year = now.getFullYear();
            var month = String(now.getMonth() + 1).padStart(2, '0');
            var day = String(now.getDate()).padStart(2, '0');
            var hours = String(now.getHours()).padStart(2, '0');
            var minutes = String(now.getMinutes()).padStart(2, '0');
            this.fundData.depositDate = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
        };
        AgentApprovisionnementComponent_1.prototype.getBankName = function (code) {
            var _a;
            return ((_a = this.banks.find(function (b) { return b.code === code; })) === null || _a === void 0 ? void 0 : _a.name) || code;
        };
        AgentApprovisionnementComponent_1.prototype.getTotalElectronicsAmount = function () {
            if (!this.agent || !this.agent.electronics)
                return 0;
            return this.agent.electronics.reduce(function (total, e) { return total + (e.amountInCirculation || 0); }, 0);
        };
        // --- Contrôles renforcés ---
        AgentApprovisionnementComponent_1.prototype.normalizeReference = function (ref) {
            return (ref || '').trim().toUpperCase();
        };
        AgentApprovisionnementComponent_1.prototype.isDuplicateReference = function () {
            if (!this.fundData.receiptReference)
                return false;
            return this.usedReferences.has(this.normalizeReference(this.fundData.receiptReference));
        };
        AgentApprovisionnementComponent_1.prototype.receiptAgeInDays = function () {
            if (!this.fundData.depositDate)
                return 0;
            var deposit = new Date(this.fundData.depositDate).getTime();
            return Math.floor((Date.now() - deposit) / (1000 * 60 * 60 * 24));
        };
        AgentApprovisionnementComponent_1.prototype.isReceiptExpired = function () {
            return this.receiptAgeInDays() > this.RECEIPT_MAX_AGE_DAYS;
        };
        AgentApprovisionnementComponent_1.prototype.requiresSecondApproval = function () {
            return this.fundData.amount > this.APPROVAL_THRESHOLD;
        };
        AgentApprovisionnementComponent_1.prototype.reconciliationGap = function () {
            return this.trustAccountBalance - this.getTotalElectronicsAmount();
        };
        AgentApprovisionnementComponent_1.prototype.onAmountChange = function () {
            this.fundError = '';
        };
        // --- Étape 1 : validations de formulaire, puis ouverture de la modale PIN ---
        AgentApprovisionnementComponent_1.prototype.submitFund = function () {
            if (!this.agent) {
                this.fundError = 'Aucun agent sélectionné';
                return;
            }
            if (!this.fundData.receiptReference) {
                this.fundError = 'La référence du bordereau est obligatoire';
                return;
            }
            if (!this.fundData.amount || this.fundData.amount <= 0) {
                this.fundError = 'Le montant doit être supérieur à 0';
                return;
            }
            if (!this.fundData.bank) {
                this.fundError = 'Veuillez sélectionner une banque';
                return;
            }
            if (!this.fundData.branch) {
                this.fundError = 'Veuillez saisir le nom de l\'agence';
                return;
            }
            if (!this.fundData.depositDate) {
                this.fundError = 'Veuillez saisir la date du dépôt';
                return;
            }
            if (!this.fundData.trustAccountVerified) {
                this.fundError = 'Vous devez confirmer la vérification sur le Trust Account';
                return;
            }
            if (this.isDuplicateReference()) {
                this.fundError = 'Cette référence de bordereau a déjà été utilisée pour un approvisionnement.';
                return;
            }
            if (this.isReceiptExpired() && !this.fundData.reinforcedVerification) {
                this.fundError = "Ce bordereau date de ".concat(this.receiptAgeInDays(), " jours (d\u00E9lai max: ").concat(this.RECEIPT_MAX_AGE_DAYS, " j). Cochez la v\u00E9rification renforc\u00E9e pour continuer.");
                return;
            }
            this.fundError = '';
            this.pendingAction = 'CREATE';
            this.pendingApproveItem = null;
            this.openPinModal();
        };
        // --- Modale PIN ---
        AgentApprovisionnementComponent_1.prototype.openPinModal = function () {
            this.pinValue = '';
            this.pinError = '';
            this.showPinModal = true;
        };
        AgentApprovisionnementComponent_1.prototype.cancelPin = function () {
            this.showPinModal = false;
            this.pinValue = '';
            this.pinError = '';
            this.pendingAction = null;
            this.pendingApproveItem = null;
        };
        Object.defineProperty(AgentApprovisionnementComponent_1.prototype, "isPinLocked", {
            get: function () {
                return !!this.pinLockedUntil && Date.now() < this.pinLockedUntil;
            },
            enumerable: false,
            configurable: true
        });
        AgentApprovisionnementComponent_1.prototype.pinLockSecondsRemaining = function () {
            if (!this.pinLockedUntil)
                return 0;
            return Math.max(0, Math.ceil((this.pinLockedUntil - Date.now()) / 1000));
        };
        AgentApprovisionnementComponent_1.prototype.confirmPin = function () {
            var _this = this;
            if (this.isPinLocked) {
                this.pinError = "Trop de tentatives. R\u00E9essayez dans ".concat(this.pinLockSecondsRemaining(), "s.");
                return;
            }
            if (!this.pinValue || this.pinValue.length < 4) {
                this.pinError = 'Le code PIN doit contenir au moins 4 chiffres';
                return;
            }
            if (this.pinValue !== this.mockAdminPin) {
                this.pinAttempts++;
                if (this.pinAttempts >= this.MAX_PIN_ATTEMPTS) {
                    this.pinLockedUntil = Date.now() + this.PIN_LOCK_DURATION_MS;
                    this.pinError = "Code PIN incorrect. Compte verrouill\u00E9 ".concat(this.PIN_LOCK_DURATION_MS / 1000, "s apr\u00E8s ").concat(this.MAX_PIN_ATTEMPTS, " \u00E9checs.");
                }
                else {
                    this.pinError = "Code PIN incorrect (tentative ".concat(this.pinAttempts, "/").concat(this.MAX_PIN_ATTEMPTS, ")");
                }
                this.pinValue = '';
                return;
            }
            // ✅ PIN correct - Fermer la modale PIN
            this.pinAttempts = 0;
            this.pinLockedUntil = null;
            this.showPinModal = false;
            this.pinValue = '';
            var action = this.pendingAction;
            var approveItem = this.pendingApproveItem;
            this.pendingAction = null;
            this.pendingApproveItem = null;
            // Afficher l'écran de traitement
            this.showProcessingOverlay = true;
            this.processingLabel = action === 'APPROVE'
                ? 'Validation de l\'opération en cours...'
                : 'Enregistrement de l\'approvisionnement...';
            this.cdr.detectChanges();
            // Exécuter l'action après un petit délai pour que l'écran de traitement s'affiche
            setTimeout(function () {
                if (action === 'CREATE') {
                    _this.executeFunding();
                }
                else if (action === 'APPROVE' && approveItem) {
                    _this.executeApproval(approveItem);
                }
            }, 300);
        };
        // --- Étape 2 : exécution réelle après validation du PIN ---
        AgentApprovisionnementComponent_1.prototype.executeFunding = function () {
            var _this = this;
            this.fundLoading = true;
            this.fundError = '';
            this.fundSuccess = '';
            var requiresApproval = this.requiresSecondApproval();
            // Traitement principal
            setTimeout(function () {
                var agent = _this.agent;
                if (!agent) {
                    _this.fundLoading = false;
                    _this.fundError = 'Agent introuvable, opération annulée.';
                    _this.showProcessingOverlay = false;
                    _this.cdr.detectChanges();
                    return;
                }
                var newItem = {
                    id: "txn-".concat(Date.now()),
                    receiptReference: _this.fundData.receiptReference,
                    amount: _this.fundData.amount,
                    date: new Date(),
                    agentName: "".concat(agent.firstName, " ").concat(agent.lastName),
                    status: requiresApproval ? 'PENDING_APPROVAL' : 'ACTIVE',
                    createdBy: _this.currentAdmin,
                    bank: _this.fundData.bank,
                    branch: _this.fundData.branch,
                    depositDate: _this.fundData.depositDate
                };
                _this.usedReferences.add(_this.normalizeReference(_this.fundData.receiptReference));
                _this.fundHistory.unshift(newItem);
                if (!requiresApproval) {
                    _this.creditWallet(agent, _this.fundData.amount);
                    _this.fundSuccess = "Approvisionnement de ".concat(_this.fundData.amount.toLocaleString(), " Fbu effectu\u00E9 avec succ\u00E8s.");
                }
                else {
                    _this.fundSuccess = "Montant sup\u00E9rieur au seuil de ".concat(_this.APPROVAL_THRESHOLD.toLocaleString(), " Fbu : en attente de validation.");
                }
                _this.fundLoading = false;
                // 🔴 POINT CRITIQUE : Fermer l'écran de traitement et ouvrir la carte
                _this.showProcessingOverlay = false;
                _this.openSummaryCard(newItem, requiresApproval ? 'En attente de double validation' : 'Approvisionnement crédité');
                _this.resetFundForm();
                _this.cdr.detectChanges();
            }, 500); // Délai réduit pour un meilleur feedback
        };
        AgentApprovisionnementComponent_1.prototype.creditWallet = function (agent, amount) {
            if (!agent.electronics) {
                agent.electronics = [];
            }
            var existingElectronic = agent.electronics.find(function (e) { return e.status === 'ACTIVE'; });
            if (existingElectronic) {
                existingElectronic.amountInCirculation = (existingElectronic.amountInCirculation || 0) + amount;
            }
            else {
                agent.electronics.push({
                    id: Date.now().toString(),
                    amountInCirculation: amount,
                    status: 'ACTIVE'
                });
            }
        };
        // --- Double contrôle : validation ou rejet d'une opération en attente ---
        AgentApprovisionnementComponent_1.prototype.approvePending = function (item) {
            if (item.status !== 'PENDING_APPROVAL' || !this.agent)
                return;
            if (item.createdBy === this.currentAdmin) {
                this.fundError = 'Le second contrôle doit être réalisé par un administrateur différent de celui ayant saisi l\'opération.';
                return;
            }
            this.pendingAction = 'APPROVE';
            this.pendingApproveItem = item;
            this.openPinModal();
        };
        AgentApprovisionnementComponent_1.prototype.executeApproval = function (item) {
            var _this = this;
            if (!this.agent)
                return;
            setTimeout(function () {
                if (!_this.agent) {
                    _this.showProcessingOverlay = false;
                    _this.cdr.detectChanges();
                    return;
                }
                item.status = 'ACTIVE';
                item.validatedBy = _this.currentAdmin;
                _this.creditWallet(_this.agent, item.amount);
                _this.fundSuccess = "Op\u00E9ration ".concat(item.receiptReference, " valid\u00E9e et cr\u00E9dit\u00E9e.");
                // Fermer l'écran de traitement et ouvrir la carte
                _this.showProcessingOverlay = false;
                _this.openSummaryCard(item, 'Approbation confirmée — wallet crédité');
                _this.cdr.detectChanges();
                _this.cdr.detectChanges();
            }, 500);
        };
        AgentApprovisionnementComponent_1.prototype.openRejectModal = function (item) {
            this.rejectionTargetId = item.id;
            this.rejectionReason = '';
            this.showRejectModal = true;
        };
        AgentApprovisionnementComponent_1.prototype.confirmReject = function () {
            var _this = this;
            if (!this.rejectionReason.trim())
                return;
            var item = this.fundHistory.find(function (h) { return h.id === _this.rejectionTargetId; });
            if (item) {
                item.status = 'REJECTED';
                item.rejectionReason = this.rejectionReason.trim();
                item.validatedBy = this.currentAdmin;
                this.usedReferences.delete(this.normalizeReference(item.receiptReference));
            }
            this.cancelReject();
        };
        AgentApprovisionnementComponent_1.prototype.cancelReject = function () {
            this.showRejectModal = false;
            this.rejectionTargetId = null;
            this.rejectionReason = '';
        };
        // --- Carte récapitulative (reçu) + impression ---
        AgentApprovisionnementComponent_1.prototype.openSummaryCard = function (item, actionLabel) {
            if (!this.agent) {
                console.error('❌ Agent non trouvé pour la carte récapitulative');
                return;
            }
            console.log('📄 Ouverture de la carte récapitulative');
            this.summaryData = {
                transactionId: item.id,
                actionLabel: actionLabel,
                agentName: "".concat(this.agent.firstName, " ").concat(this.agent.lastName),
                agentCode: this.agent.code,
                receiptReference: item.receiptReference,
                amount: item.amount,
                bank: this.getBankName(item.bank || this.fundData.bank),
                branch: item.branch || this.fundData.branch,
                depositDate: item.depositDate || this.fundData.depositDate,
                performedBy: item.validatedBy || item.createdBy,
                performedAt: new Date(),
                newBalance: this.getTotalElectronicsAmount(),
                status: item.status
            };
            this.showSummaryModal = true;
            this.cdr.detectChanges();
            console.log('✅ Carte affichée avec succès');
        };
        AgentApprovisionnementComponent_1.prototype.closeSummaryCard = function () {
            this.showSummaryModal = false;
            this.summaryData = null;
        };
        AgentApprovisionnementComponent_1.prototype.printSummaryCard = function () {
            window.print();
        };
        AgentApprovisionnementComponent_1.prototype.resetFundForm = function () {
            this.fundData = {
                receiptReference: '',
                amount: 0,
                bank: '',
                branch: '',
                depositDate: this.fundData.depositDate,
                trustAccountVerified: false,
                reinforcedVerification: false,
                adminNote: ''
            };
            this.fundError = '';
            this.fundSuccess = '';
        };
        AgentApprovisionnementComponent_1.prototype.goBack = function () {
            this.router.navigate(['/agents']);
        };
        AgentApprovisionnementComponent_1.prototype.getColor = function (id, index) {
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            var colorIndex = Math.abs(hash % this.colorPalette.length);
            var colorPair = this.colorPalette[colorIndex];
            if (colorPair && colorPair.length > 0) {
                var selectedIndex = index % colorPair.length;
                return colorPair[selectedIndex] || '#4f46e5';
            }
            return index % 2 === 0 ? '#4f46e5' : '#7c3aed';
        };
        AgentApprovisionnementComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat((firstName === null || firstName === void 0 ? void 0 : firstName.charAt(0)) || '').concat((lastName === null || lastName === void 0 ? void 0 : lastName.charAt(0)) || '').toUpperCase();
        };
        AgentApprovisionnementComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'PENDING': 'En attente',
                'SUSPENDED': 'Suspendu',
                'BLOCKED': 'Bloqué',
                'INACTIVE': 'Inactif'
            };
            return labels[status] || status;
        };
        AgentApprovisionnementComponent_1.prototype.getStatusClass = function (status) {
            var classes = {
                'ACTIVE': 'active',
                'PENDING': 'pending',
                'SUSPENDED': 'suspended',
                'BLOCKED': 'blocked',
                'INACTIVE': 'inactive'
            };
            return classes[status] || '';
        };
        AgentApprovisionnementComponent_1.prototype.getFundStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Crédité',
                'PENDING_APPROVAL': 'En attente de validation',
                'REJECTED': 'Rejeté'
            };
            return labels[status];
        };
        AgentApprovisionnementComponent_1.prototype.getFundStatusClass = function (status) {
            var classes = {
                'ACTIVE': 'fund-status-active',
                'PENDING_APPROVAL': 'fund-status-pending',
                'REJECTED': 'fund-status-rejected'
            };
            return classes[status];
        };
        return AgentApprovisionnementComponent_1;
    }());
    __setFunctionName(_classThis, "AgentApprovisionnementComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AgentApprovisionnementComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AgentApprovisionnementComponent = _classThis;
}();
export { AgentApprovisionnementComponent };
//# sourceMappingURL=agent-approvisionnement.component.js.map