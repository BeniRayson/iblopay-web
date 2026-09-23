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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
var RapportsEvenementsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-rapports-evenements',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './rapports-evenements.component.html',
            styleUrl: './rapports-evenements.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RapportsEvenementsComponent = _classThis = /** @class */ (function () {
        function RapportsEvenementsComponent_1(billetsService, evenementsService, exportUtils) {
            this.billetsService = billetsService;
            this.evenementsService = evenementsService;
            this.exportUtils = exportUtils;
            this.isLoading = true;
            this.billets = [];
            this.evenements = [];
            this.organisateurs = [];
            this.lieux = [];
            this.historique = [];
            this.typeRapport = 'BILLETS';
            this.dateDebut = '';
            this.dateFin = '';
            this.typeEvenement = '';
            this.statut = '';
            this.recherche = '';
            this.colonnes = [];
            this.lignes = [];
            this.currentPage = 1;
            this.pageSize = 30;
            this.ligneDetailAffichee = null;
        }
        RapportsEvenementsComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.isLoading = true;
            this.evenementsService.getEvenements().subscribe(function (e) {
                _this.evenements = e;
                _this.evenementsService.getOrganisateurs().subscribe(function (o) {
                    _this.organisateurs = o;
                    _this.evenementsService.getLieux().subscribe(function (l) {
                        _this.lieux = l;
                        _this.evenementsService.getHistorique().subscribe(function (h) {
                            _this.historique = h;
                            _this.billetsService.getAll().subscribe(function (billets) {
                                _this.billets = billets;
                                _this.genererRapport();
                                _this.isLoading = false;
                            });
                        });
                    });
                });
            });
        };
        RapportsEvenementsComponent_1.prototype.changerType = function (type) {
            this.typeRapport = type;
            this.genererRapport();
        };
        RapportsEvenementsComponent_1.prototype.reinitialiserFiltres = function () {
            this.dateDebut = '';
            this.dateFin = '';
            this.typeEvenement = '';
            this.statut = '';
            this.recherche = '';
            this.genererRapport();
        };
        RapportsEvenementsComponent_1.prototype.dansPeriode = function (date) {
            var d = new Date(date).getTime();
            if (this.dateDebut && d < new Date(this.dateDebut).getTime())
                return false;
            if (this.dateFin && d > new Date(this.dateFin).getTime() + 24 * 3600000 - 1)
                return false;
            return true;
        };
        RapportsEvenementsComponent_1.prototype.genererRapport = function () {
            this.currentPage = 1;
            if (this.typeRapport === 'BILLETS')
                this.genererRapportBillets();
            else if (this.typeRapport === 'REVENUS_ORGANISATEURS')
                this.genererRapportOrganisateurs();
            else
                this.genererRapportEvenements();
        };
        RapportsEvenementsComponent_1.prototype.nomEvenement = function (id) {
            var _a;
            return ((_a = this.evenements.find(function (e) { return e.id === id; })) === null || _a === void 0 ? void 0 : _a.nom) || '—';
        };
        RapportsEvenementsComponent_1.prototype.nomLieu = function (id) {
            var _a;
            return ((_a = this.lieux.find(function (l) { return l.id === id; })) === null || _a === void 0 ? void 0 : _a.nom) || '—';
        };
        RapportsEvenementsComponent_1.prototype.nomOrganisateur = function (id) {
            var o = this.organisateurs.find(function (x) { return x.id === id; });
            return o ? "".concat(o.prenom, " ").concat(o.nom) : '—';
        };
        RapportsEvenementsComponent_1.prototype.statutLabel = function (statut) {
            var map = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
            return map[statut] || statut;
        };
        RapportsEvenementsComponent_1.prototype.typeLabel = function (type) {
            var map = { MATCH: 'Match', CONCERT: 'Concert', CONFERENCE: 'Conférence', FESTIVAL: 'Festival', AUTRE: 'Autre' };
            return map[type];
        };
        RapportsEvenementsComponent_1.prototype.genererRapportBillets = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'reference', label: 'Référence' },
                { cle: 'evenement', label: 'Événement' },
                { cle: 'categorie', label: 'Catégorie' },
                { cle: 'client', label: 'Client' },
                { cle: 'date', label: 'Date d\'achat' },
                { cle: 'statut', label: 'Statut' },
                { cle: 'prix', label: 'Montant payé (BIF)' }
            ];
            var term = this.recherche.toLowerCase().trim();
            var lignesLive = this.billets.map(function (b) { return ({
                reference: b.numeroReference, evenement: _this.nomEvenement(b.evenementId), categorie: b.categorieNom,
                client: b.clientNom, date: new Date(b.dateAchat).toLocaleString('fr-FR'), statut: _this.statutLabel(b.statut),
                prix: (b.statut === 'PAYE' || b.statut === 'UTILISE') ? b.prix : 0, _date: b.dateAchat.getTime()
            }); });
            var lignesHistorique = this.historique.map(function (h) { return ({
                reference: 'HIST-' + h.id, evenement: _this.nomEvenement(h.evenementId), categorie: h.categorieNom,
                client: "".concat(h.quantite, " billet(s)"), date: new Date(h.date).toLocaleString('fr-FR'),
                statut: h.statut === 'VALIDE' ? 'Payé' : 'Annulé', prix: h.statut === 'VALIDE' ? h.revenu : 0, _date: h.date.getTime()
            }); });
            this.lignes = __spreadArray(__spreadArray([], lignesLive, true), lignesHistorique, true).filter(function (l) {
                var matchDate = _this.dansPeriode(new Date(l['_date']));
                var matchStatut = !_this.statut || l['statut'] === _this.statutLabel(_this.statut);
                var matchTerm = !term ||
                    String(l['reference']).toLowerCase().includes(term) ||
                    String(l['client']).toLowerCase().includes(term) ||
                    String(l['evenement']).toLowerCase().includes(term);
                return matchDate && matchStatut && matchTerm;
            })
                .sort(function (a, b) { return b['_date'] - a['_date']; })
                .map(function (_a) {
                var _date = _a._date, reste = __rest(_a, ["_date"]);
                return reste;
            });
        };
        RapportsEvenementsComponent_1.prototype.genererRapportOrganisateurs = function () {
            this.colonnes = [
                { cle: 'nom', label: 'Organisateur' },
                { cle: 'entreprise', label: 'Entreprise' },
                { cle: 'nombreEvenements', label: 'Nb événements' },
                { cle: 'revenuTotal', label: 'Revenu total (BIF)' },
                { cle: 'statut', label: 'Statut' }
            ];
            var term = this.recherche.toLowerCase().trim();
            this.lignes = this.organisateurs
                .filter(function (o) { return !term || "".concat(o.prenom, " ").concat(o.nom).toLowerCase().includes(term) || (o.entreprise || '').toLowerCase().includes(term); })
                .sort(function (a, b) { return (b.revenuTotal || 0) - (a.revenuTotal || 0); })
                .map(function (o) { return ({
                nom: "".concat(o.prenom, " ").concat(o.nom), entreprise: o.entreprise || '—', nombreEvenements: o.nombreEvenements || 0,
                revenuTotal: o.revenuTotal || 0, statut: o.statut === 'ACTIF' ? 'Actif' : 'Inactif'
            }); });
        };
        RapportsEvenementsComponent_1.prototype.genererRapportEvenements = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'nom', label: 'Événement' },
                { cle: 'type', label: 'Type' },
                { cle: 'lieu', label: 'Lieu' },
                { cle: 'organisateur', label: 'Organisateur' },
                { cle: 'date', label: 'Date' },
                { cle: 'billetsVendus', label: 'Billets vendus' },
                { cle: 'remplissage', label: 'Taux de remplissage' },
                { cle: 'revenu', label: 'Revenu (BIF)' },
                { cle: 'statut', label: 'Statut' }
            ];
            var term = this.recherche.toLowerCase().trim();
            this.lignes = this.evenements
                .filter(function (e) {
                var matchType = !_this.typeEvenement || e.type === _this.typeEvenement;
                var matchTerm = !term || e.nom.toLowerCase().includes(term);
                return matchType && matchTerm;
            })
                .map(function (e) {
                var billetsVendus = e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue; }, 0);
                var revenu = e.categoriesBillets.reduce(function (s, c) { return s + c.quantiteVendue * c.prix; }, 0);
                return {
                    nom: e.nom, type: _this.typeLabel(e.type), lieu: _this.nomLieu(e.lieuId), organisateur: _this.nomOrganisateur(e.organisateurId),
                    date: new Date(e.dateDebut).toLocaleDateString('fr-FR'),
                    billetsVendus: billetsVendus,
                    remplissage: (e.capaciteTotale ? Math.round((billetsVendus / e.capaciteTotale) * 100) : 0) + '%',
                    revenu: revenu,
                    statut: e.statut
                };
            });
        };
        Object.defineProperty(RapportsEvenementsComponent_1.prototype, "totalLignes", {
            get: function () {
                return this.lignes.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsEvenementsComponent_1.prototype, "montantTotal", {
            get: function () {
                if (this.typeRapport === 'BILLETS')
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['prix']) || 0); }, 0);
                if (this.typeRapport === 'REVENUS_ORGANISATEURS')
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['revenuTotal']) || 0); }, 0);
                if (this.typeRapport === 'EVENEMENTS')
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['revenu']) || 0); }, 0);
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsEvenementsComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.lignes.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsEvenementsComponent_1.prototype, "lignesPaginees", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.lignes.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        RapportsEvenementsComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages)
                this.currentPage = page;
        };
        RapportsEvenementsComponent_1.prototype.ouvrirDetailLigne = function (ligne) {
            this.ligneDetailAffichee = ligne;
        };
        RapportsEvenementsComponent_1.prototype.fermerDetailLigne = function () {
            this.ligneDetailAffichee = null;
        };
        RapportsEvenementsComponent_1.prototype.exporterLigneExcel = function () {
            if (!this.ligneDetailAffichee)
                return;
            this.exportUtils.exporterExcel(this.colonnes, [this.ligneDetailAffichee], "detail_".concat(this.typeRapport.toLowerCase()), 'Détail');
        };
        RapportsEvenementsComponent_1.prototype.imprimerLigne = function () {
            if (!this.ligneDetailAffichee)
                return;
            var titres = {
                BILLETS: 'Détail du billet', REVENUS_ORGANISATEURS: 'Détail de l\'organisateur', EVENEMENTS: 'Détail de l\'événement'
            };
            this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Événements', [], this.colonnes, [this.ligneDetailAffichee]);
        };
        RapportsEvenementsComponent_1.prototype.exporterExcel = function () {
            if (this.lignes.length === 0)
                return;
            this.exportUtils.exporterExcel(this.colonnes, this.lignes, "rapport_evenements_".concat(this.typeRapport.toLowerCase()), this.typeRapport);
        };
        RapportsEvenementsComponent_1.prototype.imprimer = function () {
            var titres = {
                BILLETS: 'Rapport des billets vendus', REVENUS_ORGANISATEURS: 'Rapport des revenus par organisateur', EVENEMENTS: 'Rapport des événements'
            };
            var filtres = [];
            if (this.dateDebut)
                filtres.push("Du ".concat(new Date(this.dateDebut).toLocaleDateString('fr-FR')));
            if (this.dateFin)
                filtres.push("au ".concat(new Date(this.dateFin).toLocaleDateString('fr-FR')));
            if (this.typeEvenement)
                filtres.push("Type : ".concat(this.typeLabel(this.typeEvenement)));
            if (this.statut)
                filtres.push("Statut : ".concat(this.statutLabel(this.statut)));
            if (this.recherche)
                filtres.push("Recherche : \"".concat(this.recherche, "\""));
            this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Événements', filtres, this.colonnes, this.lignes);
        };
        return RapportsEvenementsComponent_1;
    }());
    __setFunctionName(_classThis, "RapportsEvenementsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RapportsEvenementsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RapportsEvenementsComponent = _classThis;
}();
export { RapportsEvenementsComponent };
//# sourceMappingURL=rapports-evenements.component.js.map