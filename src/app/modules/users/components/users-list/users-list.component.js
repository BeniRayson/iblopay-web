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
// src/app/modules/users/components/users-list/users-list.component.ts
import { Component } from '@angular/core';
var DEFAULT_PHOTO = '';
var DEFAULT_CREATOR = {
    id: '',
    firstName: '',
    lastName: '',
    role: ''
};
var UsersListComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-users-list',
            templateUrl: './users-list.component.html',
            styleUrls: ['./users-list.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersListComponent = _classThis = /** @class */ (function () {
        function UsersListComponent_1(router) {
            this.router = router;
            this.users = [];
            this.filteredUsers = [];
            this.paginatedUsers = [];
            this.isLoading = false;
            this.searchTerm = '';
            this.selectedRole = '';
            this.selectedStatus = '';
            this.currentPage = 1;
            this.itemsPerPage = 50;
            this.totalPages = 0;
            this.stats = {
                total: 0,
                clients: 0,
                agents: 0,
                superAgents: 0,
                active: 0
            };
            // ─── MODAL STATUT ──────────────────────────────
            this.showStatusModal = false;
            this.statusLoading = false;
            this.statusError = '';
            this.statusSuccess = '';
            this.selectedUser = null;
            this.selectedNewStatus = '';
            this.currentUserStatus = '';
            this.statusOptions = [
                { value: 'ACTIVE', label: 'Actif', color: '#10b981', icon: 'fa-check-circle' },
                { value: 'SUSPENDED', label: 'Suspendu', color: '#f59e0b', icon: 'fa-pause-circle' },
                { value: 'FROZEN', label: 'Gelé', color: '#3b82f6', icon: 'fa-snowflake' },
                { value: 'CLOSED', label: 'Fermé', color: '#ef4444', icon: 'fa-times-circle' }
            ];
            // ─── MODAL SUPPRESSION ──────────────────────────
            this.showDeleteModal = false;
            this.deleteLoading = false;
            this.deleteError = '';
            this.deleteSuccess = '';
            this.Math = Math;
        }
        UsersListComponent_1.prototype.ngOnInit = function () {
            this.loadMockUsers();
        };
        UsersListComponent_1.prototype.loadMockUsers = function () {
            var _this = this;
            this.isLoading = true;
            setTimeout(function () {
                _this.users = _this.generateMockUsers();
                _this.refreshAll();
                _this.isLoading = false;
            }, 500);
        };
        UsersListComponent_1.prototype.generateMockUsers = function () {
            var firstNames = ['Jean', 'Marie', 'Pierre', 'Claire', 'Michel', 'Anne', 'Paul', 'Jeanne', 'Alain', 'Rose',
                'David', 'Martine', 'Joseph', 'Françoise', 'Emmanuel', 'Catherine', 'Thomas', 'Nathalie',
                'Philippe', 'Isabelle', 'Eric', 'Valérie', 'Nicolas', 'Sandrine', 'Christian', 'Brigitte',
                'Patrick', 'Céline', 'Didier', 'Sophie', 'André', 'Monique', 'Laurent', 'Chantal', 'Pascal',
                'Fabrice', 'Jacqueline', 'Marcel', 'Suzanne', 'Henri', 'Louise', 'Georges', 'Jeannine',
                'Maurice', 'Simone', 'René', 'Odette', 'Raymond', 'Marcelle', 'Lucien', 'Sylvie', 'Bertrand'];
            var lastNames = ['Ndayishimiye', 'Uwimana', 'Niyonzima', 'Mukiza', 'Nishimwe', 'Hakizimana', 'Mbonimpa',
                'Nkurunziza', 'Ntakarutimana', 'Gahungu', 'Bashirahishize', 'Ndikumana', 'Niyungeko',
                'Ndayisaba', 'Habonimana', 'Manirakiza', 'Barakamfitiye', 'Nimpagaritse', 'Nirere',
                'Nyandwi', 'Ndamukunda', 'Hakizinka', 'Gashirabake', 'Rutayisire', 'Nduwimana',
                'Niyongabo', 'Ndayizeye', 'Niyonshuti', 'Uwizeyimana', 'Ntibazobimana', 'Baranyizigiye',
                'Niyikiza', 'Niyomugabo', 'Hakorimana', 'Ndayisenga', 'Ntamwenge', 'Niyokwizera'];
            var communes = ['Mukaza', 'Ntahangwa', 'Muha', 'Isale', 'Kabezi', 'Mubimbi', 'Mugongomanga',
                'Muhuta', 'Mukike', 'Mutambu', 'Mutimbuzi', 'Nyabiraba', 'Buyenzi', 'Kinindo'];
            var zones = ['Nyakabiga', 'Kigobe', 'Rohero', 'Kanyosha', 'Ruziba', 'Kinama', 'Gihosha',
                'Kiriri', 'Musaga', 'Ntare', 'Cibitoke', 'Ngagara', 'Gatoke', 'Vugizo',
                'Kwijabe', 'Gasenyi', 'Kavumu', 'Rukaramu', 'Taba', 'Bwiza', 'Gatete'];
            var provinces = ['Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Gitega', 'Muramvya',
                'Ngozi', 'Muyinga', 'Ruyigi', 'Kirundo', 'Kayanza', 'Karuzi', 'Cankuzo'];
            var roles = ['CLIENT', 'AGENT', 'SUPER_AGENT'];
            var statuses = ['ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
            var users = [];
            for (var i = 1; i <= 80; i++) {
                var firstName = firstNames[i % firstNames.length] || 'Jean';
                var lastName = lastNames[i % lastNames.length] || 'Dupont';
                var role = roles[i % roles.length] || 'CLIENT';
                var status_1 = statuses[i % statuses.length] || 'ACTIVE';
                var province = provinces[i % provinces.length] || 'Bujumbura Mairie';
                var commune = communes[i % communes.length] || 'Mukaza';
                var zone = zones[i % zones.length] || 'Nyakabiga';
                var createdBy = __assign({}, DEFAULT_CREATOR);
                if (role === 'CLIENT') {
                    var creatorIndex = (i + 1) % 20;
                    createdBy = {
                        id: "agent-".concat(creatorIndex + 1),
                        firstName: firstNames[creatorIndex] || 'Agent',
                        lastName: lastNames[creatorIndex] || 'Créateur',
                        role: 'AGENT'
                    };
                }
                else if (role === 'AGENT') {
                    var creatorIndex = (i + 3) % 10;
                    createdBy = {
                        id: "super-".concat(creatorIndex + 1),
                        firstName: firstNames[creatorIndex + 15] || 'Super',
                        lastName: lastNames[creatorIndex + 15] || 'Agent',
                        role: 'SUPER_AGENT'
                    };
                }
                else {
                    createdBy = {
                        id: '',
                        firstName: '',
                        lastName: '',
                        role: ''
                    };
                }
                var cardNumber = "CARD-".concat(String(20240000 + i * 123).substring(0, 12));
                var cniNumber = "CNI-".concat(String(100000 + i * 7));
                users.push({
                    id: "user-".concat(String(i).padStart(4, '0')),
                    firstName: firstName,
                    lastName: lastName,
                    email: "".concat(firstName.toLowerCase(), ".").concat(lastName.toLowerCase(), "@iblopay.bi"),
                    phone: "+257 6".concat(String(10000000 + i * 7).substring(0, 8)),
                    photoUrl: i % 5 === 0 ? "https://i.pravatar.cc/150?img=".concat(i) : DEFAULT_PHOTO,
                    role: role,
                    status: status_1,
                    cardNumber: cardNumber,
                    cniNumber: cniNumber,
                    address: {
                        zone: zone,
                        commune: commune,
                        province: province,
                        fullAddress: "".concat(zone, "; ").concat(commune, "; ").concat(province)
                    },
                    createdAt: new Date(2024, 0, 1 + i),
                    createdBy: createdBy,
                    accountNumber: "IBL-".concat(String(100000000 + i * 98765).substring(0, 12)),
                    walletBalance: Math.round((100000 + i * 15000) / 100) * 100
                });
            }
            return users;
        };
        UsersListComponent_1.prototype.refreshAll = function () {
            var _this = this;
            var term = this.searchTerm.toLowerCase().trim();
            this.filteredUsers = this.users.filter(function (user) {
                var matchesSearch = !term ||
                    user.firstName.toLowerCase().includes(term) ||
                    user.lastName.toLowerCase().includes(term) ||
                    user.email.toLowerCase().includes(term) ||
                    user.phone.includes(term) ||
                    user.cardNumber.toLowerCase().includes(term) ||
                    user.cniNumber.includes(term) ||
                    user.address.fullAddress.toLowerCase().includes(term);
                var matchesRole = !_this.selectedRole || user.role === _this.selectedRole;
                var matchesStatus = !_this.selectedStatus || user.status === _this.selectedStatus;
                return matchesSearch && matchesRole && matchesStatus;
            });
            this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
            var startIndex = (this.currentPage - 1) * this.itemsPerPage;
            var endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredUsers.length);
            this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
            this.updateStats();
        };
        UsersListComponent_1.prototype.updateStats = function () {
            this.stats.total = this.users.length;
            this.stats.clients = this.users.filter(function (u) { return u.role === 'CLIENT'; }).length;
            this.stats.agents = this.users.filter(function (u) { return u.role === 'AGENT'; }).length;
            this.stats.superAgents = this.users.filter(function (u) { return u.role === 'SUPER_AGENT'; }).length;
            this.stats.active = this.users.filter(function (u) { return u.status === 'ACTIVE'; }).length;
        };
        UsersListComponent_1.prototype.applyFilters = function () {
            this.currentPage = 1;
            this.refreshAll();
        };
        UsersListComponent_1.prototype.changePage = function (page) {
            if (page < 1 || page > this.totalPages)
                return;
            this.currentPage = page;
            this.refreshAll();
        };
        UsersListComponent_1.prototype.getPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.totalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        UsersListComponent_1.prototype.getInitials = function (firstName, lastName) {
            return "".concat(firstName.charAt(0)).concat(lastName.charAt(0)).toUpperCase();
        };
        UsersListComponent_1.prototype.getAvatarColor = function (id) {
            var colors = [
                '#4f46e5', '#7c3aed', '#ec4899', '#f43f5e',
                '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'
            ];
            var hash = 0;
            for (var i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }
            var index = Math.abs(hash) % colors.length;
            return colors[index] || '#4f46e5';
        };
        UsersListComponent_1.prototype.getStatusClass = function (status) {
            return "status-".concat(status.toLowerCase());
        };
        UsersListComponent_1.prototype.getStatusLabel = function (status) {
            var labels = {
                'ACTIVE': 'Actif',
                'SUSPENDED': 'Suspendu',
                'FROZEN': 'Gelé',
                'CLOSED': 'Fermé'
            };
            return labels[status] || status;
        };
        UsersListComponent_1.prototype.getRoleClass = function (role) {
            return "role-".concat(role.toLowerCase().replace('_', '-'));
        };
        UsersListComponent_1.prototype.getRoleLabel = function (role) {
            var labels = {
                'CLIENT': 'Client',
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || role;
        };
        UsersListComponent_1.prototype.getCreatorRoleLabel = function (role) {
            var labels = {
                'AGENT': 'Agent',
                'SUPER_AGENT': 'Super Agent'
            };
            return labels[role] || '';
        };
        UsersListComponent_1.prototype.onSearchChange = function () {
            this.applyFilters();
        };
        UsersListComponent_1.prototype.onFilterChange = function () {
            this.applyFilters();
        };
        UsersListComponent_1.prototype.clearFilters = function () {
            this.searchTerm = '';
            this.selectedRole = '';
            this.selectedStatus = '';
            this.applyFilters();
        };
        // ─── ACTIONS ──────────────────────────────────────────────
        UsersListComponent_1.prototype.onViewUser = function (user) {
            this.router.navigate(['/users', user.id]);
        };
        UsersListComponent_1.prototype.onEditUser = function (user) {
            this.router.navigate(['/users', user.id, 'edit']);
        };
        UsersListComponent_1.prototype.onFundUser = function (user) {
            this.router.navigate(['/users', user.id, 'fund']);
        };
        // ─── MODALE STATUT ────────────────────────────────────────
        UsersListComponent_1.prototype.onToggleStatus = function (user) {
            this.selectedUser = user;
            this.currentUserStatus = user.status;
            this.selectedNewStatus = user.status;
            this.statusError = '';
            this.statusSuccess = '';
            this.showStatusModal = true;
        };
        UsersListComponent_1.prototype.closeStatusModal = function () {
            this.showStatusModal = false;
            this.selectedUser = null;
            this.statusError = '';
            this.statusSuccess = '';
            this.statusLoading = false;
        };
        UsersListComponent_1.prototype.onStatusChange = function () {
            this.statusError = '';
            this.statusSuccess = '';
        };
        UsersListComponent_1.prototype.selectStatus = function (value) {
            this.selectedNewStatus = value;
            this.onStatusChange();
        };
        UsersListComponent_1.prototype.confirmStatusChange = function () {
            var _this = this;
            if (!this.selectedUser || !this.selectedNewStatus) {
                return;
            }
            if (this.selectedNewStatus === this.currentUserStatus) {
                this.statusError = 'Veuillez sélectionner un statut différent';
                return;
            }
            this.statusLoading = true;
            this.statusError = '';
            this.statusSuccess = '';
            setTimeout(function () {
                var oldStatus = _this.selectedUser.status;
                var userId = _this.selectedUser.id;
                var newStatus = _this.selectedNewStatus;
                _this.users = _this.users.map(function (user) {
                    if (user.id === userId) {
                        return __assign(__assign({}, user), { status: newStatus });
                    }
                    return user;
                });
                if (_this.selectedUser) {
                    _this.selectedUser.status = newStatus;
                }
                _this.refreshAll();
                _this.statusLoading = false;
                _this.statusSuccess = "\u2705 Statut chang\u00E9 de \"".concat(_this.getStatusLabel(oldStatus), "\" \u00E0 \"").concat(_this.getStatusLabel(newStatus), "\" avec succ\u00E8s !");
                setTimeout(function () {
                    _this.closeStatusModal();
                }, 2000);
            }, 1500);
        };
        UsersListComponent_1.prototype.getStatusOptionLabel = function (status) {
            var option = this.statusOptions.find(function (s) { return s.value === status; });
            return (option === null || option === void 0 ? void 0 : option.label) || status;
        };
        UsersListComponent_1.prototype.getStatusOptionColor = function (status) {
            var option = this.statusOptions.find(function (s) { return s.value === status; });
            return (option === null || option === void 0 ? void 0 : option.color) || '#6b7280';
        };
        UsersListComponent_1.prototype.getStatusOptionIcon = function (status) {
            var option = this.statusOptions.find(function (s) { return s.value === status; });
            return (option === null || option === void 0 ? void 0 : option.icon) || 'fa-circle';
        };
        // ─── MODALE SUPPRESSION ───────────────────────────────────
        UsersListComponent_1.prototype.onDeleteUser = function (user) {
            this.selectedUser = user;
            this.deleteError = '';
            this.deleteSuccess = '';
            this.showDeleteModal = true;
        };
        UsersListComponent_1.prototype.closeDeleteModal = function () {
            this.showDeleteModal = false;
            this.selectedUser = null;
            this.deleteError = '';
            this.deleteSuccess = '';
            this.deleteLoading = false;
        };
        UsersListComponent_1.prototype.confirmDelete = function () {
            var _this = this;
            if (!this.selectedUser) {
                this.deleteError = 'Aucun utilisateur sélectionné';
                return;
            }
            this.deleteLoading = true;
            this.deleteError = '';
            this.deleteSuccess = '';
            setTimeout(function () {
                var userId = _this.selectedUser.id;
                var userName = "".concat(_this.selectedUser.firstName, " ").concat(_this.selectedUser.lastName);
                // Supprimer l'utilisateur de la liste
                _this.users = _this.users.filter(function (user) { return user.id !== userId; });
                _this.refreshAll();
                _this.deleteLoading = false;
                _this.deleteSuccess = "\u2705 Utilisateur \"".concat(userName, "\" supprim\u00E9 avec succ\u00E8s !");
                setTimeout(function () {
                    _this.closeDeleteModal();
                }, 2000);
            }, 1500);
        };
        return UsersListComponent_1;
    }());
    __setFunctionName(_classThis, "UsersListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersListComponent = _classThis;
}();
export { UsersListComponent };
//# sourceMappingURL=users-list.component.js.map