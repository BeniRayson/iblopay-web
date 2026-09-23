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
var ServicesSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-services-settings',
            standalone: true,
            imports: [CommonModule, FormsModule, RouterModule],
            templateUrl: './services-settings.component.html',
            styleUrls: ['./services-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ServicesSettingsComponent = _classThis = /** @class */ (function () {
        function ServicesSettingsComponent_1() {
            this.title = 'Gestion des Services RNF';
            this.icon = '🏛';
            this.pageSize = 100;
            this.STORAGE_KEY = 'services_data_2025';
            this.toastSeq = 0;
            this.services = [];
            this.revenues = [];
            this.clients = [];
            this.toasts = [];
            this.selectedService = null;
            this.showModal = false;
            this.showDetailModal = false;
            this.showClientModal = false;
            this.showDesactivatePinModal = false;
            this.modalType = '';
            this.modalTitle = '';
            this.formData = {};
            this.showPinModal = false;
            this.pinCode = '';
            this.desactivatePinCode = '';
            this.selectedClient = null;
            this.serviceToDesactivate = null;
            this.activeTab = 'dashboard';
            this.currentPages = {
                services: 1,
                revenues: 1,
                clients: 1
            };
            this.tabs = [
                { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
                { key: 'services', label: 'Services RNF', icon: '📋' },
                { key: 'revenues', label: 'Revenus', icon: '💰' },
                { key: 'categories', label: 'Catégories', icon: '📂' }
            ];
            this.categories = [];
            this.clientNames = [
                'Jean Bosco NIZIGIYIMANA', 'Marie Claire NDIKUMANA', 'Pierre HAKIZIMANA',
                'Françoise NIBITANGA', 'Emmanuel NTAKIRUTIMANA', 'David NDAYISABA',
                'Esther NIYONKURU', 'Fabrice HAKIZIMANA', 'Gracieuse NIBITANGA',
                'Hervé NDAYIZEYE', 'Isabelle NDIKUMANA', 'Jean-Pierre HAKIZIMANA',
                'Karine NSABIMANA', 'Léonard NTAKIRUTIMANA', 'Martine NIZIGIYIMANA',
                'Alain NDAYISABA', 'Bernadette NIYONKURU', 'Charles NTAKIRUTIMANA',
                'Diane NIZIGIYIMANA', 'Éric NDIKUMANA', 'Florence HAKIZIMANA',
                'Gérard NIBITANGA', 'Hélène NDAYIZEYE', 'Irène NDAYISABA',
                'Joël NIYONKURU', 'Laurence NTAKIRUTIMANA', 'Michel NIZIGIYIMANA',
                'Nathalie NDIKUMANA', 'Olivier HAKIZIMANA', 'Pascale NIBITANGA',
                'Quentin NTAKIRUTIMANA', 'Rachel NIZIGIYIMANA', 'Stéphane NDIKUMANA',
                'Ursula NIBITANGA', 'Victor NDAYISABA', 'Wendy NIYONKURU',
                'Xénia NTAKIRUTIMANA', 'Yves NIZIGIYIMANA', 'Zoé NDIKUMANA'
            ];
            this.loadData();
            this.initializeData();
        }
        ServicesSettingsComponent_1.prototype.ngOnInit = function () {
            this.updateCounts();
        };
        // ========== MÉTHODES POUR LA DATE ==========
        ServicesSettingsComponent_1.prototype.getCurrentDate = function () {
            return new Date().toLocaleDateString('fr-FR');
        };
        ServicesSettingsComponent_1.prototype.getRandomDemandeNumber = function () {
            return 'DEM-' + String(100000 + Math.floor(Math.random() * 900000)).padStart(6, '0');
        };
        // ========== MÉTHODES PIN ==========
        ServicesSettingsComponent_1.prototype.addPinDigit = function (digit) {
            if (this.pinCode.length < 4) {
                this.pinCode += digit.toString();
            }
        };
        ServicesSettingsComponent_1.prototype.clearPin = function () {
            this.pinCode = '';
        };
        ServicesSettingsComponent_1.prototype.addDesactivatePinDigit = function (digit) {
            if (this.desactivatePinCode.length < 4) {
                this.desactivatePinCode += digit.toString();
            }
        };
        ServicesSettingsComponent_1.prototype.clearDesactivatePin = function () {
            this.desactivatePinCode = '';
        };
        ServicesSettingsComponent_1.prototype.confirmPin = function () {
            if (this.pinCode === '1234') {
                this.showPinModal = false;
                this.toast('Code PIN validé avec succès', 'success');
            }
            else {
                this.toast('Code PIN incorrect', 'danger');
                this.pinCode = '';
            }
        };
        ServicesSettingsComponent_1.prototype.closePinModal = function () {
            this.showPinModal = false;
            this.pinCode = '';
        };
        ServicesSettingsComponent_1.prototype.confirmDesactivatePin = function () {
            if (this.desactivatePinCode === '1234') {
                if (this.serviceToDesactivate) {
                    this.serviceToDesactivate.status = 'inactif';
                    this.saveData();
                    this.toast("Service ".concat(this.serviceToDesactivate.name, " d\u00E9sactiv\u00E9 avec succ\u00E8s"), 'warning');
                    this.showDesactivatePinModal = false;
                    this.serviceToDesactivate = null;
                    this.desactivatePinCode = '';
                }
            }
            else {
                this.toast('Code PIN incorrect. Veuillez réessayer.', 'danger');
                this.desactivatePinCode = '';
            }
        };
        ServicesSettingsComponent_1.prototype.closeDesactivatePinModal = function () {
            this.showDesactivatePinModal = false;
            this.serviceToDesactivate = null;
            this.desactivatePinCode = '';
        };
        // ========== INITIALISATION ==========
        ServicesSettingsComponent_1.prototype.initializeData = function () {
            var _this = this;
            if (this.services.length > 0 && this.categories.length > 0) {
                this.services.forEach(function (service) {
                    if (!service.requiredDocuments || service.requiredDocuments.length === 0) {
                        service.requiredDocuments = ['Demande écrite', 'Pièce d\'identité', 'Photo d\'identité', 'Reçu de paiement'];
                    }
                    if (!service.procedure || service.procedure.length === 0) {
                        service.procedure = [
                            '1. Déposer une demande écrite auprès du service compétent',
                            '2. Fournir les pièces justificatives requises',
                            '3. Payer les frais de service',
                            '4. Attendre le traitement de la demande (délai: 5 jours ouvrables)',
                            '5. Récupérer le document ou l\'autorisation'
                        ];
                    }
                });
                this.ensureClientsForAllServices();
                return;
            }
            // Définir les catégories
            this.categories = [
                {
                    id: 'ARCT',
                    name: 'ARCT - Communications',
                    icon: '📡',
                    description: 'Redevances et taxes des télécommunications',
                    subCategories: [
                        { name: 'Autorisation réseaux radioélectriques fixes et mobiles', fees: 25000, account: '7234100' },
                        { name: 'Étude du dossier', fees: 15000, account: '7234200' },
                        { name: 'Agrément des équipements', fees: 30000, account: '7234300' },
                        { name: 'Exploitation des fréquences', fees: 45000, account: '7234400' },
                        { name: 'Exploitation des codes et numéros', fees: 35000, account: '7234500' },
                        { name: 'Licence d\'exploitation des réseaux', fees: 100000, account: '7234600' },
                        { name: 'Redevances Annuelles de 2% du C.A', fees: 0, account: '7234700', type: 'pourcentage' },
                        { name: 'Autorisation service à valeur ajoutée', fees: 50000, account: '7234800' },
                        { name: 'Certificat d\'homologation', fees: 40000, account: '7234900' },
                        { name: 'Redevance trafic national', fees: 0, account: '7142202', type: 'pourcentage' },
                        { name: 'Taxe messagerie mobile', fees: 0, account: '7142501', type: 'pourcentage' },
                        { name: 'Taxe services financiers mobiles', fees: 0, account: '7142502', type: 'pourcentage' },
                        { name: 'Taxe services de données mobiles', fees: 0, account: '7142503', type: 'pourcentage' },
                        { name: 'Taxe OTT et communication IP', fees: 0, account: '7142504', type: 'pourcentage' }
                    ]
                },
                {
                    id: 'OBM',
                    name: 'OBM - Mines',
                    icon: '⛏️',
                    description: 'Recettes minières et carrières',
                    subCategories: [
                        { name: 'Revenus et redevances des carrières', fees: 50000, account: '7213200' },
                        { name: 'Or', fees: 75000, account: '7214000' },
                        { name: 'Tourbe', fees: 40000, account: '7214100' }
                    ]
                },
                {
                    id: 'OBPE',
                    name: 'OBPE - Environnement',
                    icon: '🌿',
                    description: 'Recettes environnementales et touristiques',
                    subCategories: [
                        { name: 'Recettes touristiques', fees: 20000, account: '7233' },
                        { name: 'Attestation de Conformités environnementales', fees: 30000, account: '7233' },
                        { name: 'Autorisations de transport produits carriers', fees: 25000, account: '7232900' },
                        { name: 'Autorisations de transport produits forestiers', fees: 25000, account: '7232900' },
                        { name: 'Permis de coupe', fees: 20000, account: '7233' }
                    ]
                },
                {
                    id: 'OBUHA',
                    name: 'OBUHA & Universités',
                    icon: '🏫',
                    description: 'Taxes et locations immobilières',
                    subCategories: [
                        { name: 'Taxe de bâtisse', fees: 18000, account: '7232100' },
                        { name: 'Location d\'immeubles', fees: 35000, account: '7221000' },
                        { name: 'Amendes constructions non autorisées', fees: 25000, account: '7243' },
                        { name: 'Location terrains', fees: 30000, account: '7213100' }
                    ]
                },
                {
                    id: 'ARCA',
                    name: 'ARCA - Assurances',
                    icon: '🛡️',
                    description: 'Contributions des sociétés d\'assurances',
                    subCategories: [
                        { name: 'Contributions annuelles des assurances', fees: 80000, account: '7233830' },
                        { name: 'Amendes', fees: 25000, account: '7243' }
                    ]
                },
                {
                    id: 'EDUCATION',
                    name: 'Ministère Éducation',
                    icon: '📚',
                    description: 'Droits sur services éducatifs',
                    subCategories: [
                        { name: 'Attestation d\'équivalence certificat', fees: 15000, account: '7233' },
                        { name: 'Attestation de dépôt de mémoire', fees: 10000, account: '7233' },
                        { name: 'Attestation boursier', fees: 8000, account: '7233' },
                        { name: 'Attestation réussite examen d\'État', fees: 12000, account: '7233' },
                        { name: 'Certificat diplôme secondaire', fees: 20000, account: '7233' },
                        { name: 'Certificat diplôme supérieur', fees: 25000, account: '7233' },
                        { name: 'Bulletin enseignement supérieur', fees: 10000, account: '7233' },
                        { name: 'Attestation réussite Master/DEA', fees: 30000, account: '7233' }
                    ]
                },
                {
                    id: 'INTERIEUR',
                    name: 'Ministère Intérieur',
                    icon: '🏛️',
                    description: 'Ventes d\'imprimés et documentation',
                    subCategories: [
                        { name: 'Ventes d\'imprimés et documentation', fees: 15000, account: '7223000' },
                        { name: 'Vente des drapeaux', fees: 25000, account: '7223000' },
                        { name: 'Vente des lois et ordonnances', fees: 20000, account: '7223000' }
                    ]
                },
                {
                    id: 'JUSTICE',
                    name: 'Ministère Justice',
                    icon: '⚖️',
                    description: 'Droits de contentieux et amendes',
                    subCategories: [
                        { name: 'Droits de contentieux', fees: 45000, account: '7233200' },
                        { name: 'Amendes judiciaires', fees: 30000, account: '7243000' }
                    ]
                },
                {
                    id: 'RELATIONS_EXTERIEURES',
                    name: 'Relations Extérieures',
                    icon: '🌍',
                    description: 'Droits sur services consulaires',
                    subCategories: [
                        { name: 'Frais obtention documents', fees: 20000, account: '7233' },
                        { name: 'Frais agrément sociétés', fees: 50000, account: '7233' },
                        { name: 'Visas et passeports ambassades', fees: 35000, account: '7231200' }
                    ]
                },
                {
                    id: 'DOCUMENTS_VOYAGE',
                    name: 'Documents de Voyage',
                    icon: '🛂',
                    description: 'Passeports et visas',
                    subCategories: [
                        { name: 'Passeports & titres de voyages', fees: 40000, account: '7231100' },
                        { name: 'Visas & passeports ambassades', fees: 35000, account: '7231200' },
                        { name: 'Visas & immatriculations étrangers', fees: 30000, account: '7231300' }
                    ]
                },
                {
                    id: 'LICENCES',
                    name: 'Licences Exploitation',
                    icon: '🍷',
                    description: 'Licences débits de boissons, restaurants et hôtels',
                    subCategories: [
                        { name: 'Licence débit de boissons', fees: 50000, account: '7232600' },
                        { name: 'Licence exploitation restaurants', fees: 45000, account: '7232610' },
                        { name: 'Licence exploitation hôtels', fees: 60000, account: '7232620' },
                        { name: 'Licence exploitation boîtes de nuit', fees: 75000, account: '7232620' }
                    ]
                },
                {
                    id: 'TRANSPORT',
                    name: 'Transport & Garages',
                    icon: '🚗',
                    description: 'Agréments transport et garages',
                    subCategories: [
                        { name: 'Autorisation de convoi', fees: 30000, account: '7232510' },
                        { name: 'Agrément des garages', fees: 40000, account: '7232710' },
                        { name: 'Carte agrément agences transport', fees: 50000, account: '7233870' },
                        { name: 'Autorisation de transport', fees: 40000, account: '7232500' },
                        { name: 'Permis de conduire', fees: 35000, account: '7232' },
                        { name: 'Contrôle technique des véhicules', fees: 20000, account: '7232400' }
                    ]
                },
                {
                    id: 'AGRICULTURE',
                    name: 'Agriculture & Élevage',
                    icon: '🌾',
                    description: 'Ventes semences et services vétérinaires',
                    subCategories: [
                        { name: 'Ventes des semences', fees: 15000, account: '7227000' },
                        { name: 'Vente des graines forestières', fees: 12000, account: '7227000' },
                        { name: 'Vente des bovins', fees: 25000, account: '7227002' },
                        { name: 'Vente du maïs ANAGESSA', fees: 18000, account: '7227001' },
                        { name: 'Prestation services vétérinaires', fees: 20000, account: '7226000' }
                    ]
                },
                {
                    id: 'SANTE',
                    name: 'Santé',
                    icon: '🏥',
                    description: 'Prestations de santé et pharmacies',
                    subCategories: [
                        { name: 'Prestation services de santé', fees: 30000, account: '7225000' },
                        { name: 'Revenu CAM', fees: 15000, account: '7225001' },
                        { name: 'Ouverture pharmacies', fees: 50000, account: '7232700' },
                        { name: 'Renouvellement pharmacies', fees: 30000, account: '7232700' },
                        { name: 'Ouverture infirmeries', fees: 35000, account: '7232700' }
                    ]
                },
                {
                    id: 'DIVIDENDES',
                    name: 'Dividendes d\'État',
                    icon: '📈',
                    description: 'Dividendes entreprises financières et non financières',
                    subCategories: [
                        { name: 'Dividendes entreprises financières', fees: 0, account: '7211200', type: 'pourcentage' },
                        { name: 'Dividendes entreprises non financières', fees: 0, account: '7211300', type: 'pourcentage' }
                    ]
                },
                {
                    id: 'AMENDES',
                    name: 'Amendes Routières & Commerciales',
                    icon: '🚨',
                    description: 'Infractions et pénalités',
                    subCategories: [
                        { name: 'Infraction réglementation routière', fees: 20000, account: '7241000' },
                        { name: 'Infraction réglementation commerciale', fees: 25000, account: '7242000' },
                        { name: 'Autres amendes et pénalités', fees: 30000, account: '7248000' },
                        { name: 'Procès verbaux accidents', fees: 35000, account: '7233300' }
                    ]
                },
                {
                    id: 'AUTRES',
                    name: 'Autres Produits Non Fiscaux',
                    icon: '📦',
                    description: 'Produits divers non classés',
                    subCategories: [
                        { name: 'Autres produits non fiscaux nca', fees: 15000, account: '7280000' },
                        { name: 'Remboursement MFE', fees: 25000, account: '7280110' },
                        { name: 'Location stands marchés', fees: 30000, account: '7213500' },
                        { name: 'Permis de sortie bateaux', fees: 40000, account: '7232300' },
                        { name: 'Contribution spécial bancs et manuels', fees: 0, account: '7233', type: 'pourcentage' },
                        { name: 'Taxe main d\'œuvre étrangère', fees: 0, account: '7144250', type: 'pourcentage' },
                        { name: 'Redevance domaniales', fees: 35000, account: '7213300' },
                        { name: 'Frais titre foncier sécurisé', fees: 50000, account: '7213400' },
                        { name: 'Vente vieux boisements', fees: 25000, account: '7227003' },
                        { name: 'Vente produits locaux', fees: 15000, account: '7227002' },
                        { name: 'Dépôt et publication marque', fees: 30000, account: '7233100' },
                        { name: 'Vérification poids et mesures', fees: 20000, account: '7232200' },
                        { name: 'Redevance attestations fiscales', fees: 15000, account: '7233700' },
                        { name: 'Redevance réimpression NIF', fees: 10000, account: '7233810' },
                        { name: 'Redevances environnementales forfaitaires', fees: 25000, account: '7233' }
                    ]
                },
                {
                    id: 'LONA',
                    name: 'LONA',
                    icon: '🏦',
                    description: 'Recettes de LONA',
                    subCategories: [
                        { name: 'Recettes de LONA', fees: 30000, account: 'LONA' }
                    ]
                },
                {
                    id: 'ABREMA',
                    name: 'ABREMA',
                    icon: '🏛️',
                    description: 'Redevance administrative des services ABREMA',
                    subCategories: [
                        { name: 'Redevance administrative ABREMA', fees: 25000, account: 'ABREMA' }
                    ]
                },
                {
                    id: 'OHP',
                    name: 'OHP - Huile de Palme',
                    icon: '🌴',
                    description: 'Frais d\'extraction de l\'huile de palme',
                    subCategories: [
                        { name: 'Autorisation unité extraction huile palme', fees: 50000, account: 'OHP' },
                        { name: 'Valorisation champs palmier à huile', fees: 35000, account: 'OHP' }
                    ]
                }
            ];
            this.services = [];
            this.categories.forEach(function (cat) {
                cat.subCategories.forEach(function (sub) {
                    var fees = sub.fees || Math.round((0.5 + Math.random() * 5) * 100) / 100;
                    var feesType = sub.type || (fees > 0 ? 'fixe' : 'pourcentage');
                    var service = {
                        id: "".concat(cat.id, "-").concat(String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')),
                        key: "".concat(cat.id, "_").concat(sub.name.replace(/\s/g, '_')),
                        name: sub.name,
                        icon: cat.icon,
                        category: cat.name,
                        subCategory: cat.id,
                        accountNumber: sub.account || "RNF-".concat(cat.id, "-").concat(String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')),
                        status: Math.random() > 0.3 ? 'actif' : 'inactif',
                        fees: fees,
                        feesType: feesType,
                        plafond: Math.round((10000 + Math.random() * 1000000) / 100) * 100,
                        commission: Math.round((1 + Math.random() * 5) * 100) / 100,
                        totalRevenue: 0,
                        transactions: 0,
                        description: "Service de ".concat(sub.name, " relevant de ").concat(cat.name),
                        requiredDocuments: ['Demande écrite', 'Pièce d\'identité', 'Photo d\'identité', 'Reçu de paiement'],
                        procedure: [
                            '1. Déposer une demande écrite auprès du service compétent',
                            '2. Fournir les pièces justificatives requises',
                            '3. Payer les frais de service',
                            '4. Attendre le traitement de la demande (délai: 5 jours ouvrables)',
                            '5. Récupérer le document ou l\'autorisation'
                        ],
                        legalText: "Conform\u00E9ment \u00E0 la loi budg\u00E9taire 2025-2026, le service \"".concat(sub.name, "\" est soumis aux dispositions de l'article ").concat(sub.account || '723', " du code des imp\u00F4ts et taxes. Les frais de service sont fix\u00E9s \u00E0 ").concat(fees, " ").concat(feesType === 'fixe' ? 'BIF' : '%', " conform\u00E9ment \u00E0 la r\u00E9glementation en vigueur.")
                    };
                    _this.services.push(service);
                });
            });
            this.ensureClientsForAllServices();
            this.generateRevenues();
            this.saveData();
        };
        ServicesSettingsComponent_1.prototype.ensureClientsForAllServices = function () {
            var _this = this;
            var services = this.services.filter(function (s) { return s.status === 'actif'; });
            services.forEach(function (service) {
                var existingClients = _this.clients.filter(function (c) { return c.serviceId === service.id; });
                if (existingClients.length < 10) {
                    var needed = 10 - existingClients.length;
                    for (var i = 0; i < needed; i++) {
                        var nameIndex = Math.floor(Math.random() * _this.clientNames.length);
                        var name_1 = _this.clientNames[nameIndex] || 'Client Inconnu';
                        var amount = service.fees + Math.floor(Math.random() * 50000);
                        var client = {
                            id: "CL-".concat(String(100000 + _this.clients.length + 1).padStart(6, '0')),
                            name: name_1,
                            email: "".concat(name_1.toLowerCase().replace(/\s/g, '.'), "@email.com"),
                            phone: "+257 79 ".concat(String(100 + Math.floor(Math.random() * 900)).padStart(3, '0'), " ").concat(String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')),
                            serviceId: service.id,
                            serviceName: service.name,
                            requestDate: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000).toLocaleDateString('fr-FR'),
                            status: ['en_attente', 'approuve', 'rejete'][Math.floor(Math.random() * 3)],
                            amount: Math.round(amount),
                            reference: "REF-CL-".concat(String(100000 + _this.clients.length + 1).padStart(6, '0')),
                            address: "".concat(Math.floor(100 + Math.random() * 900), " Avenue de la R\u00E9publique, Bujumbura"),
                            idNumber: "CNI-".concat(String(100000 + Math.floor(Math.random() * 900000)).padStart(6, '0'))
                        };
                        _this.clients.push(client);
                    }
                }
            });
        };
        ServicesSettingsComponent_1.prototype.generateRevenues = function () {
            var today = new Date();
            var services = this.services.filter(function (s) { return s.status === 'actif'; });
            var paymentMethods = ['Wallet', 'Mobile Money', 'Banque', 'Cash'];
            this.revenues = [];
            for (var i = 0; i < 200; i++) {
                var service = services[Math.floor(Math.random() * services.length)];
                if (!service)
                    continue;
                var date = new Date(today);
                date.setDate(date.getDate() - Math.floor(Math.random() * 90));
                var amount = service.fees + Math.floor(Math.random() * 30000);
                var randomIndex = Math.floor(Math.random() * paymentMethods.length);
                var paymentMethod = paymentMethods[randomIndex] || 'Wallet';
                var clientNameIndex = Math.floor(Math.random() * this.clientNames.length);
                var clientName = this.clientNames[clientNameIndex] || 'Client Inconnu';
                var revenue = {
                    id: "REV-".concat(String(100000 + i + 1).padStart(6, '0')),
                    date: date.toLocaleDateString('fr-FR'),
                    serviceId: service.id,
                    serviceName: service.name,
                    category: service.category,
                    subCategory: service.subCategory,
                    amount: Math.round(amount),
                    reference: "REF-".concat(String(100000 + i + 1).padStart(6, '0')),
                    statut: ['collecte', 'transfert', 'valide'][Math.floor(Math.random() * 3)],
                    paymentMethod: paymentMethod,
                    description: "Paiement pour ".concat(service.name),
                    clientName: clientName,
                    clientId: "CL-".concat(String(100000 + i + 1).padStart(6, '0'))
                };
                this.revenues.push(revenue);
                service.totalRevenue += Math.round(amount);
                service.transactions++;
                service.lastTransaction = revenue.date;
            }
            this.revenues.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        };
        ServicesSettingsComponent_1.prototype.saveData = function () {
            var data = {
                services: this.services,
                revenues: this.revenues,
                clients: this.clients
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        };
        ServicesSettingsComponent_1.prototype.loadData = function () {
            var saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                try {
                    var data = JSON.parse(saved);
                    if (data.services && data.services.length > 0) {
                        this.services = data.services;
                    }
                    if (data.revenues && data.revenues.length > 0) {
                        this.revenues = data.revenues;
                    }
                    if (data.clients && data.clients.length > 0) {
                        this.clients = data.clients;
                    }
                }
                catch (e) {
                    console.error('Erreur de chargement des données', e);
                }
            }
        };
        // ========== GETTERS ==========
        ServicesSettingsComponent_1.prototype.getServices = function () {
            return this.services;
        };
        ServicesSettingsComponent_1.prototype.getServicesByCategory = function (categoryId) {
            return this.services.filter(function (s) { return s.subCategory === categoryId; });
        };
        ServicesSettingsComponent_1.prototype.getRevenues = function () {
            return this.revenues;
        };
        ServicesSettingsComponent_1.prototype.getClients = function () {
            return this.clients;
        };
        ServicesSettingsComponent_1.prototype.getClientsByService = function (serviceId) {
            return this.clients.filter(function (c) { return c.serviceId === serviceId; });
        };
        ServicesSettingsComponent_1.prototype.getRevenuesByService = function (serviceId) {
            return this.revenues.filter(function (r) { return r.serviceId === serviceId; });
        };
        ServicesSettingsComponent_1.prototype.getServiceTotalRevenue = function (serviceId) {
            return this.getRevenuesByService(serviceId).reduce(function (sum, r) { return sum + r.amount; }, 0);
        };
        ServicesSettingsComponent_1.prototype.getServiceTotalRevenueFormatted = function (serviceId) {
            return this.getServiceTotalRevenue(serviceId).toLocaleString('fr-FR');
        };
        ServicesSettingsComponent_1.prototype.getServiceClientCount = function (serviceId) {
            return this.getClientsByService(serviceId).length;
        };
        ServicesSettingsComponent_1.prototype.getTotalPages = function (type) {
            var items = [];
            switch (type) {
                case 'services':
                    items = this.services;
                    break;
                case 'revenues':
                    items = this.revenues;
                    break;
                default: return 1;
            }
            return Math.ceil(items.length / this.pageSize);
        };
        ServicesSettingsComponent_1.prototype.getPaginatedRevenues = function () {
            var page = this.currentPages['revenues'] || 1;
            var start = (page - 1) * this.pageSize;
            return this.revenues.slice(start, start + this.pageSize);
        };
        ServicesSettingsComponent_1.prototype.getPaginatedClients = function (serviceId) {
            var clients = this.getClientsByService(serviceId);
            var page = this.currentPages['clients'] || 1;
            var start = (page - 1) * 10;
            return clients.slice(start, start + 10);
        };
        ServicesSettingsComponent_1.prototype.getTotalClientPages = function (serviceId) {
            var clients = this.getClientsByService(serviceId);
            return Math.ceil(clients.length / 10);
        };
        ServicesSettingsComponent_1.prototype.getCurrentPage = function (type) {
            return this.currentPages[type] || 1;
        };
        ServicesSettingsComponent_1.prototype.nextPage = function (type) {
            var total = this.getTotalPages(type);
            var current = this.currentPages[type] || 1;
            if (current < total)
                this.currentPages[type] = current + 1;
        };
        ServicesSettingsComponent_1.prototype.prevPage = function (type) {
            var current = this.currentPages[type] || 1;
            if (current > 1)
                this.currentPages[type] = current - 1;
        };
        ServicesSettingsComponent_1.prototype.nextClientPage = function (serviceId) {
            var total = this.getTotalClientPages(serviceId);
            var current = this.currentPages['clients'] || 1;
            if (current < total)
                this.currentPages['clients'] = current + 1;
        };
        ServicesSettingsComponent_1.prototype.prevClientPage = function (serviceId) {
            var current = this.currentPages['clients'] || 1;
            if (current > 1)
                this.currentPages['clients'] = current - 1;
        };
        ServicesSettingsComponent_1.prototype.setActiveTab = function (tab) {
            this.activeTab = tab;
            this.currentPages[tab] = 1;
        };
        ServicesSettingsComponent_1.prototype.updateCounts = function () {
            var _this = this;
            this.tabs = this.tabs.map(function (tab) {
                switch (tab.key) {
                    case 'services': return __assign(__assign({}, tab), { count: _this.services.length });
                    case 'revenues': return __assign(__assign({}, tab), { count: _this.revenues.length });
                    default: return tab;
                }
            });
        };
        // ========== MÉTHODES POUR LE TEMPLATE ==========
        ServicesSettingsComponent_1.prototype.getTotalRevenues = function () {
            return this.revenues.reduce(function (sum, r) { return sum + r.amount; }, 0);
        };
        ServicesSettingsComponent_1.prototype.getTotalRevenuesFormatted = function () {
            return this.getTotalRevenues().toLocaleString('fr-FR');
        };
        ServicesSettingsComponent_1.prototype.getActiveServicesCount = function () {
            return this.services.filter(function (s) { return s.status === 'actif'; }).length;
        };
        ServicesSettingsComponent_1.prototype.getServicesByCategoryCount = function (categoryId) {
            return this.services.filter(function (s) { return s.subCategory === categoryId; }).length;
        };
        ServicesSettingsComponent_1.prototype.getRevenuesByCategoryId = function (categoryId) {
            return this.revenues.filter(function (r) { return r.subCategory === categoryId; }).reduce(function (sum, r) { return sum + r.amount; }, 0);
        };
        ServicesSettingsComponent_1.prototype.getRevenuesByCategoryIdFormatted = function (categoryId) {
            return this.getRevenuesByCategoryId(categoryId).toLocaleString('fr-FR');
        };
        ServicesSettingsComponent_1.prototype.getTotalRevenuesByCategory = function (category) {
            var total = this.revenues.filter(function (r) { return r.category === category; }).reduce(function (sum, r) { return sum + r.amount; }, 0);
            return total.toLocaleString('fr-FR');
        };
        // ========== EXPORT EXCEL ==========
        ServicesSettingsComponent_1.prototype.exportToExcel = function () {
            var _this = this;
            var excelData = this.services.map(function (service) { return ({
                'Service': service.name,
                'Catégorie': service.category,
                'Compte': service.accountNumber,
                'Frais': "".concat(service.fees, " ").concat(service.feesType === 'fixe' ? 'BIF' : '%'),
                'Statut': service.status === 'actif' ? 'Actif' : 'Inactif',
                'Clients': _this.getServiceClientCount(service.id),
                'Revenus': _this.getServiceTotalRevenue(service.id),
                'Transactions': service.transactions
            }); });
            var revenueData = this.revenues.map(function (r) { return ({
                'Date': r.date,
                'Client': r.clientName || 'N/A',
                'Service': r.serviceName,
                'Catégorie': r.category,
                'Montant': r.amount,
                'Référence': r.reference,
                'Méthode': r.paymentMethod,
                'Statut': r.statut
            }); });
            this.exportToCSV(excelData, 'services');
            this.exportToCSV(revenueData, 'revenus');
            this.toast('Export Excel effectué avec succès', 'success');
        };
        ServicesSettingsComponent_1.prototype.exportToCSV = function (data, filename) {
            if (data.length === 0)
                return;
            var headers = Object.keys(data[0]);
            var csvRows = [];
            csvRows.push(headers.join(','));
            var _loop_1 = function (row) {
                var values = headers.map(function (header) {
                    var val = row[header] !== undefined ? row[header] : '';
                    return "\"".concat(String(val).replace(/"/g, '""'), "\"");
                });
                csvRows.push(values.join(','));
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var row = data_1[_i];
                _loop_1(row);
            }
            var csvString = csvRows.join('\n');
            var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            var link = document.createElement('a');
            var url = URL.createObjectURL(blob);
            link.href = url;
            link.download = "".concat(filename, "_").concat(new Date().toISOString().split('T')[0], ".csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };
        // ========== IMPRIMER ==========
        ServicesSettingsComponent_1.prototype.printServices = function () {
            window.print();
            this.toast('Impression lancée', 'info');
        };
        // ========== ACTIONS CLIENTS ==========
        ServicesSettingsComponent_1.prototype.openClientDetail = function (client) {
            this.selectedClient = client;
            this.showClientModal = true;
        };
        ServicesSettingsComponent_1.prototype.closeClientModal = function () {
            this.showClientModal = false;
            this.selectedClient = null;
        };
        ServicesSettingsComponent_1.prototype.approveClient = function (client) {
            client.status = 'approuve';
            this.saveData();
            this.toast("Client ".concat(client.name, " approuv\u00E9 avec succ\u00E8s"), 'success');
        };
        ServicesSettingsComponent_1.prototype.rejectClient = function (client) {
            client.status = 'rejete';
            this.saveData();
            this.toast("Client ".concat(client.name, " rejet\u00E9"), 'warning');
        };
        // ========== DÉSACTIVATION AVEC PIN ==========
        ServicesSettingsComponent_1.prototype.openDesactivatePinModal = function (service) {
            this.serviceToDesactivate = service;
            this.desactivatePinCode = '';
            this.showDesactivatePinModal = true;
        };
        // ========== DETAIL MODAL ==========
        ServicesSettingsComponent_1.prototype.openDetailModal = function (service) {
            this.selectedService = service;
            this.currentPages['clients'] = 1;
            this.showDetailModal = true;
        };
        ServicesSettingsComponent_1.prototype.closeDetailModal = function () {
            this.showDetailModal = false;
            this.selectedService = null;
        };
        // ========== KPI DATA ==========
        ServicesSettingsComponent_1.prototype.getKpiData = function () {
            var totalRevenues = this.getTotalRevenues();
            var today = new Date().toLocaleDateString('fr-FR');
            var daily = this.revenues.filter(function (r) { return r.date === today; }).reduce(function (sum, r) { return sum + r.amount; }, 0);
            var weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            var weekly = this.revenues.filter(function (r) { return new Date(r.date) >= weekAgo; }).reduce(function (sum, r) { return sum + r.amount; }, 0);
            var monthAgo = new Date();
            monthAgo.setDate(monthAgo.getDate() - 30);
            var monthly = this.revenues.filter(function (r) { return new Date(r.date) >= monthAgo; }).reduce(function (sum, r) { return sum + r.amount; }, 0);
            var activeServices = this.getActiveServicesCount();
            var totalTransactions = this.revenues.length;
            var totalClients = this.clients.length;
            return [
                {
                    icon: '💰',
                    label: 'Total Revenus',
                    value: totalRevenues.toLocaleString('fr-FR') + ' BIF',
                    color: '#1a1a2e',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: '+15%'
                },
                {
                    icon: '📅',
                    label: 'Aujourd\'hui',
                    value: daily.toLocaleString('fr-FR') + ' BIF',
                    color: '#2e7d32',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: 'journalier'
                },
                {
                    icon: '📊',
                    label: 'Cette semaine',
                    value: weekly.toLocaleString('fr-FR') + ' BIF',
                    color: '#1a237e',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: 'hebdomadaire'
                },
                {
                    icon: '📈',
                    label: 'Ce mois',
                    value: monthly.toLocaleString('fr-FR') + ' BIF',
                    color: '#4a148c',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: 'mensuel'
                },
                {
                    icon: '👥',
                    label: 'Clients',
                    value: totalClients.toString(),
                    color: '#0d47a1',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalClients, " clients")
                },
                {
                    icon: '📋',
                    label: 'Transactions',
                    value: totalTransactions.toString(),
                    color: '#bf360c',
                    textColor: '#ffffff',
                    trend: 'up',
                    trendValue: "".concat(totalTransactions, " transactions")
                }
            ];
        };
        // ========== REVENUS PAR CATÉGORIE ==========
        ServicesSettingsComponent_1.prototype.getRevenuesByCategory = function () {
            var _this = this;
            var map = {};
            this.revenues.forEach(function (r) {
                map[r.category] = (map[r.category] || 0) + r.amount;
            });
            return Object.entries(map).map(function (_a) {
                var category = _a[0], total = _a[1];
                return ({
                    category: category,
                    total: total,
                    count: _this.revenues.filter(function (r) { return r.category === category; }).length
                });
            }).sort(function (a, b) { return b.total - a.total; });
        };
        ServicesSettingsComponent_1.prototype.getRevenuesByServiceList = function () {
            var _this = this;
            var map = {};
            this.revenues.forEach(function (r) {
                map[r.serviceName] = (map[r.serviceName] || 0) + r.amount;
            });
            return Object.entries(map).map(function (_a) {
                var service = _a[0], total = _a[1];
                return ({
                    service: service,
                    total: total,
                    count: _this.revenues.filter(function (r) { return r.serviceName === service; }).length
                });
            }).sort(function (a, b) { return b.total - a.total; });
        };
        // ========== ACTIONS SUR LES SERVICES ==========
        ServicesSettingsComponent_1.prototype.openServiceModal = function (service, action) {
            this.selectedService = service;
            this.modalType = action;
            switch (action) {
                case 'activer':
                    this.modalTitle = "Activer ".concat(service.name);
                    break;
                case 'modifier_frais':
                    this.modalTitle = "Modifier les frais - ".concat(service.name);
                    this.formData = { fees: service.fees, feesType: service.feesType };
                    break;
                case 'definir_plafond':
                    this.modalTitle = "D\u00E9finir le plafond - ".concat(service.name);
                    this.formData = { plafond: service.plafond };
                    break;
                case 'definir_commission':
                    this.modalTitle = "D\u00E9finir la commission - ".concat(service.name);
                    this.formData = { commission: service.commission };
                    break;
                case 'modifier_documents':
                    this.modalTitle = "Modifier les documents requis - ".concat(service.name);
                    this.formData = { documents: service.requiredDocuments.join(', ') };
                    break;
                case 'modifier_procedure':
                    this.modalTitle = "Modifier la proc\u00E9dure - ".concat(service.name);
                    this.formData = { procedure: service.procedure.join('\n') };
                    break;
                default:
                    this.modalTitle = "Action sur ".concat(service.name);
            }
            this.showModal = true;
        };
        ServicesSettingsComponent_1.prototype.confirmModal = function () {
            if (!this.selectedService)
                return;
            switch (this.modalType) {
                case 'activer':
                    this.selectedService.status = 'actif';
                    this.toast("Service ".concat(this.selectedService.name, " activ\u00E9 avec succ\u00E8s"), 'success');
                    break;
                case 'modifier_frais':
                    this.selectedService.fees = this.formData.fees;
                    this.selectedService.feesType = this.formData.feesType;
                    this.toast("Frais de ".concat(this.selectedService.name, " modifi\u00E9s avec succ\u00E8s"), 'success');
                    break;
                case 'definir_plafond':
                    this.selectedService.plafond = this.formData.plafond;
                    this.toast("Plafond de ".concat(this.selectedService.name, " d\u00E9fini avec succ\u00E8s"), 'success');
                    break;
                case 'definir_commission':
                    this.selectedService.commission = this.formData.commission;
                    this.toast("Commission de ".concat(this.selectedService.name, " d\u00E9finie avec succ\u00E8s"), 'success');
                    break;
                case 'modifier_documents':
                    this.selectedService.requiredDocuments = this.formData.documents.split(',').map(function (d) { return d.trim(); });
                    this.toast("Documents de ".concat(this.selectedService.name, " modifi\u00E9s avec succ\u00E8s"), 'success');
                    break;
                case 'modifier_procedure':
                    this.selectedService.procedure = this.formData.procedure.split('\n').filter(function (d) { return d.trim(); });
                    this.toast("Proc\u00E9dure de ".concat(this.selectedService.name, " modifi\u00E9e avec succ\u00E8s"), 'success');
                    break;
            }
            this.saveData();
            this.showModal = false;
            this.selectedService = null;
        };
        ServicesSettingsComponent_1.prototype.closeModal = function () {
            this.showModal = false;
            this.selectedService = null;
        };
        // ========== PIN MODAL ==========
        ServicesSettingsComponent_1.prototype.openPinModal = function () {
            this.pinCode = '';
            this.showPinModal = true;
        };
        // ========== TOASTS ==========
        ServicesSettingsComponent_1.prototype.toast = function (message, type) {
            var _this = this;
            if (type === void 0) { type = 'info'; }
            var id = ++this.toastSeq;
            this.toasts.push({ id: id, message: message, type: type });
            setTimeout(function () { return _this.dismissToast(id); }, 5000);
        };
        ServicesSettingsComponent_1.prototype.dismissToast = function (id) {
            this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        };
        // ========== UTILITAIRES ==========
        ServicesSettingsComponent_1.prototype.getStatutLabel = function (statut) {
            var labels = {
                collecte: '📥 Collectée',
                transfert: '🔄 En transfert',
                valide: '✅ Validée',
                actif: '✅ Actif',
                inactif: '⛔ Inactif',
                en_attente: '⏳ En attente',
                approuve: '✅ Approuvé',
                rejete: '❌ Rejeté'
            };
            return labels[statut] || statut;
        };
        ServicesSettingsComponent_1.prototype.getCategoryIcon = function (categoryId) {
            var cat = this.categories.find(function (c) { return c.id === categoryId; });
            return (cat === null || cat === void 0 ? void 0 : cat.icon) || '📦';
        };
        ServicesSettingsComponent_1.prototype.getCategoryName = function (categoryId) {
            var cat = this.categories.find(function (c) { return c.id === categoryId; });
            return (cat === null || cat === void 0 ? void 0 : cat.name) || categoryId;
        };
        return ServicesSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "ServicesSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ServicesSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ServicesSettingsComponent = _classThis;
}();
export { ServicesSettingsComponent };
//# sourceMappingURL=services-settings.component.js.map