var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// ============================================================
// FONCTIONS HELPER
// ============================================================
var getRandomItem = function (array, fallback) {
    if (!array || array.length === 0)
        return fallback;
    return array[Math.floor(Math.random() * array.length)] || fallback;
};
var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomDate = function (daysAgo) {
    return new Date(Date.now() - Math.random() * daysAgo * 24 * 60 * 60 * 1000);
};
var getRandomBoolean = function (probability) {
    if (probability === void 0) { probability = 0.5; }
    return Math.random() < probability;
};
// ============================================================
// GÉNÉRATION DE CATÉGORIES
// ============================================================
var generateCategories = function (serviceId, count) {
    var categories = [];
    var noms = ['RNF', 'FISCALE', 'ADMINISTRATIVE', 'TECHNIQUE', 'ENVIRONNEMENTALE'];
    var types = ['RNF', 'FISCALE', 'AUTRE'];
    var codes = ['CAT-001', 'CAT-002', 'CAT-003', 'CAT-004', 'CAT-005'];
    var generateFrais = function (categorieId) {
        var frais = [];
        var typesFrais = ['FIXE', 'PERCENTAGE', 'FORFAITAIRE'];
        var frequences = ['MENSUEL', 'TRIMESTRIEL', 'ANNUEL', 'PONCTUEL'];
        var nomsFrais = ['Frais de dossier', 'Commission de gestion', 'Frais de traitement', 'Redevance'];
        for (var i = 0; i < getRandomInt(2, 4); i++) {
            var type = getRandomItem(typesFrais, 'FIXE');
            var isPercentage = type === 'PERCENTAGE';
            var fraisItem = {
                id: i + 1,
                nom: getRandomItem(nomsFrais, 'Frais de dossier'),
                description: "Description du frais ".concat(i + 1),
                montant: isPercentage ? 0 : Math.round((Math.random() * 100000 + 1000) / 10) * 10,
                devise: 'BIF',
                type: type,
                frequence: getRandomItem(frequences, 'ANNUEL'),
                actif: getRandomBoolean(0.7),
                dateCreation: getRandomDate(365),
                categorieId: categorieId
            };
            if (isPercentage) {
                fraisItem.pourcentage = Math.round((Math.random() * 10 + 1) * 100) / 100;
                fraisItem.montantMin = Math.round((Math.random() * 10000 + 1000) / 10) * 10;
                fraisItem.montantMax = Math.round((Math.random() * 100000 + 50000) / 10) * 10;
            }
            frais.push(fraisItem);
        }
        return frais;
    };
    var generateDocumentsRequis = function (categorieId) {
        var documents = [];
        var types = ['FORMULAIRE', 'CERTIFICAT', 'ATTRESTATION', 'AUTRE'];
        var formats = ['PDF', 'DOCX', 'XLSX', 'IMAGE', 'AUTRE'];
        var noms = ['Attestation de conformité', 'Certificat d\'homologation', 'Formulaire de demande', 'Pièce d\'identité'];
        for (var i = 0; i < getRandomInt(2, 4); i++) {
            documents.push({
                id: i + 1,
                nom: getRandomItem(noms, 'Document requis'),
                description: "Description du document ".concat(i + 1),
                type: getRandomItem(types, 'FORMULAIRE'),
                obligatoire: getRandomBoolean(0.8),
                format: getRandomItem(formats, 'PDF'),
                dateCreation: getRandomDate(365),
                categorieId: categorieId,
                version: "1.".concat(i, ".0")
            });
        }
        return documents;
    };
    var generateStatistiques = function () {
        return {
            totalFrais: getRandomInt(2, 6),
            totalDocuments: getRandomInt(2, 5),
            totalOperations: getRandomInt(10, 50),
            montantTotal: Math.round((Math.random() * 10000000 + 500000) / 10) * 10,
            dernierMois: {
                operations: getRandomInt(5, 20),
                montant: Math.round((Math.random() * 2000000 + 200000) / 10) * 10
            }
        };
    };
    for (var i = 0; i < count; i++) {
        var categorieId = i + 1;
        var frais = generateFrais(categorieId);
        var documentsRequis = generateDocumentsRequis(categorieId);
        var code = codes[i % codes.length] || 'CAT-001';
        var nom = getRandomItem(noms, 'RNF');
        categories.push({
            id: categorieId,
            nom: nom,
            code: code,
            description: "Description de la cat\u00E9gorie ".concat(i + 1),
            type: getRandomItem(types, 'RNF'),
            actif: getRandomBoolean(0.8),
            dateCreation: getRandomDate(730),
            dateModification: getRandomDate(30),
            serviceId: serviceId,
            frais: frais,
            documentsRequis: documentsRequis,
            statistiques: generateStatistiques()
        });
    }
    return categories;
};
// ============================================================
// GÉNÉRATION DES TYPES RNF
// ============================================================
var generateTypesRNF = function (serviceId) {
    var typesRNF = [];
    // Type A - Redevances ARCT
    var typeA = {
        id: 1,
        numero: 1,
        libelle: 'REDEVANCES ANNUELLES FACTUREES PAR ARCT',
        description: 'Redevances annuelles facturées par ARCT',
        typePaiement: 'A',
        categorie: 'Redevances annuelles',
        institution: 'ARCT',
        actif: true,
        dateCreation: getRandomDate(730),
        serviceId: serviceId,
        sousTypes: [
            { id: 1, nom: 'Autorisation réseaux radioélectriques', description: 'Autorisation pour réseaux radioélectriques', typeRNFId: 1, actif: true, dateCreation: getRandomDate(365) },
            { id: 2, nom: 'Etude du dossier', description: 'Frais d\'étude du dossier', typeRNFId: 1, actif: true, dateCreation: getRandomDate(365) }
        ]
    };
    typesRNF.push(typeA);
    // Type B - ABREMA
    var typeB = {
        id: 2,
        numero: 1,
        libelle: 'RECETTES COLLECTEES PAR ABREMA',
        description: 'Recettes collectées par ABREMA',
        typePaiement: 'B',
        categorie: 'Recettes ABREMA',
        institution: 'ABREMA',
        actif: true,
        dateCreation: getRandomDate(730),
        serviceId: serviceId,
        sousTypes: [
            { id: 3, nom: 'Redevance administrative des services ABREMA', description: 'Redevance administrative ABREMA', typeRNFId: 2, actif: true, dateCreation: getRandomDate(365) }
        ]
    };
    typesRNF.push(typeB);
    return typesRNF;
};
// ============================================================
// GÉNÉRATION DE PAIEMENTS RNF
// ============================================================
var generatePaiementsRNF = function (serviceId, count, typesRNF) {
    var paiements = [];
    var statuts = ['PAYE', 'EN_ATTENTE', 'ANNULE', 'PARTIEL'];
    var modesPaiement = ['VIREMENT', 'ESPECES', 'CHEQUE', 'MOBILE'];
    var comptes = ['Compte Transit OBR', 'Compte Séquestre KCB', 'Compte Administratif'];
    var utilisateurs = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Nkurunziza', 'Claire Niyonzima'];
    for (var i = 0; i < count; i++) {
        var typeRNF = getRandomItem(typesRNF, typesRNF[0]);
        if (!typeRNF)
            continue;
        var sousTypes = typeRNF.sousTypes || [];
        var sousTypeRNFId = undefined;
        if (sousTypes.length > 0) {
            var sousType = getRandomItem(sousTypes, sousTypes[0]);
            if (sousType) {
                sousTypeRNFId = sousType.id;
            }
        }
        var datePaiement = getRandomDate(90);
        var dateEcheance = new Date(datePaiement);
        dateEcheance.setMonth(dateEcheance.getMonth() + 1);
        var paiement = {
            id: i + 1,
            reference: "PAY-".concat(String(serviceId).padStart(3, '0'), "-").concat(String(i + 1).padStart(6, '0')),
            typeRNFId: typeRNF.id,
            montant: Math.round((Math.random() * 5000000 + 100000) / 10) * 10,
            devise: 'BIF',
            statut: getRandomItem(statuts, 'PAYE'),
            datePaiement: datePaiement,
            dateEcheance: dateEcheance,
            description: "Paiement de ".concat(sousTypeRNFId ? 'sous-type' : typeRNF.libelle),
            utilisateurId: getRandomInt(1, 20),
            utilisateurNom: getRandomItem(utilisateurs, 'Jean Ndayishimiye'),
            serviceId: serviceId,
            compteDestinataire: getRandomItem(comptes, 'Compte Transit OBR'),
            modePaiement: getRandomItem(modesPaiement, 'VIREMENT')
        };
        if (sousTypeRNFId !== undefined) {
            paiement.sousTypeRNFId = sousTypeRNFId;
        }
        var refPaiement = Math.random() > 0.5 ? "REF-".concat(String(Math.random() * 1000000).padStart(6, '0')) : undefined;
        if (refPaiement !== undefined) {
            paiement.referencePaiement = refPaiement;
        }
        var observations = Math.random() > 0.7 ? 'Paiement effectué avec succès' : undefined;
        if (observations !== undefined) {
            paiement.observations = observations;
        }
        paiements.push(paiement);
    }
    return paiements;
};
// ============================================================
// GÉNÉRATION D'UTILISATEURS
// ============================================================
var generateUtilisateurs = function (serviceId, count) {
    var utilisateurs = [];
    var noms = ['Ndayishimiye', 'Uwimana', 'Niyonzima', 'Mukiza', 'Nishimwe', 'Hakizimana', 'Nkurunziza'];
    var prenoms = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Lucas', 'Emma', 'Thomas', 'Julie', 'David', 'Laura'];
    var roles = ['ADMIN', 'AGENT', 'CLIENT', 'SUPERVISEUR'];
    var statuts = ['ACTIF', 'INACTIF', 'SUSPENDU'];
    for (var i = 0; i < count; i++) {
        var nom = getRandomItem(noms, 'Ndayishimiye');
        var prenom = getRandomItem(prenoms, 'Jean');
        utilisateurs.push({
            id: i + 1,
            nom: nom,
            prenom: prenom,
            email: "".concat(prenom.toLowerCase(), ".").concat(nom.toLowerCase(), "@email.bi"),
            telephone: "+257 6".concat(String(Math.floor(Math.random() * 10000000)).padStart(7, '0')),
            role: getRandomItem(roles, 'CLIENT'),
            statut: getRandomItem(statuts, 'ACTIF'),
            dateInscription: getRandomDate(365),
            dernierAcces: getRandomDate(30),
            serviceId: serviceId
        });
    }
    return utilisateurs;
};
// ============================================================
// GÉNÉRATION DE STATISTIQUES
// ============================================================
var generateStatistiques = function (serviceId, typesRNF, paiements) {
    var totalUtilisateurs = getRandomInt(10, 100);
    var totalTypesRNF = typesRNF.length;
    var totalSousTypes = typesRNF.reduce(function (acc, t) { var _a; return acc + (((_a = t.sousTypes) === null || _a === void 0 ? void 0 : _a.length) || 0); }, 0);
    var totalPaiements = paiements.length;
    var montantTotalPaiements = paiements.reduce(function (acc, p) { return acc + p.montant; }, 0);
    return {
        totalUtilisateurs: totalUtilisateurs,
        utilisateursActifs: Math.round(totalUtilisateurs * (0.6 + Math.random() * 0.3)),
        totalTypesRNF: totalTypesRNF,
        totalSousTypes: totalSousTypes,
        totalPaiements: totalPaiements,
        montantTotalPaiements: montantTotalPaiements,
        totalCategories: getRandomInt(2, 5),
        totalInstitutions: getRandomInt(3, 8),
        dernierMois: {
            mois: new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' }),
            paiements: getRandomInt(10, 30),
            montant: Math.round((Math.random() * 10000000 + 1000000) / 10) * 10,
            utilisateurs: getRandomInt(5, 20),
            nouveauxTypes: getRandomInt(1, 5)
        }
    };
};
// ============================================================
// SERVICES PUBLICS MOCK - COMPLET
// ============================================================
export var SERVICES_PUBLICS_MOCK = [
    {
        id: 1,
        numero: 1,
        abreviation: 'GPR-RNF',
        description: 'Système de gestion des factures émises par ARCT',
        type: 'INTERNE',
        actif: true,
        dateCreation: new Date(2022, 5, 15),
        version: '2.3.1',
        responsable: 'Jean Ndayishimiye',
        email: 'gpr-rnf@obr.bi',
        telephone: '+257 22 22 22 22',
        siteWeb: 'https://obr.bi/gpr-rnf',
        utilisateurs: generateUtilisateurs(1, 25),
        categories: generateCategories(1, 3),
        typesRNF: generateTypesRNF(1),
        paiements: generatePaiementsRNF(1, 30, generateTypesRNF(1)),
        statistiques: generateStatistiques(1, generateTypesRNF(1), generatePaiementsRNF(1, 30, generateTypesRNF(1)))
    }
];
// Générer les 24 autres services
var generateAllServices = function () {
    var services = [];
    var noms = [
        'SIGFIP', 'GED-ADMIN', 'GPE-RH', 'Easy-business', 'BANCOBU E-NOTI',
        'OTRACO', 'PAFE/MIGRATIONS', 'PSR', 'TITRES FONCIERS - BPS', 'TITRES FONCIERS - PMS',
        'PJP/INTERPOL', 'e-CMR', 'PORTAL-IMPOTS', 'e-DOUANES', 'AGREMENT-GARAGES',
        'LICENCES-DEBITS', 'AMENDES-ROUTIERES', 'REDEVANCES-ENVIRONNEMENT', 'SANTE-PUBLIQUE',
        'AGRICULTURE-SEMENCES', 'DIVIDENDES-ETAT', 'PROTECTION-MARQUES', 'POIDS-MESURES',
        'ATTESTATIONS-FISCALES'
    ];
    var descriptions = [
        "Système d'Information pour la Gestion des Finances Publiques",
        "Gestion Électronique des Documents Administratifs de l'OBR",
        "Gestion du Personnel et des Rémunérations de l'État",
        "Système utilisé par l'ADB pour la gestion des entreprises",
        "Système de gestion des stands dans les marchés de l'Etat",
        "Système de gestion de contrôle technique des véhicules",
        "Système de gestion des documents de voyage",
        "Système de gestion de production des permis de conduire",
        "Système de facturation Proforma pour transfert de titres de propriétés",
        "Système de gestion des données d'expertise lors des transferts de propriété",
        "Système de gestion des données liées au vol ou non des véhicules",
        "Système de gestion électronique des certificats de transport",
        "Portail des contribuables pour les déclarations fiscales",
        "Système de dédouanement électronique",
        "Système de gestion des agréments des garages",
        "Système de gestion des licences d'exploitation",
        "Système de gestion des amendes routières",
        "Système de gestion des redevances environnementales",
        "Système de gestion des prestations de santé",
        "Système de gestion des ventes de semences",
        "Système de gestion des dividendes de l'État",
        "Système de gestion des dépôts et publications de marques",
        "Système de gestion de la vérification des poids et mesures",
        "Système de gestion des attestations fiscales"
    ];
    for (var i = 0; i < noms.length; i++) {
        var id = i + 2;
        var nom = noms[i] || 'UNKNOWN';
        var desc = descriptions[i] || 'Description non disponible';
        var utilisateurs = generateUtilisateurs(id, getRandomInt(10, 50));
        var typesRNF = generateTypesRNF(id);
        var paiements = generatePaiementsRNF(id, getRandomInt(20, 60), typesRNF);
        services.push({
            id: id,
            numero: i + 2,
            abreviation: nom,
            description: desc,
            type: i < 3 ? 'INTERNE' : 'EXTERNE',
            actif: getRandomBoolean(0.8),
            dateCreation: getRandomDate(730),
            version: "".concat(getRandomInt(1, 3), ".").concat(getRandomInt(0, 9), ".").concat(getRandomInt(0, 9)),
            responsable: "Responsable ".concat(nom),
            email: "".concat(nom.toLowerCase(), "@service.bi"),
            telephone: "+257 22 ".concat(String(22 + i).padStart(2, '0'), " ").concat(String(22 + i).padStart(2, '0')),
            siteWeb: "https://".concat(nom.toLowerCase(), ".service.bi"),
            utilisateurs: utilisateurs,
            categories: generateCategories(id, getRandomInt(2, 4)),
            typesRNF: typesRNF,
            paiements: paiements,
            statistiques: generateStatistiques(id, typesRNF, paiements)
        });
    }
    return services;
};
export var SERVICES_PUBLICS_MOCK_COMPLETE = __spreadArray(__spreadArray([], SERVICES_PUBLICS_MOCK.slice(0, 1), true), generateAllServices(), true);
//# sourceMappingURL=services-publics.mock.js.map