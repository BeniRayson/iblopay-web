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
var RapportsTransportComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-rapports-transport',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './rapports-transport.component.html',
            styleUrl: './rapports-transport.component.scss'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RapportsTransportComponent = _classThis = /** @class */ (function () {
        function RapportsTransportComponent_1(coursesService, transportService, exportUtils) {
            this.coursesService = coursesService;
            this.transportService = transportService;
            this.exportUtils = exportUtils;
            this.isLoading = true;
            this.courses = [];
            this.vehicules = [];
            this.chauffeurs = [];
            this.lignesBus = [];
            this.zones = [];
            this.historique = [];
            this.typeRapport = 'COURSES';
            this.dateDebut = '';
            this.dateFin = '';
            this.typeVehicule = '';
            this.statut = '';
            this.recherche = '';
            this.colonnes = [];
            this.lignes = [];
            this.currentPage = 1;
            this.pageSize = 30;
            // ─── DÉTAIL D'UNE LIGNE DE RAPPORT ─────────────────────────
            this.ligneDetailAffichee = null;
        }
        RapportsTransportComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.isLoading = true;
            this.transportService.getVehicules().subscribe(function (v) {
                _this.vehicules = v;
                _this.transportService.getChauffeurs().subscribe(function (c) {
                    _this.chauffeurs = c;
                    _this.transportService.getLignes().subscribe(function (l) {
                        _this.lignesBus = l;
                        _this.transportService.getZones().subscribe(function (z) {
                            _this.zones = z;
                            _this.transportService.getHistorique().subscribe(function (h) {
                                _this.historique = h;
                                _this.coursesService.getAll().subscribe(function (courses) {
                                    _this.courses = courses;
                                    _this.genererRapport();
                                    _this.isLoading = false;
                                });
                            });
                        });
                    });
                });
            });
        };
        RapportsTransportComponent_1.prototype.changerType = function (type) {
            this.typeRapport = type;
            this.genererRapport();
        };
        RapportsTransportComponent_1.prototype.reinitialiserFiltres = function () {
            this.dateDebut = '';
            this.dateFin = '';
            this.typeVehicule = '';
            this.statut = '';
            this.recherche = '';
            this.genererRapport();
        };
        RapportsTransportComponent_1.prototype.dansPeriode = function (date) {
            var d = new Date(date).getTime();
            if (this.dateDebut && d < new Date(this.dateDebut).getTime())
                return false;
            if (this.dateFin && d > new Date(this.dateFin).getTime() + 24 * 3600000 - 1)
                return false;
            return true;
        };
        RapportsTransportComponent_1.prototype.genererRapport = function () {
            this.currentPage = 1;
            if (this.typeRapport === 'COURSES')
                this.genererRapportCourses();
            else if (this.typeRapport === 'REVENUS_CHAUFFEURS')
                this.genererRapportChauffeurs();
            else
                this.genererRapportFlotte();
        };
        RapportsTransportComponent_1.prototype.nomVehicule = function (id) {
            var _a;
            if (!id)
                return '—';
            return ((_a = this.vehicules.find(function (v) { return v.id === id; })) === null || _a === void 0 ? void 0 : _a.matricule) || '—';
        };
        RapportsTransportComponent_1.prototype.nomChauffeur = function (id) {
            if (!id)
                return '—';
            var c = this.chauffeurs.find(function (x) { return x.id === id; });
            return c ? "".concat(c.prenom, " ").concat(c.nom) : '—';
        };
        RapportsTransportComponent_1.prototype.statutLabel = function (statut) {
            var map = {
                DEMANDE: 'Demande reçue', ACCEPTEE: 'Véhicule assigné', EN_COURS: 'En cours', TERMINEE: 'Terminée', ANNULEE: 'Annulée'
            };
            return map[statut] || statut;
        };
        RapportsTransportComponent_1.prototype.motorisationLabel = function (m) {
            var map = { ESSENCE: 'Essence', DIESEL: 'Diesel', ELECTRIQUE: 'Électrique', HYBRIDE: 'Hybride' };
            return map[m] || m;
        };
        /** Consommation totale à ce jour, formatée avec la bonne unité (L pour thermique, kWh pour électrique). */
        RapportsTransportComponent_1.prototype.consommationFormatee = function (v) {
            var total = (v.kilometrage / 100) * v.consommationMoyenne100km;
            var unite = v.motorisation === 'ELECTRIQUE' ? 'kWh' : 'L';
            return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(total) + ' ' + unite;
        };
        RapportsTransportComponent_1.prototype.genererRapportCourses = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'reference', label: 'Référence' },
                { cle: 'type', label: 'Type' },
                { cle: 'client', label: 'Client' },
                { cle: 'trajet', label: 'Trajet' },
                { cle: 'vehicule', label: 'Véhicule' },
                { cle: 'chauffeur', label: 'Chauffeur' },
                { cle: 'date', label: 'Date de demande' },
                { cle: 'statut', label: 'Statut' },
                { cle: 'prix', label: 'Montant payé (BIF)' }
            ];
            var term = this.recherche.toLowerCase().trim();
            // Courses en cours/récentes (données live)
            var lignesLive = this.courses.map(function (c) { return ({
                reference: c.numeroReference,
                type: c.type === 'BUS' ? 'Bus' : 'Taxi',
                client: c.clientNom,
                trajet: "".concat(c.depart, " \u2192 ").concat(c.destination),
                vehicule: _this.nomVehicule(c.vehiculeId),
                chauffeur: _this.nomChauffeur(c.chauffeurId),
                date: new Date(c.dateDemande).toLocaleString('fr-FR'),
                statut: _this.statutLabel(c.statut),
                prix: c.statut === 'TERMINEE' ? c.prix : 0,
                _date: c.dateDemande.getTime()
            }); });
            // Historique complet des trajets passés (bus & taxi)
            var lignesHistorique = this.historique.map(function (h) {
                var _a, _b;
                var nomTrajet = h.ligneId
                    ? (((_a = _this.lignesBus.find(function (l) { return l.id === h.ligneId; })) === null || _a === void 0 ? void 0 : _a.nom) || 'Trajet bus')
                    : (((_b = _this.zones.find(function (z) { return z.id === h.zoneId; })) === null || _b === void 0 ? void 0 : _b.nom) || 'Zone taxi');
                return {
                    reference: 'HIST-' + h.id,
                    type: h.type === 'BUS' ? 'Bus' : 'Taxi',
                    client: h.type === 'BUS' ? "".concat(h.passagers, " passager(s)") : 'Client',
                    trajet: nomTrajet,
                    vehicule: _this.nomVehicule(h.vehiculeId),
                    chauffeur: _this.nomChauffeur(h.chauffeurId),
                    date: new Date(h.date).toLocaleString('fr-FR'),
                    statut: h.statut === 'TERMINE' ? 'Terminée' : 'Annulée',
                    prix: h.statut === 'TERMINE' ? h.revenu : 0,
                    _date: h.date.getTime()
                };
            });
            var toutesLesLignes = __spreadArray(__spreadArray([], lignesLive, true), lignesHistorique, true);
            this.lignes = toutesLesLignes
                .filter(function (l) {
                var matchDate = _this.dansPeriode(new Date(l['_date']));
                var matchType = !_this.typeVehicule || l['type'] === (_this.typeVehicule === 'BUS' ? 'Bus' : 'Taxi');
                var matchStatut = !_this.statut || l['statut'] === _this.statutLabel(_this.statut);
                var matchTerm = !term ||
                    String(l['reference']).toLowerCase().includes(term) ||
                    String(l['client']).toLowerCase().includes(term) ||
                    String(l['trajet']).toLowerCase().includes(term);
                return matchDate && matchType && matchStatut && matchTerm;
            })
                .sort(function (a, b) { return b['_date'] - a['_date']; })
                .map(function (_a) {
                var _date = _a._date, reste = __rest(_a, ["_date"]);
                return reste;
            });
        };
        RapportsTransportComponent_1.prototype.genererRapportChauffeurs = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'nom', label: 'Chauffeur' },
                { cle: 'vehicule', label: 'Véhicule' },
                { cle: 'nombreCourses', label: 'Nb trajets' },
                { cle: 'revenuTotal', label: 'Revenu total (BIF)' },
                { cle: 'note', label: 'Note' },
                { cle: 'statut', label: 'Statut' }
            ];
            var term = this.recherche.toLowerCase().trim();
            this.lignes = this.chauffeurs
                .filter(function (c) { return !term || "".concat(c.prenom, " ").concat(c.nom).toLowerCase().includes(term); })
                .sort(function (a, b) { return (b.revenuTotal || 0) - (a.revenuTotal || 0); })
                .map(function (c) { return ({
                nom: "".concat(c.prenom, " ").concat(c.nom),
                vehicule: _this.nomVehicule(c.vehiculeId),
                nombreCourses: c.nombreCourses || 0,
                revenuTotal: c.revenuTotal || 0,
                note: c.note || 0,
                statut: c.statut === 'ACTIF' ? 'Actif' : 'Inactif'
            }); });
        };
        RapportsTransportComponent_1.prototype.genererRapportFlotte = function () {
            var _this = this;
            this.colonnes = [
                { cle: 'matricule', label: 'Matricule' },
                { cle: 'type', label: 'Type' },
                { cle: 'modele', label: 'Modèle' },
                { cle: 'chauffeur', label: 'Chauffeur' },
                { cle: 'kilometrage', label: 'Kilométrage parcouru' },
                { cle: 'motorisation', label: 'Motorisation' },
                { cle: 'consommation', label: 'Consommation totale' },
                { cle: 'statut', label: 'Statut' }
            ];
            var term = this.recherche.toLowerCase().trim();
            this.lignes = this.vehicules
                .filter(function (v) {
                var matchType = !_this.typeVehicule || v.type === _this.typeVehicule;
                var matchTerm = !term || v.matricule.toLowerCase().includes(term) || v.marqueModele.toLowerCase().includes(term);
                return matchType && matchTerm;
            })
                .map(function (v) { return ({
                matricule: v.matricule,
                type: v.type === 'BUS' ? 'Bus' : 'Taxi',
                modele: v.marqueModele,
                chauffeur: _this.nomChauffeur(v.chauffeurId),
                kilometrage: v.kilometrage,
                motorisation: _this.motorisationLabel(v.motorisation),
                consommation: _this.consommationFormatee(v),
                statut: v.statut
            }); });
        };
        Object.defineProperty(RapportsTransportComponent_1.prototype, "totalLignes", {
            get: function () {
                return this.lignes.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsTransportComponent_1.prototype, "montantTotal", {
            get: function () {
                if (this.typeRapport === 'COURSES') {
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['prix']) || 0); }, 0);
                }
                if (this.typeRapport === 'REVENUS_CHAUFFEURS') {
                    return this.lignes.reduce(function (sum, l) { return sum + (Number(l['revenuTotal']) || 0); }, 0);
                }
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsTransportComponent_1.prototype, "totalPages", {
            get: function () {
                return Math.ceil(this.lignes.length / this.pageSize) || 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RapportsTransportComponent_1.prototype, "lignesPaginees", {
            get: function () {
                var start = (this.currentPage - 1) * this.pageSize;
                return this.lignes.slice(start, start + this.pageSize);
            },
            enumerable: false,
            configurable: true
        });
        RapportsTransportComponent_1.prototype.changePage = function (page) {
            if (page >= 1 && page <= this.totalPages)
                this.currentPage = page;
        };
        // ─── DÉTAIL D'UNE LIGNE (clic) ──────────────────────────────
        RapportsTransportComponent_1.prototype.ouvrirDetailLigne = function (ligne) {
            this.ligneDetailAffichee = ligne;
        };
        RapportsTransportComponent_1.prototype.fermerDetailLigne = function () {
            this.ligneDetailAffichee = null;
        };
        RapportsTransportComponent_1.prototype.exporterLigneExcel = function () {
            if (!this.ligneDetailAffichee)
                return;
            this.exportUtils.exporterExcel(this.colonnes, [this.ligneDetailAffichee], "detail_".concat(this.typeRapport.toLowerCase()), 'Détail');
        };
        RapportsTransportComponent_1.prototype.imprimerLigne = function () {
            if (!this.ligneDetailAffichee)
                return;
            var titres = {
                COURSES: 'Détail de la course',
                REVENUS_CHAUFFEURS: 'Détail du chauffeur',
                FLOTTE: 'Détail du véhicule'
            };
            this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Transport', [], this.colonnes, [this.ligneDetailAffichee]);
        };
        RapportsTransportComponent_1.prototype.exporterExcel = function () {
            if (this.lignes.length === 0)
                return;
            this.exportUtils.exporterExcel(this.colonnes, this.lignes, "rapport_transport_".concat(this.typeRapport.toLowerCase()), this.typeRapport);
        };
        RapportsTransportComponent_1.prototype.imprimer = function () {
            var titres = {
                COURSES: 'Rapport des courses (bus & taxis)',
                REVENUS_CHAUFFEURS: 'Rapport des revenus par chauffeur',
                FLOTTE: 'Rapport de la flotte (kilométrage & consommation)'
            };
            var filtres = [];
            if (this.dateDebut)
                filtres.push("Du ".concat(new Date(this.dateDebut).toLocaleDateString('fr-FR')));
            if (this.dateFin)
                filtres.push("au ".concat(new Date(this.dateFin).toLocaleDateString('fr-FR')));
            if (this.typeVehicule)
                filtres.push("Type : ".concat(this.typeVehicule === 'BUS' ? 'Bus' : 'Taxi'));
            if (this.statut)
                filtres.push("Statut : ".concat(this.statutLabel(this.statut)));
            if (this.recherche)
                filtres.push("Recherche : \"".concat(this.recherche, "\""));
            this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Transport', filtres, this.colonnes, this.lignes);
        };
        return RapportsTransportComponent_1;
    }());
    __setFunctionName(_classThis, "RapportsTransportComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RapportsTransportComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RapportsTransportComponent = _classThis;
}();
export { RapportsTransportComponent };
//# sourceMappingURL=rapports-transport.component.js.map