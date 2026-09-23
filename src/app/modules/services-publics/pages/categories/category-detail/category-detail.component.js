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
var CategoryDetailComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-category-detail',
            standalone: false,
            templateUrl: './category-detail.component.html',
            styleUrls: ['./category-detail.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CategoryDetailComponent = _classThis = /** @class */ (function () {
        function CategoryDetailComponent_1(route, router, servicesPublicsService) {
            this.route = route;
            this.router = router;
            this.servicesPublicsService = servicesPublicsService;
            this.serviceId = 0;
            this.loading = false;
            this.notFound = false;
            // Pagination
            this.fraisCurrentPage = 1;
            this.fraisItemsPerPage = 10;
            this.fraisTotalPages = 0;
            this.documentsCurrentPage = 1;
            this.documentsItemsPerPage = 10;
            this.documentsTotalPages = 0;
            this.activeTab = 'frais';
            this.showNotification = false;
            this.notificationMessage = '';
            this.notificationType = 'success';
            // Formulaire Frais (modale)
            this.fraisModalOpen = false;
            this.fraisModalMode = 'add';
            this.fraisForm = this.getEmptyFraisForm();
            this.editingFraisId = null;
            // Formulaire Document requis (modale)
            this.documentModalOpen = false;
            this.documentModalMode = 'add';
            this.documentForm = this.getEmptyDocumentForm();
            this.editingDocumentId = null;
            this.Math = Math;
        }
        CategoryDetailComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));
            var categoryId = Number(this.route.snapshot.paramMap.get('id'));
            this.serviceId = serviceId;
            this.loading = true;
            // Récupérer le service et trouver la catégorie
            this.servicesPublicsService.getById(serviceId).subscribe({
                next: function (service) {
                    if (service && service.categories) {
                        _this.category = service.categories.find(function (c) { return c.id === categoryId; });
                        _this.notFound = !_this.category;
                    }
                    else {
                        _this.notFound = true;
                    }
                    _this.loading = false;
                    if (_this.category) {
                        _this.initPagination();
                    }
                },
                error: function () {
                    _this.notFound = true;
                    _this.loading = false;
                }
            });
        };
        CategoryDetailComponent_1.prototype.initPagination = function () {
            var _a, _b, _c, _d;
            this.fraisTotalPages = Math.ceil((((_b = (_a = this.category) === null || _a === void 0 ? void 0 : _a.frais) === null || _b === void 0 ? void 0 : _b.length) || 0) / this.fraisItemsPerPage);
            if (this.fraisTotalPages === 0)
                this.fraisTotalPages = 1;
            this.documentsTotalPages = Math.ceil((((_d = (_c = this.category) === null || _c === void 0 ? void 0 : _c.documentsRequis) === null || _d === void 0 ? void 0 : _d.length) || 0) / this.documentsItemsPerPage);
            if (this.documentsTotalPages === 0)
                this.documentsTotalPages = 1;
        };
        Object.defineProperty(CategoryDetailComponent_1.prototype, "paginatedFrais", {
            get: function () {
                var _a;
                if (!((_a = this.category) === null || _a === void 0 ? void 0 : _a.frais))
                    return [];
                var start = (this.fraisCurrentPage - 1) * this.fraisItemsPerPage;
                return this.category.frais.slice(start, start + this.fraisItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CategoryDetailComponent_1.prototype, "paginatedDocuments", {
            get: function () {
                var _a;
                if (!((_a = this.category) === null || _a === void 0 ? void 0 : _a.documentsRequis))
                    return [];
                var start = (this.documentsCurrentPage - 1) * this.documentsItemsPerPage;
                return this.category.documentsRequis.slice(start, start + this.documentsItemsPerPage);
            },
            enumerable: false,
            configurable: true
        });
        CategoryDetailComponent_1.prototype.changeFraisPage = function (page) {
            if (page < 1 || page > this.fraisTotalPages)
                return;
            this.fraisCurrentPage = page;
        };
        CategoryDetailComponent_1.prototype.getFraisPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.fraisCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.fraisTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        CategoryDetailComponent_1.prototype.changeDocumentsPage = function (page) {
            if (page < 1 || page > this.documentsTotalPages)
                return;
            this.documentsCurrentPage = page;
        };
        CategoryDetailComponent_1.prototype.getDocumentsPaginationPages = function () {
            var pages = [];
            var maxVisible = 5;
            var start = Math.max(1, this.documentsCurrentPage - Math.floor(maxVisible / 2));
            var end = Math.min(this.documentsTotalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        };
        CategoryDetailComponent_1.prototype.goBack = function () {
            this.router.navigate(['/services-publics', this.serviceId, 'categories']);
        };
        CategoryDetailComponent_1.prototype.onAddFrais = function () {
            if (!this.category)
                return;
            this.fraisModalMode = 'add';
            this.editingFraisId = null;
            this.fraisForm = this.getEmptyFraisForm();
            this.fraisModalOpen = true;
        };
        CategoryDetailComponent_1.prototype.onEditFrais = function (frais) {
            var _a, _b;
            this.fraisModalMode = 'edit';
            this.editingFraisId = frais.id;
            this.fraisForm = {
                nom: frais.nom,
                montant: frais.montant,
                devise: frais.devise || 'BIF',
                type: frais.type || 'FIXE',
                pourcentage: (_a = frais.pourcentage) !== null && _a !== void 0 ? _a : null,
                montantMin: (_b = frais.montantMin) !== null && _b !== void 0 ? _b : null,
                frequence: frais.frequence || 'PONCTUEL',
                actif: frais.actif !== false
            };
            this.fraisModalOpen = true;
        };
        CategoryDetailComponent_1.prototype.closeFraisModal = function () {
            this.fraisModalOpen = false;
        };
        CategoryDetailComponent_1.prototype.saveFrais = function () {
            var _this = this;
            if (!this.category)
                return;
            if (!this.fraisForm.nom || !this.fraisForm.nom.trim()) {
                this.showNotificationMessage('Le nom du frais est obligatoire.', 'error');
                return;
            }
            if (this.fraisForm.montant === null || this.fraisForm.montant === undefined || this.fraisForm.montant < 0) {
                this.showNotificationMessage('Le montant est invalide.', 'error');
                return;
            }
            if (this.fraisModalMode === 'add') {
                var newFrais = {
                    id: Date.now(),
                    nom: this.fraisForm.nom,
                    montant: Number(this.fraisForm.montant),
                    devise: this.fraisForm.devise || 'BIF',
                    type: this.fraisForm.type,
                    pourcentage: this.fraisForm.pourcentage,
                    montantMin: this.fraisForm.montantMin,
                    frequence: this.fraisForm.frequence,
                    actif: this.fraisForm.actif
                };
                this.category.frais = __spreadArray(__spreadArray([], (this.category.frais || []), true), [newFrais], false);
                this.initPagination();
                this.showNotificationMessage("Frais \"".concat(newFrais.nom, "\" ajout\u00E9 avec succ\u00E8s."), 'success');
            }
            else if (this.editingFraisId !== null && this.category.frais) {
                this.category.frais = this.category.frais.map(function (f) {
                    return f.id === _this.editingFraisId
                        ? __assign(__assign({}, f), { nom: _this.fraisForm.nom, montant: Number(_this.fraisForm.montant), devise: _this.fraisForm.devise, type: _this.fraisForm.type, pourcentage: _this.fraisForm.pourcentage, montantMin: _this.fraisForm.montantMin, frequence: _this.fraisForm.frequence, actif: _this.fraisForm.actif })
                        : f;
                });
                this.showNotificationMessage("Frais \"".concat(this.fraisForm.nom, "\" modifi\u00E9 avec succ\u00E8s."), 'success');
            }
            this.fraisModalOpen = false;
        };
        CategoryDetailComponent_1.prototype.onDeleteFrais = function (fraisId) {
            var _a;
            if (!((_a = this.category) === null || _a === void 0 ? void 0 : _a.frais))
                return;
            if (confirm('Êtes-vous sûr de vouloir supprimer ce frais ?')) {
                this.category.frais = this.category.frais.filter(function (f) { return f.id !== fraisId; });
                this.initPagination();
                if (this.fraisCurrentPage > this.fraisTotalPages) {
                    this.fraisCurrentPage = this.fraisTotalPages;
                }
                this.showNotificationMessage('Frais supprimé avec succès.', 'success');
            }
        };
        CategoryDetailComponent_1.prototype.getEmptyFraisForm = function () {
            return {
                nom: '',
                montant: null,
                devise: 'BIF',
                type: 'FIXE',
                pourcentage: null,
                montantMin: null,
                frequence: 'PONCTUEL',
                actif: true
            };
        };
        CategoryDetailComponent_1.prototype.onAddDocument = function () {
            if (!this.category)
                return;
            this.documentModalMode = 'add';
            this.editingDocumentId = null;
            this.documentForm = this.getEmptyDocumentForm();
            this.documentModalOpen = true;
        };
        CategoryDetailComponent_1.prototype.onEditDocument = function (doc) {
            this.documentModalMode = 'edit';
            this.editingDocumentId = doc.id;
            this.documentForm = {
                nom: doc.nom,
                description: doc.description || '',
                type: doc.type || 'AUTRE',
                format: doc.format || 'PDF',
                obligatoire: doc.obligatoire !== false,
                version: doc.version || ''
            };
            this.documentModalOpen = true;
        };
        CategoryDetailComponent_1.prototype.closeDocumentModal = function () {
            this.documentModalOpen = false;
        };
        CategoryDetailComponent_1.prototype.saveDocument = function () {
            var _this = this;
            if (!this.category)
                return;
            if (!this.documentForm.nom || !this.documentForm.nom.trim()) {
                this.showNotificationMessage('Le nom du document est obligatoire.', 'error');
                return;
            }
            if (this.documentModalMode === 'add') {
                var newDoc = {
                    id: Date.now(),
                    nom: this.documentForm.nom,
                    description: this.documentForm.description,
                    type: this.documentForm.type,
                    format: this.documentForm.format,
                    obligatoire: this.documentForm.obligatoire,
                    version: this.documentForm.version
                };
                this.category.documentsRequis = __spreadArray(__spreadArray([], (this.category.documentsRequis || []), true), [newDoc], false);
                this.initPagination();
                this.showNotificationMessage("Document \"".concat(newDoc.nom, "\" ajout\u00E9 avec succ\u00E8s."), 'success');
            }
            else if (this.editingDocumentId !== null && this.category.documentsRequis) {
                this.category.documentsRequis = this.category.documentsRequis.map(function (d) {
                    return d.id === _this.editingDocumentId
                        ? __assign(__assign({}, d), { nom: _this.documentForm.nom, description: _this.documentForm.description, type: _this.documentForm.type, format: _this.documentForm.format, obligatoire: _this.documentForm.obligatoire, version: _this.documentForm.version })
                        : d;
                });
                this.showNotificationMessage("Document \"".concat(this.documentForm.nom, "\" modifi\u00E9 avec succ\u00E8s."), 'success');
            }
            this.documentModalOpen = false;
        };
        CategoryDetailComponent_1.prototype.onDeleteDocument = function (docId) {
            var _a;
            if (!((_a = this.category) === null || _a === void 0 ? void 0 : _a.documentsRequis))
                return;
            if (confirm('Êtes-vous sûr de vouloir supprimer ce document requis ?')) {
                this.category.documentsRequis = this.category.documentsRequis.filter(function (d) { return d.id !== docId; });
                this.initPagination();
                if (this.documentsCurrentPage > this.documentsTotalPages) {
                    this.documentsCurrentPage = this.documentsTotalPages;
                }
                this.showNotificationMessage('Document supprimé avec succès.', 'success');
            }
        };
        CategoryDetailComponent_1.prototype.getEmptyDocumentForm = function () {
            return {
                nom: '',
                description: '',
                type: 'AUTRE',
                format: 'PDF',
                obligatoire: true,
                version: ''
            };
        };
        CategoryDetailComponent_1.prototype.showNotificationMessage = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'success'; }
            this.notificationMessage = message;
            this.notificationType = type;
            this.showNotification = true;
            setTimeout(function () {
                _this.showNotification = false;
            }, 3000);
        };
        CategoryDetailComponent_1.prototype.getFraisTypeLabel = function (type) {
            var labels = {
                'FIXE': 'Fixe',
                'PERCENTAGE': 'Pourcentage',
                'FORFAITAIRE': 'Forfaitaire'
            };
            return labels[type] || type;
        };
        CategoryDetailComponent_1.prototype.getFrequenceLabel = function (frequence) {
            var labels = {
                'MENSUEL': 'Mensuel',
                'TRIMESTRIEL': 'Trimestriel',
                'ANNUEL': 'Annuel',
                'PONCTUEL': 'Ponctuel'
            };
            return labels[frequence] || frequence;
        };
        CategoryDetailComponent_1.prototype.getTotalFrais = function () {
            var _a;
            if (!((_a = this.category) === null || _a === void 0 ? void 0 : _a.frais))
                return 0;
            return this.category.frais.reduce(function (sum, f) { return sum + f.montant; }, 0);
        };
        CategoryDetailComponent_1.prototype.getCategoryColor = function (code) {
            var colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
            var hash = 0;
            for (var i = 0; i < code.length; i++) {
                hash = code.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length] || '#16293a';
        };
        return CategoryDetailComponent_1;
    }());
    __setFunctionName(_classThis, "CategoryDetailComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CategoryDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CategoryDetailComponent = _classThis;
}();
export { CategoryDetailComponent };
//# sourceMappingURL=category-detail.component.js.map