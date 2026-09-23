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
// src/app/modules/users/components/users-detail/users-detail.component.ts
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
var communes = ['Mukaza', 'Ntahangwa', 'Muha', 'Isale', 'Kabezi', 'Mubimbi', 'Mugongomanga',
    'Muhuta', 'Mukike', 'Mutambu', 'Mutimbuzi', 'Nyabiraba', 'Buyenzi', 'Kinindo'];
var zones = ['Nyakabiga', 'Kigobe', 'Rohero', 'Kanyosha', 'Ruziba', 'Kinama', 'Gihosha',
    'Kiriri', 'Musaga', 'Ntare', 'Cibitoke', 'Ngagara', 'Gatoke', 'Vugizo',
    'Kwijabe', 'Gasenyi', 'Kavumu', 'Rukaramu', 'Taba', 'Bwiza', 'Gatete'];
var provinces = ['Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Gitega', 'Muramvya',
    'Ngozi', 'Muyinga', 'Ruyigi', 'Kirundo', 'Kayanza', 'Karuzi', 'Cankuzo'];
var UsersDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-users-detail',
            templateUrl: './users-detail.component.html',
            styleUrls: ['./users-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersDetailComponent = _classThis = /** @class */ (function () {
        function UsersDetailComponent_1(route, router, location, fb) {
            this.route = route;
            this.router = router;
            this.location = location;
            this.fb = fb;
            this.user = null;
            this.isLoading = true;
            this.isDarkMode = false;
            // Onglet actif
            this.activeTab = 'profile';
            // Mode édition
            this.isEditing = false;
            this.editLoading = false;
            this.editError = '';
            this.editSuccess = '';
            this.fundLoading = false;
            this.fundError = '';
            this.fundSuccess = '';
            this.fundAmount = 0;
            // Données
            this.transactions = [];
            this.commissions = [];
            this.fundHistory = [];
            // Filtres
            this.transactionFilter = '';
            this.commissionFilter = '';
            this.communes = communes;
            this.zones = zones;
            this.provinces = provinces;
        }
        UsersDetailComponent_1.prototype.ngOnInit = function () {
            var userId = this.route.snapshot.paramMap.get('id');
            if (userId) {
                this.loadUser(userId);
            }
            else {
                this.goBack();
            }
            this.loadTheme();
            this.initEditForm();
            this.initFundForm();
            this.loadMockData();
        };
        UsersDetailComponent_1.prototype.initEditForm = function () {
            this.editForm = this.fb.group({
                firstName: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required, Validators.pattern(/^\+257\s?[0-9]{8}$/)]],
                role: ['', Validators.required],
                status: ['', Validators.required],
                cardNumber: [''],
                cniNumber: [''],
                province: [''],
                commune: [''],
                zone: ['']
            });
        };
        UsersDetailComponent_1.prototype.initFundForm = function () {
            this.fundForm = this.fb.group({
                amount: ['', [Validators.required, Validators.min(100)]],
                reason: ['', Validators.required],
                description: ['']
            });
        };
        UsersDetailComponent_1.prototype.loadTheme = function () {
            var saved = localStorage.getItem('iblopay-theme');
            if (saved === 'dark') {
                this.isDarkMode = true;
                document.body.classList.add('dark-mode');
            }
        };
        UsersDetailComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('iblopay-theme', this.isDarkMode ? 'dark' : 'light');
        };
        UsersDetailComponent_1.prototype.loadUser = function (id) {
            var _this = this;
            this.isLoading = true;
            setTimeout(function () {
                _this.user = _this.getMockUser(id);
                _this.isLoading = false;
                _this.populateForm();
            }, 500);
        };
        UsersDetailComponent_1.prototype.getMockUser = function (id) {
            return {
                id: id || 'user-0001',
                firstName: 'Jean',
                lastName: 'Ndayishimiye',
                email: 'jean.ndayishimiye@iblopay.bi',
                phone: '+257 61234567',
                photoUrl: '',
                role: 'AGENT',
                status: 'ACTIVE',
                cardNumber: 'CARD-2024-001',
                cniNumber: 'CNI-123456',
                address: {
                    zone: 'Nyakabiga',
                    commune: 'Mukaza',
                    province: 'Bujumbura Mairie',
                    fullAddress: 'Nyakabiga; Mukaza; Bujumbura Mairie'
                },
                createdAt: new Date(2024, 0, 15),
                createdBy: {
                    id: 'super-001',
                    firstName: 'Marie',
                    lastName: 'Uwimana',
                    role: 'SUPER_AGENT'
                },
                accountNumber: 'IBL-123456789',
                walletBalance: 150000
            };
        };
        UsersDetailComponent_1.prototype.loadMockData = function () {
            // Transactions simulées
            this.transactions = [
                {
                    id: 'txn-1',
                    type: 'TRANSFER',
                    amount: 25000,
                    date: new Date(Date.now() - 1800000),
                    description: 'Transfert vers Client A. Niyonzima',
                    status: 'COMPLETED',
                    from: 'Jean Ndayishimiye',
                    to: 'Alain Niyonzima',
                    reference: 'TXN-2024-001',
                    commission: 500
                },
                {
                    id: 'txn-2',
                    type: 'DEPOSIT',
                    amount: 50000,
                    date: new Date(Date.now() - 7200000),
                    description: 'Dépôt client C. Mukiza',
                    status: 'COMPLETED',
                    from: 'Claire Mukiza',
                    to: 'Jean Ndayishimiye',
                    reference: 'DEP-2024-002',
                    commission: 1000
                },
                {
                    id: 'txn-3',
                    type: 'WITHDRAWAL',
                    amount: 30000,
                    date: new Date(Date.now() - 14400000),
                    description: 'Retrait par P. Nkurunziza',
                    status: 'COMPLETED',
                    from: 'Jean Ndayishimiye',
                    to: 'Pierre Nkurunziza',
                    reference: 'WTH-2024-003',
                    commission: 600
                },
                {
                    id: 'txn-4',
                    type: 'FUND',
                    amount: 100000,
                    date: new Date(Date.now() - 86400000),
                    description: 'Réapprovisionnement après perte',
                    status: 'COMPLETED',
                    reference: 'FUND-2024-001',
                    commission: 0
                }
            ];
            // Commissions simulées
            this.commissions = [
                {
                    id: 'com-1',
                    amount: 500,
                    date: new Date(Date.now() - 1800000),
                    from: 'Alain Niyonzima',
                    forTransaction: 'TXN-2024-001',
                    type: 'RECEIVE',
                    status: 'COMPLETED'
                },
                {
                    id: 'com-2',
                    amount: 1000,
                    date: new Date(Date.now() - 7200000),
                    from: 'Claire Mukiza',
                    forTransaction: 'DEP-2024-002',
                    type: 'RECEIVE',
                    status: 'COMPLETED'
                },
                {
                    id: 'com-3',
                    amount: 600,
                    date: new Date(Date.now() - 14400000),
                    from: 'Pierre Nkurunziza',
                    forTransaction: 'WTH-2024-003',
                    type: 'RECEIVE',
                    status: 'COMPLETED'
                }
            ];
            // Historique d'approvisionnement
            this.fundHistory = [
                {
                    id: 'fund-1',
                    type: 'FUND',
                    amount: 100000,
                    date: new Date(Date.now() - 86400000),
                    description: 'Réapprovisionnement après perte',
                    status: 'COMPLETED',
                    reference: 'FUND-2024-001'
                },
                {
                    id: 'fund-2',
                    type: 'FUND',
                    amount: 50000,
                    date: new Date(Date.now() - 172800000),
                    description: 'Ajustement commission',
                    status: 'COMPLETED',
                    reference: 'FUND-2024-002'
                }
            ];
        };
        UsersDetailComponent_1.prototype.populateForm = function () {
            if (!this.user)
                return;
            this.editForm.patchValue({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                phone: this.user.phone,
                role: this.user.role,
                status: this.user.status,
                cardNumber: this.user.cardNumber,
                cniNumber: this.user.cniNumber,
                province: this.user.address.province,
                commune: this.user.address.commune,
                zone: this.user.address.zone
            });
        };
        UsersDetailComponent_1.prototype.goBack = function () {
            this.location.back();
        };
        // ─── GESTION DES ONGLETS ──────────────────────────────────
        UsersDetailComponent_1.prototype.setTab = function (tab) {
            this.activeTab = tab;
        };
        // ─── MODE ÉDITION ────────────────────────────────────────
        UsersDetailComponent_1.prototype.enableEditMode = function () {
            this.isEditing = true;
            this.editError = '';
            this.editSuccess = '';
            this.populateForm();
            setTimeout(function () {
                var formElement = document.querySelector('.edit-section');
                if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        };
        UsersDetailComponent_1.prototype.cancelEdit = function () {
            this.isEditing = false;
            this.editError = '';
            this.editSuccess = '';
            this.populateForm();
        };
        UsersDetailComponent_1.prototype.onSubmitEdit = function () {
            var _this = this;
            if (this.editForm.invalid) {
                this.editForm.markAllAsTouched();
                return;
            }
            this.editLoading = true;
            this.editError = '';
            this.editSuccess = '';
            var formData = this.editForm.value;
            setTimeout(function () {
                if (_this.user) {
                    _this.user.firstName = formData.firstName;
                    _this.user.lastName = formData.lastName;
                    _this.user.email = formData.email;
                    _this.user.phone = formData.phone;
                    _this.user.role = formData.role;
                    _this.user.status = formData.status;
                    _this.user.cardNumber = formData.cardNumber;
                    _this.user.cniNumber = formData.cniNumber;
                    _this.user.address.province = formData.province;
                    _this.user.address.commune = formData.commune;
                    _this.user.address.zone = formData.zone;
                    _this.user.address.fullAddress = "".concat(formData.zone, "; ").concat(formData.commune, "; ").concat(formData.province);
                }
                _this.editLoading = false;
                _this.editSuccess = '✅ Utilisateur modifié avec succès !';
                setTimeout(function () {
                    _this.isEditing = false;
                    _this.editSuccess = '';
                }, 2000);
            }, 1500);
        };
        // ─── APPROVISIONNEMENT ────────────────────────────────────
        UsersDetailComponent_1.prototype.onSubmitFund = function () {
            var _this = this;
            if (this.fundForm.invalid) {
                this.fundForm.markAllAsTouched();
                return;
            }
            if (!this.user)
                return;
            this.fundLoading = true;
            this.fundError = '';
            this.fundSuccess = '';
            var formData = this.fundForm.value;
            var amount = Number(formData.amount);
            setTimeout(function () {
                // Ajouter l'approvisionnement à l'historique
                var fundEntry = {
                    id: "fund-".concat(Date.now()),
                    type: 'FUND',
                    amount: amount,
                    date: new Date(),
                    description: formData.reason || 'Réapprovisionnement',
                    status: 'COMPLETED',
                    reference: "FUND-".concat(Date.now()),
                    commission: 0
                };
                _this.fundHistory.unshift(fundEntry);
                // Mettre à jour le solde
                _this.user.walletBalance += amount;
                // Ajouter une notification (simulée)
                _this.transactions.unshift({
                    id: "txn-".concat(Date.now()),
                    type: 'FUND',
                    amount: amount,
                    date: new Date(),
                    description: formData.reason || 'Réapprovisionnement du wallet',
                    status: 'COMPLETED',
                    reference: "FUND-".concat(Date.now()),
                    commission: 0
                });
                _this.fundLoading = false;
                _this.fundSuccess = "\u2705 ".concat(amount.toLocaleString(), " Fbu cr\u00E9dit\u00E9s avec succ\u00E8s !");
                _this.fundForm.reset({
                    amount: '',
                    reason: '',
                    description: ''
                });
                setTimeout(function () {
                    _this.fundSuccess = '';
                }, 3000);
            }, 1500);
        };
        Object.defineProperty(UsersDetailComponent_1.prototype, "filteredTransactions", {
            // ─── FILTRES ──────────────────────────────────────────────
            get: function () {
                if (!this.transactionFilter)
                    return this.transactions;
                var term = this.transactionFilter.toLowerCase();
                return this.transactions.filter(function (t) {
                    var _a, _b, _c;
                    return t.description.toLowerCase().includes(term) ||
                        ((_a = t.reference) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) ||
                        ((_b = t.from) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(term)) ||
                        ((_c = t.to) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(term));
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersDetailComponent_1.prototype, "filteredCommissions", {
            get: function () {
                if (!this.commissionFilter)
                    return this.commissions;
                var term = this.commissionFilter.toLowerCase();
                return this.commissions.filter(function (c) {
                    return c.from.toLowerCase().includes(term) ||
                        c.forTransaction.toLowerCase().includes(term);
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UsersDetailComponent_1.prototype, "totalCommissions", {
            get: function () {
                return this.commissions.reduce(function (sum, c) { return sum + c.amount; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        // ─── MÉTHODES UTILITAIRES ─────────────────────────────────
        UsersDetailComponent_1.prototype.getFieldError = function (fieldName) {
            var control = this.editForm.get(fieldName);
            if (!control || !control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Ce champ est requis';
            if (control.errors['minlength'])
                return 'Minimum 2 caractères';
            if (control.errors['email'])
                return 'Email invalide';
            if (control.errors['pattern'])
                return 'Format invalide';
            return 'Valeur invalide';
        };
        UsersDetailComponent_1.prototype.getFundFieldError = function (fieldName) {
            var control = this.fundForm.get(fieldName);
            if (!control || !control.errors || !control.touched)
                return '';
            if (control.errors['required'])
                return 'Ce champ est requis';
            if (control.errors['min'])
                return 'Le montant minimum est de 100 Fbu';
            return 'Valeur invalide';
        };
        UsersDetailComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat(firstName.charAt(0)).concat(lastName.charAt(0)).toUpperCase();
        };
        UsersDetailComponent_1.prototype.getAvatarColor = function (id) {
            var colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#4f46e5';
        };
        UsersDetailComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'SUSPENDED': 'Suspendu',
                'FROZEN': 'Gelé',
                'CLOSED': 'Fermé'
            };
            return labels[status] || status;
        };
        UsersDetailComponent_1.prototype.getStatusClass = function (status) {
            return "status-".concat(status.toLowerCase());
        };
        UsersDetailComponent_1.prototype.getRoleLabel = function (role) {
            var labels = {
                'CLIENT': 'Client',
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || role;
        };
        UsersDetailComponent_1.prototype.getRoleClass = function (role) {
            return "role-".concat(role.toLowerCase().replace('_', '-'));
        };
        UsersDetailComponent_1.prototype.getCreatorRoleLabel = function (role) {
            var labels = {
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || '';
        };
        UsersDetailComponent_1.prototype.getTransactionTypeLabel = function (type) {
            var labels = {
                'TRANSFER': 'Transfert',
                'DEPOSIT': 'Dépôt',
                'WITHDRAWAL': 'Retrait',
                'FUND': 'Approvisionnement',
                'COMMISSION': 'Commission'
            };
            return labels[type] || type;
        };
        UsersDetailComponent_1.prototype.getTransactionTypeClass = function (type) {
            var classes = {
                'TRANSFER': 'type-transfer',
                'DEPOSIT': 'type-deposit',
                'WITHDRAWAL': 'type-withdrawal',
                'FUND': 'type-fund',
                'COMMISSION': 'type-commission'
            };
            return classes[type] || '';
        };
        UsersDetailComponent_1.prototype.getTransactionStatusClass = function (status) {
            var classes = {
                'COMPLETED': 'status-completed',
                'PENDING': 'status-pending',
                'FAILED': 'status-failed'
            };
            return classes[status] || '';
        };
        UsersDetailComponent_1.prototype.getTransactionStatusLabel = function (status) {
            var labels = {
                'COMPLETED': '✅ Complété',
                'PENDING': '⏳ En attente',
                'FAILED': '❌ Échoué'
            };
            return labels[status] || status;
        };
        UsersDetailComponent_1.prototype.getCommissionStatusClass = function (status) {
            return "commission-".concat(status.toLowerCase());
        };
        UsersDetailComponent_1.prototype.getCommissionStatusLabel = function (status) {
            var labels = {
                'COMPLETED': '✅ Validée',
                'PENDING': '⏳ En attente'
            };
            return labels[status] || status;
        };
        UsersDetailComponent_1.prototype.formatDate = function (date) {
            return new Date(date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        UsersDetailComponent_1.prototype.formatCurrency = function (amount) {
            return amount.toLocaleString('fr-FR') + ' Fbu';
        };
        // ─── ACTIONS ──────────────────────────────────────────────
        UsersDetailComponent_1.prototype.onEdit = function () {
            this.enableEditMode();
        };
        UsersDetailComponent_1.prototype.onFund = function () {
            this.setTab('fund');
            setTimeout(function () {
                var fundSection = document.querySelector('.fund-section');
                if (fundSection) {
                    fundSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        };
        UsersDetailComponent_1.prototype.onToggleStatus = function () {
            var _a;
            console.log('Changer statut de:', (_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
        };
        UsersDetailComponent_1.prototype.onDelete = function () {
            var _a;
            console.log('Supprimer l\'utilisateur:', (_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
        };
        return UsersDetailComponent_1;
    }());
    __setFunctionName(_classThis, "UsersDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersDetailComponent = _classThis;
}();
export { UsersDetailComponent };
//# sourceMappingURL=users-detail.component.js.map