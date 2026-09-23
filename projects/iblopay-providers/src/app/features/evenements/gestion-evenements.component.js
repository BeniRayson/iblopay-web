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
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
var GestionEvenementsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-gestion-evenements',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './gestion-evenements.component.html',
            styleUrl: './gestion-evenements.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GestionEvenementsComponent = _classThis = /** @class */ (function () {
        function GestionEvenementsComponent_1(evenementsService, toastService) {
            this.evenementsService = evenementsService;
            this.toastService = toastService;
            this.vueActive = 'EVENEMENTS';
            this.evenements = [];
            this.evenementsFiltres = [];
            this.organisateurs = [];
            this.organisateursFiltres = [];
            this.lieux = [];
            this.filtreType = '';
            this.filtreStatutEvenement = '';
            this.filtreStatutOrganisateur = '';
            this.recherche = '';
            this.isLoading = true;
            this.showEvenementModal = false;
            this.evenementForm = null;
            this.nouvelleCategorieNom = '';
            this.nouvelleCategoriePrix = 5000;
            this.nouvelleCategorieQuantite = 100;
            this.showOrganisateurModal = false;
            this.organisateurForm = null;
            // ─── DÉTAIL & HISTORIQUE ───────────────────────────────────
            this.evenementDetailAffiche = null;
            this.organisateurDetailAffiche = null;
            this.historiqueOuvert = false;
            this.historiqueTitre = '';
            this.historiqueLignes = [];
            this.historiquePage = 1;
            this.historiquePageSize = 10;
        }
        GestionEvenementsComponent_1.prototype.ngOnInit = function () {
            this.charger();
        };
        GestionEvenementsComponent_1.prototype.charger = function () {
            var _this = this;
            this.isLoading = true;
            this.evenementsService.getLieux().subscribe(function (l) { return _this.lieux = l; });
            this.evenementsService.getEvenements().subscribe(function (e) {
                _this.evenements = e;
                _this.appliquerFiltresEvenements();
                _this.evenementsService.getOrganisateurs().subscribe(function (o) {
                    _this.organisateurs = o;
                    _this.appliquerFiltresOrganisateurs();
                    _this.isLoading = false;
                });
            });
        };
        GestionEvenementsComponent_1.prototype.changerVue = function (vue) {
            this.vueActive = vue;
        };
        GestionEvenementsComponent_1.prototype.appliquerFiltresEvenements = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            this.evenementsFiltres = this.evenements.filter(function (e) {
                var matchType = !_this.filtreType || e.type === _this.filtreType;
                var matchStatut = !_this.filtreStatutEvenement || e.statut === _this.filtreStatutEvenement;
                var matchTerm = !term || e.nom.toLowerCase().includes(term);
                return matchType && matchStatut && matchTerm;
            });
        };
        GestionEvenementsComponent_1.prototype.appliquerFiltresOrganisateurs = function () {
            var _this = this;
            var term = this.recherche.toLowerCase().trim();
            this.organisateursFiltres = this.organisateurs.filter(function (o) {
                var matchStatut = !_this.filtreStatutOrganisateur || o.statut === _this.filtreStatutOrganisateur;
                var matchTerm = !term || "".concat(o.prenom, " ").concat(o.nom).toLowerCase().includes(term) || (o.entreprise || '').toLowerCase().includes(term);
                return matchStatut && matchTerm;
            });
        };
        GestionEvenementsComponent_1.prototype.onFiltreChange = function () {
            this.appliquerFiltresEvenements();
            this.appliquerFiltresOrganisateurs();
        };
        // ─── HELPERS ────────────────────────────────────────────
        GestionEvenementsComponent_1.prototype.nomLieu = function (id) {
            var _a;
            return ((_a = this.lieux.find(function (l) { return l.id === id; })) === null || _a === void 0 ? void 0 : _a.nom) || 'Non assigné';
        };
        GestionEvenementsComponent_1.prototype.nomOrganisateur = function (id) {
            var o = this.organisateurs.find(function (x) { return x.id === id; });
            return o ? "".concat(o.prenom, " ").concat(o.nom) : 'Non assigné';
        };
        GestionEvenementsComponent_1.prototype.billetsVendus = function (e) {
            return e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue; }, 0);
        };
        GestionEvenementsComponent_1.prototype.revenuEvenement = function (e) {
            return e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue * c.prix; }, 0);
        };
        GestionEvenementsComponent_1.prototype.tauxRemplissage = function (e) {
            return e.capaciteTotale ? Math.round((this.billetsVendus(e) / e.capaciteTotale) * 100) : 0;
        };
        GestionEvenementsComponent_1.prototype.typeLabel = function (type) {
            var map = { MATCH: 'Match', CONCERT: 'Concert', CONFERENCE: 'Conférence', FESTIVAL: 'Festival', AUTRE: 'Autre' };
            return map[type];
        };
        GestionEvenementsComponent_1.prototype.statutLabel = function (statut) {
            var map = { PROGRAMME: 'Programmé', EN_COURS: 'En cours', TERMINE: 'Terminé', ANNULE: 'Annulé' };
            return map[statut];
        };
        GestionEvenementsComponent_1.prototype.statutClass = function (statut) {
            var map = { PROGRAMME: 'badge-blue', EN_COURS: 'badge-purple', TERMINE: 'badge-green', ANNULE: 'badge-red' };
            return map[statut];
        };
        // ─── DÉTAIL ÉVÉNEMENT ─────────────────────────────────────
        GestionEvenementsComponent_1.prototype.voirDetailEvenement = function (e) {
            this.evenementDetailAffiche = e;
        };
        GestionEvenementsComponent_1.prototype.fermerDetailEvenement = function () {
            this.evenementDetailAffiche = null;
        };
        GestionEvenementsComponent_1.prototype.voirDetailOrganisateur = function (o) {
            this.organisateurDetailAffiche = o;
        };
        GestionEvenementsComponent_1.prototype.fermerDetailOrganisateur = function () {
            this.organisateurDetailAffiche = null;
        };
        // ─── HISTORIQUE DES VENTES (paginé) ────────────────────────
        GestionEvenementsComponent_1.prototype.ouvrirHistorique = function (e) {
            var _this = this;
            this.historiqueTitre = "Historique des ventes \u2014 ".concat(e.nom);
            this.historiquePage = 1;
            this.evenementsService.getHistoriqueParEvenement(e.id).subscribe(function (h) {
                _this.historiqueLignes = h;
                _this.historiqueOuvert = true;
            });
        };
        GestionEvenementsComponent_1.prototype.fermerHistorique = function () {
            this.historiqueOuvert = false;
            this.historiqueLignes = [];
        };
        Object.defineProperty(GestionEvenementsComponent_1.prototype, "historiqueRevenuTotal", {
            get: function () {
                return this.historiqueLignes.filter(function (h) { return h.statut === 'VALIDE'; }).reduce(function (sum, h) { return sum + h.revenu; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GestionEvenementsComponent_1.prototype, "historiqueBilletsTotal", {
            get: function () {
                return this.historiqueLignes.filter(function (h) { return h.statut === 'VALIDE'; }).reduce(function (sum, h) { return sum + h.quantite; }, 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GestionEvenementsComponent_1.prototype, "historiqueTotalPages", {
            get: function () {
                return Math.ceil(this.historiqueLignes.length / this.historiquePageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GestionEvenementsComponent_1.prototype, "historiquePagine", {
            get: function () {
                var start = (this.historiquePage - 1) * this.historiquePageSize;
                return this.historiqueLignes.slice(start, start + this.historiquePageSize);
            },
            enumerable: false,
            configurable: true
        });
        GestionEvenementsComponent_1.prototype.changerPageHistorique = function (page) {
            if (page >= 1 && page <= this.historiqueTotalPages)
                this.historiquePage = page;
        };
        // ─── CRUD ÉVÉNEMENTS ──────────────────────────────────────
        GestionEvenementsComponent_1.prototype.ouvrirNouvelEvenement = function () {
            var dansUneSemaine = new Date(Date.now() + 7 * 86400000);
            this.evenementForm = {
                nom: '', type: 'MATCH', lieuNom: '', organisateurNom: '',
                dateDebut: dansUneSemaine.toISOString().slice(0, 16), dateFin: dansUneSemaine.toISOString().slice(0, 16),
                description: '', capaciteTotale: 1000, categoriesBillets: [], statut: 'PROGRAMME',
                pieceJointeNom: '', pieceJointeDataUrl: ''
            };
            this.showEvenementModal = true;
        };
        GestionEvenementsComponent_1.prototype.modifierEvenement = function (e) {
            this.evenementForm = {
                id: e.id, nom: e.nom, type: e.type, lieuNom: this.nomLieu(e.lieuId), organisateurNom: this.nomOrganisateur(e.organisateurId),
                dateDebut: new Date(e.dateDebut).toISOString().slice(0, 16), dateFin: new Date(e.dateFin).toISOString().slice(0, 16),
                description: e.description || '', capaciteTotale: e.capaciteTotale,
                categoriesBillets: e.categoriesBillets.map(function (c) { return (__assign({}, c)); }), statut: e.statut,
                pieceJointeNom: e.pieceJointeNom || '', pieceJointeDataUrl: e.pieceJointeDataUrl || ''
            };
            this.showEvenementModal = true;
        };
        GestionEvenementsComponent_1.prototype.fermerEvenementModal = function () {
            this.showEvenementModal = false;
            this.evenementForm = null;
        };
        GestionEvenementsComponent_1.prototype.ajouterCategorie = function () {
            if (!this.evenementForm || !this.nouvelleCategorieNom.trim())
                return;
            this.evenementForm.categoriesBillets.push({
                nom: this.nouvelleCategorieNom.trim(), prix: this.nouvelleCategoriePrix,
                quantiteDisponible: this.nouvelleCategorieQuantite, quantiteVendue: 0
            });
            this.nouvelleCategorieNom = '';
            this.nouvelleCategoriePrix = 5000;
            this.nouvelleCategorieQuantite = 100;
        };
        GestionEvenementsComponent_1.prototype.supprimerCategorie = function (index) {
            var _a;
            (_a = this.evenementForm) === null || _a === void 0 ? void 0 : _a.categoriesBillets.splice(index, 1);
        };
        // ─── PIÈCE JOINTE (photo / fichier depuis le stockage interne) ────
        GestionEvenementsComponent_1.prototype.onFichierSelectionne = function (event) {
            var _this = this;
            var _a;
            var input = event.target;
            var fichier = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!fichier || !this.evenementForm)
                return;
            if (fichier.size > 5 * 1024 * 1024) {
                this.toastService.error('Le fichier dépasse la taille maximale de 5 Mo.');
                input.value = '';
                return;
            }
            var lecteur = new FileReader();
            lecteur.onload = function () {
                if (_this.evenementForm) {
                    _this.evenementForm.pieceJointeNom = fichier.name;
                    _this.evenementForm.pieceJointeDataUrl = lecteur.result;
                }
            };
            lecteur.readAsDataURL(fichier);
        };
        GestionEvenementsComponent_1.prototype.supprimerPieceJointe = function () {
            if (!this.evenementForm)
                return;
            this.evenementForm.pieceJointeNom = '';
            this.evenementForm.pieceJointeDataUrl = '';
        };
        Object.defineProperty(GestionEvenementsComponent_1.prototype, "pieceJointeEstImage", {
            get: function () {
                var _a, _b;
                return !!((_b = (_a = this.evenementForm) === null || _a === void 0 ? void 0 : _a.pieceJointeDataUrl) === null || _b === void 0 ? void 0 : _b.startsWith('data:image/'));
            },
            enumerable: false,
            configurable: true
        });
        /** Trouve le lieu existant par nom (insensible à la casse), sinon le crée à la volée. */
        GestionEvenementsComponent_1.prototype.resoudreLieuId = function (nom) {
            var propre = nom.trim();
            var existant = this.lieux.find(function (l) { return l.nom.toLowerCase() === propre.toLowerCase(); });
            if (existant)
                return of(existant.id);
            return this.evenementsService.creerLieu({ nom: propre, ville: '', adresse: '', type: 'Autre', capaciteMax: 0, statut: 'ACTIF' }).pipe(map(function (l) { return l.id; }));
        };
        /** Trouve l'organisateur existant par nom (insensible à la casse), sinon le crée à la volée. */
        GestionEvenementsComponent_1.prototype.resoudreOrganisateurId = function (nom) {
            var propre = nom.trim();
            var existant = this.organisateurs.find(function (o) { return "".concat(o.prenom, " ").concat(o.nom).trim().toLowerCase() === propre.toLowerCase() || o.nom.toLowerCase() === propre.toLowerCase(); });
            if (existant)
                return of(existant.id);
            return this.evenementsService.creerOrganisateur({ nom: propre, prenom: '', telephone: '', adresse: '' }).pipe(map(function (o) { return o.id; }));
        };
        GestionEvenementsComponent_1.prototype.enregistrerEvenement = function () {
            var _this = this;
            var f = this.evenementForm;
            if (!f)
                return;
            if (!f.nom.trim() || !f.lieuNom.trim() || !f.organisateurNom.trim()) {
                this.toastService.error('Veuillez renseigner le nom, le lieu et l\'organisateur.');
                return;
            }
            if (f.categoriesBillets.length === 0) {
                this.toastService.error('Ajoutez au moins une catégorie de billet.');
                return;
            }
            forkJoin([this.resoudreLieuId(f.lieuNom), this.resoudreOrganisateurId(f.organisateurNom)]).subscribe(function (_a) {
                var lieuId = _a[0], organisateurId = _a[1];
                var payload = {
                    id: f.id, nom: f.nom, type: f.type,
                    lieuId: lieuId,
                    organisateurId: organisateurId,
                    dateDebut: new Date(f.dateDebut), dateFin: new Date(f.dateFin), description: f.description,
                    capaciteTotale: f.capaciteTotale, categoriesBillets: f.categoriesBillets, statut: f.statut,
                    pieceJointeNom: f.pieceJointeNom, pieceJointeDataUrl: f.pieceJointeDataUrl
                };
                var obs = f.id ? _this.evenementsService.modifierEvenement(payload) : _this.evenementsService.creerEvenement(payload);
                obs.subscribe(function (e) {
                    _this.toastService.success(f.id ? "\u00C9v\u00E9nement \u00AB ".concat(e.nom, " \u00BB mis \u00E0 jour.") : "\u00C9v\u00E9nement \u00AB ".concat(e.nom, " \u00BB cr\u00E9\u00E9."));
                    _this.fermerEvenementModal();
                    _this.charger();
                });
            });
        };
        GestionEvenementsComponent_1.prototype.supprimerEvenement = function (e) {
            var _this = this;
            if (!confirm("Supprimer l'\u00E9v\u00E9nement \u00AB ".concat(e.nom, " \u00BB ?")))
                return;
            this.evenementsService.supprimerEvenement(e.id).subscribe(function () {
                _this.toastService.success('Événement supprimé.');
                _this.charger();
            });
        };
        GestionEvenementsComponent_1.prototype.annulerEvenement = function (e) {
            var _this = this;
            if (!confirm("Annuler l'\u00E9v\u00E9nement \u00AB ".concat(e.nom, " \u00BB ?")))
                return;
            this.evenementsService.toggleStatutEvenement(e, 'ANNULE').subscribe(function () {
                _this.toastService.success('Événement annulé.');
                _this.charger();
            });
        };
        // ─── CRUD ORGANISATEURS ───────────────────────────────────
        GestionEvenementsComponent_1.prototype.ouvrirNouvelOrganisateur = function () {
            this.organisateurForm = { nom: '', prenom: '', telephone: '', adresse: '', entreprise: '', email: '' };
            this.showOrganisateurModal = true;
        };
        GestionEvenementsComponent_1.prototype.modifierOrganisateur = function (o) {
            this.organisateurForm = {
                id: o.id, nom: o.nom, prenom: o.prenom, telephone: o.telephone, adresse: o.adresse,
                entreprise: o.entreprise || '', email: o.email || ''
            };
            this.showOrganisateurModal = true;
        };
        GestionEvenementsComponent_1.prototype.fermerOrganisateurModal = function () {
            this.showOrganisateurModal = false;
            this.organisateurForm = null;
        };
        GestionEvenementsComponent_1.prototype.enregistrerOrganisateur = function () {
            var _this = this;
            var f = this.organisateurForm;
            if (!f)
                return;
            if (!f.nom.trim() || !f.prenom.trim() || !f.telephone.trim()) {
                this.toastService.error('Veuillez remplir le nom, le prénom et le téléphone.');
                return;
            }
            if (f.id) {
                var existant = this.organisateurs.find(function (o) { return o.id === f.id; });
                var maj = __assign(__assign({}, existant), { nom: f.nom, prenom: f.prenom, telephone: f.telephone, adresse: f.adresse, entreprise: f.entreprise, email: f.email });
                this.evenementsService.modifierOrganisateur(maj).subscribe(function (o) {
                    _this.toastService.success("Organisateur ".concat(o.prenom, " ").concat(o.nom, " mis \u00E0 jour."));
                    _this.fermerOrganisateurModal();
                    _this.charger();
                });
            }
            else {
                this.evenementsService.creerOrganisateur(f).subscribe(function (o) {
                    _this.toastService.success("Organisateur ".concat(o.prenom, " ").concat(o.nom, " ajout\u00E9."));
                    _this.fermerOrganisateurModal();
                    _this.charger();
                });
            }
        };
        GestionEvenementsComponent_1.prototype.toggleStatutOrganisateur = function (o, event) {
            var _this = this;
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            this.evenementsService.toggleStatutOrganisateur(o.id).subscribe(function () {
                _this.toastService.success("Organisateur ".concat(o.statut === 'ACTIF' ? 'désactivé' : 'activé', "."));
                _this.charger();
            });
        };
        GestionEvenementsComponent_1.prototype.supprimerOrganisateur = function (o) {
            var _this = this;
            if (!confirm("Supprimer la fiche de ".concat(o.prenom, " ").concat(o.nom, " ?")))
                return;
            this.evenementsService.supprimerOrganisateur(o.id).subscribe(function () {
                _this.toastService.success('Organisateur supprimé.');
                _this.charger();
            });
        };
        return GestionEvenementsComponent_1;
    }());
    __setFunctionName(_classThis, "GestionEvenementsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GestionEvenementsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GestionEvenementsComponent = _classThis;
}();
export { GestionEvenementsComponent };
//# sourceMappingURL=gestion-evenements.component.js.map