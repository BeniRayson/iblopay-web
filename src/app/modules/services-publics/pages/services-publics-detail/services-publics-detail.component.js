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
var ServicesPublicsDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-services-publics-detail',
            standalone: false,
            templateUrl: './services-publics-detail.component.html',
            styleUrls: ['./services-publics-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesPublicsDetailComponent = _classThis = /** @class */ (function () {
        function ServicesPublicsDetailComponent_1(route, router, servicesPublicsService) {
            this.route = route;
            this.router = router;
            this.servicesPublicsService = servicesPublicsService;
            this.loading = false;
            this.notFound = false;
            // Module actif
            this.activeModule = 'apercu';
            // ============================================================
            // PAGINATION
            // ============================================================
            this.usersCurrentPage = 1;
            this.usersItemsPerPage = 10;
            this.usersTotalPages = 0;
            this.categoriesCurrentPage = 1;
            this.categoriesItemsPerPage = 10;
            this.categoriesTotalPages = 0;
            this.typesRNFCurrentPage = 1;
            this.typesRNFItemsPerPage = 10;
            this.typesRNFTotalsPages = 0;
            this.paiementsCurrentPage = 1;
            this.paiementsItemsPerPage = 10;
            this.paiementsTotalPages = 0;
            this.activitiesCurrentPage = 1;
            this.activitiesItemsPerPage = 12;
            this.activityTypeFilter = '';
            // ============================================================
            // ACTIVITÉS EN TEMPS RÉEL
            // ============================================================
            this.allActivities = [];
            this.activityCounter = 0;
            // ============================================================
            // EXPORT
            // ============================================================
            this.exportLoading = false;
            // Notification
            this.showNotification = false;
            this.notificationMessage = '';
            this.notificationType = 'success';
            // Fiche Type RNF (aperçu rapide)
            this.viewingTypeRNF = null;
            this.Math = Math;
            // Types pour getRandomItem
            this.activityTypes = ['paiement', 'utilisateur', 'categorie', 'type-rnf'];
        }
        ServicesPublicsDetailComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var id = Number(this.route.snapshot.paramMap.get('id'));
            this.loading = true;
            this.servicesPublicsService.getById(id).subscribe({
                next: function (data) {
                    _this.service = data;
                    _this.notFound = !data;
                    _this.loading = false;
                    if (_this.service) {
                        _this.initPagination();
                        _this.initActivities();
                        _this.startActivityRealtime();
                    }
                },
                error: function () {
                    _this.notFound = true;
                    _this.loading = false;
                }
            });
        };
        ServicesPublicsDetailComponent_1.prototype.ngOnDestroy = function () {
            this.stopActivityRealtime();
        };
        // ============================================================
        // INITIALISATION
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.initPagination = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            this.usersTotalPages = Math.ceil((((_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.utilisateurs) === null || _b === void 0 ? void 0 : _b.length) || 0) / this.usersItemsPerPage);
            if (this.usersTotalPages === 0)
                this.usersTotalPages = 1;
            this.categoriesTotalPages = Math.ceil((((_d = (_c = this.service) === null || _c === void 0 ? void 0 : _c.categories) === null || _d === void 0 ? void 0 : _d.length) || 0) / this.categoriesItemsPerPage);
            if (this.categoriesTotalPages === 0)
                this.categoriesTotalPages = 1;
            this.typesRNFTotalsPages = Math.ceil((((_f = (_e = this.service) === null || _e === void 0 ? void 0 : _e.typesRNF) === null || _f === void 0 ? void 0 : _f.length) || 0) / this.typesRNFItemsPerPage);
            if (this.typesRNFTotalsPages === 0)
                this.typesRNFTotalsPages = 1;
            this.paiementsTotalPages = Math.ceil((((_h = (_g = this.service) === null || _g === void 0 ? void 0 : _g.paiements) === null || _h === void 0 ? void 0 : _h.length) || 0) / this.paiementsItemsPerPage);
            if (this.paiementsTotalPages === 0)
                this.paiementsTotalPages = 1;
        };
        // ============================================================
        // ACTIVITÉS EN TEMPS RÉEL
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.initActivities = function () {
            this.allActivities = this.generateInitialActivities();
            this.activityCounter = this.allActivities.length;
        };
        ServicesPublicsDetailComponent_1.prototype.getRandomItem = function (array, fallback) {
            if (!array || array.length === 0)
                return fallback;
            return array[Math.floor(Math.random() * array.length)] || fallback;
        };
        ServicesPublicsDetailComponent_1.prototype.generateInitialActivities = function () {
            var activities = [];
            var titles = [
                'Nouveau paiement RNF enregistré',
                'Utilisateur ajouté au système',
                'Nouvelle catégorie créée',
                'Type RNF mis à jour',
                'Paiement validé',
                'Nouvel utilisateur inscrit',
                'Catégorie modifiée',
                'Type RNF ajouté'
            ];
            var users = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Nkurunziza', 'Claire Niyonzima', 'Système'];
            for (var i = 0; i < 15; i++) {
                var date = new Date();
                date.setMinutes(date.getMinutes() - i * 3 - Math.random() * 10);
                activities.push({
                    id: i + 1,
                    type: this.getRandomItem(this.activityTypes, 'paiement'),
                    title: this.getRandomItem(titles, 'Nouvelle activité'),
                    user: this.getRandomItem(users, 'Système'),
                    date: date
                });
            }
            return activities.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
        };
        ServicesPublicsDetailComponent_1.prototype.startActivityRealtime = function () {
            var _this = this;
            this.activityInterval = setInterval(function () {
                _this.addNewActivity();
            }, 5000);
        };
        ServicesPublicsDetailComponent_1.prototype.stopActivityRealtime = function () {
            if (this.activityInterval) {
                clearInterval(this.activityInterval);
                this.activityInterval = null;
            }
        };
        ServicesPublicsDetailComponent_1.prototype.addNewActivity = function () {
            var titles = [
                'Nouveau paiement RNF enregistré',
                'Utilisateur ajouté au système',
                'Nouvelle catégorie créée',
                'Type RNF mis à jour',
                'Paiement validé',
                'Nouvel utilisateur inscrit'
            ];
            var users = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Nkurunziza', 'Claire Niyonzima', 'Système'];
            this.activityCounter++;
            var newActivity = {
                id: this.activityCounter,
                type: this.getRandomItem(this.activityTypes, 'paiement'),
                title: this.getRandomItem(titles, 'Nouvelle activité'),
                user: this.getRandomItem(users, 'Système'),
                date: new Date()
            };
            this.allActivities = __spreadArray([newActivity], this.allActivities, true);
            if (this.allActivities.length > 100) {
                this.allActivities = this.allActivities.slice(0, 100);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.getRecentActivities = function (limit) {
            if (limit === void 0) { limit = 10; }
            return this.allActivities.slice(0, limit);
        };
        ServicesPublicsDetailComponent_1.prototype.getAllActivitiesCount = function () {
            return this.allActivities.length;
        };
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "filteredActivities", {
            // ============================================================
            // ONGLET "TOUTES LES ACTIVITÉS"
            // ============================================================
            get: function () {
                var _this = this;
                if (!this.activityTypeFilter)
                    return this.allActivities;
                return this.allActivities.filter(function (a) { return a.type === _this.activityTypeFilter; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "activitiesTotalPages", {
            get: function () {
                return Math.max(1, Math.ceil(this.filteredActivities.length / this.activitiesItemsPerPage));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "paginatedActivities", {
            get: function () {
                var start = (this.activitiesCurrentPage - 1) * this.activitiesItemsPerPage;
                return this.filteredActivities.slice(start, start + this.activitiesItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        ServicesPublicsDetailComponent_1.prototype.setActivityFilter = function (type) {
            this.activityTypeFilter = type;
            this.activitiesCurrentPage = 1;
        };
        ServicesPublicsDetailComponent_1.prototype.changeActivitiesPage = function (page) {
            if (page < 1 || page > this.activitiesTotalPages)
                return;
            this.activitiesCurrentPage = page;
        };
        ServicesPublicsDetailComponent_1.prototype.getActivitiesPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.activitiesCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.activitiesTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        ServicesPublicsDetailComponent_1.prototype.getActivityTypeLabel = function (type) {
            var labels = {
                'paiement': 'Paiement',
                'utilisateur': 'Utilisateur',
                'categorie': 'Catégorie',
                'type-rnf': 'Type RNF',
                'system': 'Système'
            };
            return labels[type] || type;
        };
        // ============================================================
        // MODULES - NAVIGATION
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.switchModule = function (module) {
            this.activeModule = module;
        };
        ServicesPublicsDetailComponent_1.prototype.getTotalItems = function () {
            var _a, _b, _c, _d;
            if (!this.service)
                return 0;
            return (((_a = this.service.utilisateurs) === null || _a === void 0 ? void 0 : _a.length) || 0) +
                (((_b = this.service.categories) === null || _b === void 0 ? void 0 : _b.length) || 0) +
                (((_c = this.service.typesRNF) === null || _c === void 0 ? void 0 : _c.length) || 0) +
                (((_d = this.service.paiements) === null || _d === void 0 ? void 0 : _d.length) || 0);
        };
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "paginatedUtilisateurs", {
            // ============================================================
            // GETTERS PAGINATION
            // ============================================================
            get: function () {
                var _a;
                if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.utilisateurs))
                    return [];
                var start = (this.usersCurrentPage - 1) * this.usersItemsPerPage;
                return this.service.utilisateurs.slice(start, start + this.usersItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "paginatedCategories", {
            get: function () {
                var _a;
                if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.categories))
                    return [];
                var start = (this.categoriesCurrentPage - 1) * this.categoriesItemsPerPage;
                return this.service.categories.slice(start, start + this.categoriesItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "paginatedTypesRNF", {
            get: function () {
                var _a;
                if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.typesRNF))
                    return [];
                var start = (this.typesRNFCurrentPage - 1) * this.typesRNFItemsPerPage;
                return this.service.typesRNF.slice(start, start + this.typesRNFItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ServicesPublicsDetailComponent_1.prototype, "paginatedPaiements", {
            get: function () {
                var _a;
                if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.paiements))
                    return [];
                var start = (this.paiementsCurrentPage - 1) * this.paiementsItemsPerPage;
                return this.service.paiements.slice(start, start + this.paiementsItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        // ============================================================
        // MÉTHODES DE PAGINATION - UTILISATEURS
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.changeUsersPage = function (page) {
            if (page < 1 || page > this.usersTotalPages)
                return;
            this.usersCurrentPage = page;
        };
        ServicesPublicsDetailComponent_1.prototype.getUsersPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.usersCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.usersTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        // ============================================================
        // MÉTHODES DE PAGINATION - CATÉGORIES
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.changeCategoriesPage = function (page) {
            if (page < 1 || page > this.categoriesTotalPages)
                return;
            this.categoriesCurrentPage = page;
        };
        ServicesPublicsDetailComponent_1.prototype.getCategoriesPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.categoriesCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.categoriesTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        // ============================================================
        // MÉTHODES DE PAGINATION - TYPES RNF
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.changeTypesRNFPage = function (page) {
            if (page < 1 || page > this.typesRNFTotalsPages)
                return;
            this.typesRNFCurrentPage = page;
        };
        ServicesPublicsDetailComponent_1.prototype.getTypesRNFPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.typesRNFCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.typesRNFTotalsPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        // ============================================================
        // MÉTHODES DE PAGINATION - PAIEMENTS
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.changePaiementsPage = function (page) {
            if (page < 1 || page > this.paiementsTotalPages)
                return;
            this.paiementsCurrentPage = page;
        };
        ServicesPublicsDetailComponent_1.prototype.getPaiementsPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.paiementsCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.paiementsTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        // ============================================================
        // NAVIGATION
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.goBack = function () {
            this.router.navigate(['../'], { relativeTo: this.route });
        };
        // ============================================================
        // ACTIONS SERVICE
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.onEdit = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id]);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onActivate = function () {
            var _this = this;
            if (!this.service || this.service.actif)
                return;
            var updatedService = __assign(__assign({}, this.service), { actif: true });
            this.servicesPublicsService.update(updatedService).subscribe({
                next: function () {
                    var _a;
                    _this.service = updatedService;
                    _this.addActivity('system', "Service \"".concat((_a = _this.service) === null || _a === void 0 ? void 0 : _a.abreviation, "\" activ\u00E9"));
                },
                error: function () { }
            });
        };
        ServicesPublicsDetailComponent_1.prototype.onDeactivate = function () {
            var _this = this;
            if (!this.service || !this.service.actif)
                return;
            var updatedService = __assign(__assign({}, this.service), { actif: false });
            this.servicesPublicsService.update(updatedService).subscribe({
                next: function () {
                    var _a;
                    _this.service = updatedService;
                    _this.addActivity('system', "Service \"".concat((_a = _this.service) === null || _a === void 0 ? void 0 : _a.abreviation, "\" d\u00E9sactiv\u00E9"));
                },
                error: function () { }
            });
        };
        // ============================================================
        // ACTIONS UTILISATEURS
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.onAddUtilisateur = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'utilisateur', 'new']);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onEditUtilisateur = function (user) {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'utilisateur', user.id]);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onToggleUtilisateur = function (user) {
            var newStatut = user.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF';
            if (this.service && this.service.utilisateurs) {
                this.service.utilisateurs = this.service.utilisateurs.map(function (u) {
                    return u.id === user.id ? __assign(__assign({}, u), { statut: newStatut }) : u;
                });
                this.addActivity(user.prenom + ' ' + user.nom, "Statut de l'utilisateur chang\u00E9 en ".concat(newStatut));
                this.initPagination();
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onDeleteUtilisateur = function (user) {
            if (!this.service || !this.service.utilisateurs)
                return;
            if (confirm("\u00CAtes-vous s\u00FBr de vouloir supprimer l'utilisateur ".concat(user.prenom, " ").concat(user.nom, " ?"))) {
                this.service.utilisateurs = this.service.utilisateurs.filter(function (u) { return u.id !== user.id; });
                this.addActivity('system', "Utilisateur \"".concat(user.prenom, " ").concat(user.nom, "\" supprim\u00E9"));
                this.initPagination();
            }
        };
        // ============================================================
        // ACTIONS CATÉGORIES
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.onAddCategory = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', 'new']);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onViewCategory = function (category) {
            if (this.service) {
                this.router.navigate(['/services-publics', this.service.id, 'categories', category.id]);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onEditCategory = function (category) {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', category.id]);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onToggleCategory = function (category) {
            category.actif = !category.actif;
            this.addActivity('system', "Cat\u00E9gorie \"".concat(category.nom, "\" ").concat(category.actif ? 'activée' : 'désactivée'));
        };
        ServicesPublicsDetailComponent_1.prototype.getCategoryColor = function (code) {
            var colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
            var hash = 0;
            for (var i = 0; i < code.length; i++) {
                hash = code.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#16293a';
        };
        // ============================================================
        // ACTIONS TYPES RNF
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.onAddTypeRNF = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'type-rnf', 'new']);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onViewTypeRNF = function (type) {
            this.viewingTypeRNF = type;
        };
        ServicesPublicsDetailComponent_1.prototype.closeTypeRNFModal = function () {
            this.viewingTypeRNF = null;
        };
        ServicesPublicsDetailComponent_1.prototype.onEditTypeRNF = function (type) {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'type-rnf', type.id]);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.onToggleTypeRNF = function (type) {
            type.actif = !type.actif;
            this.addActivity('system', "Type RNF \"".concat(type.libelle, "\" ").concat(type.actif ? 'activé' : 'désactivé'));
        };
        // ============================================================
        // ACTIONS PAIEMENTS
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.onAddPaiement = function () {
            if (this.service) {
                this.router.navigate(['/services-publics/edit', this.service.id, 'paiement', 'new']);
            }
        };
        ServicesPublicsDetailComponent_1.prototype.getTypeRNFNom = function (typeRNFId) {
            var _a, _b;
            var type = (_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.typesRNF) === null || _b === void 0 ? void 0 : _b.find(function (t) { return t.id === typeRNFId; });
            return (type === null || type === void 0 ? void 0 : type.libelle) || 'N/A';
        };
        ServicesPublicsDetailComponent_1.prototype.getSousTypeRNFNom = function (sousTypeRNFId) {
            var _a, _b;
            if (!sousTypeRNFId)
                return 'N/A';
            for (var _i = 0, _c = ((_a = this.service) === null || _a === void 0 ? void 0 : _a.typesRNF) || []; _i < _c.length; _i++) {
                var type = _c[_i];
                var sousType = (_b = type.sousTypes) === null || _b === void 0 ? void 0 : _b.find(function (st) { return st.id === sousTypeRNFId; });
                if (sousType)
                    return sousType.nom;
            }
            return 'N/A';
        };
        ServicesPublicsDetailComponent_1.prototype.getTotalPaiements = function () {
            var _a;
            if (!((_a = this.service) === null || _a === void 0 ? void 0 : _a.paiements))
                return 0;
            return this.service.paiements.reduce(function (sum, p) { return sum + (p.montant || 0); }, 0);
        };
        // ============================================================
        // EXPORT
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.exportUsers = function () {
            this.exportData('UTILISATEURS', 'export_utilisateurs');
        };
        ServicesPublicsDetailComponent_1.prototype.exportCategories = function () {
            this.exportData('CATEGORIES', 'export_categories');
        };
        ServicesPublicsDetailComponent_1.prototype.exportTypesRNF = function () {
            this.exportData('TYPES_RNF', 'export_types_rnf');
        };
        ServicesPublicsDetailComponent_1.prototype.exportPaiements = function () {
            this.exportData('PAIEMENTS', 'export_paiements');
        };
        ServicesPublicsDetailComponent_1.prototype.exportData = function (type, fileName) {
            var _this = this;
            var _a;
            this.exportLoading = true;
            var serviceName = ((_a = this.service) === null || _a === void 0 ? void 0 : _a.abreviation) || 'service';
            setTimeout(function () {
                _this.exportLoading = false;
                console.log("Export ".concat(type, " du service ").concat(serviceName, " termin\u00E9 avec succ\u00E8s."));
                _this.addActivity('system', "Export ".concat(type, " effectu\u00E9"));
                _this.showNotification = true;
                _this.notificationMessage = "Export ".concat(type, " termin\u00E9 avec succ\u00E8s !");
                _this.notificationType = 'success';
                setTimeout(function () {
                    _this.showNotification = false;
                }, 3000);
            }, 1500);
        };
        // ============================================================
        // GESTION DES ACTIVITÉS
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.addActivity = function (user, action) {
            var newActivity = {
                id: ++this.activityCounter,
                type: 'system',
                title: action,
                user: user,
                date: new Date()
            };
            this.allActivities = __spreadArray([newActivity], this.allActivities, true);
            if (this.allActivities.length > 100) {
                this.allActivities = this.allActivities.slice(0, 100);
            }
        };
        // ============================================================
        // UTILITAIRES
        // ============================================================
        ServicesPublicsDetailComponent_1.prototype.getServiceColor = function (abreviation) {
            if (!abreviation)
                return '#16293a';
            var colors = [
                '#16293a', '#a9803d', '#386a4e', '#9c4033',
                '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e',
                '#46586a', '#85661f', '#2f4f5e', '#734531'
            ];
            var hash = 0;
            for (var i = 0; i < abreviation.length; i++) {
                hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#16293a';
        };
        ServicesPublicsDetailComponent_1.prototype.closeNotification = function () {
            this.showNotification = false;
        };
        return ServicesPublicsDetailComponent_1;
    }());
    __setFunctionName(_classThis, "ServicesPublicsDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesPublicsDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesPublicsDetailComponent = _classThis;
}();
export { ServicesPublicsDetailComponent };
//# sourceMappingURL=services-publics-detail.component.js.map