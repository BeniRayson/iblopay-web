/**
 * Données simulées (mock) pour la page Gestion des utilisateurs.
 * 30 Clients, 30 Agents, 30 Super Agents, 10 Administrateurs.
 * Génération déterministe (pas de Math.random) pour un rendu stable.
 */
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
var PRENOMS = [
    'Élise', 'Aline', 'Jean-Claude', 'Diane', 'Espérance', 'Gaspard', 'Immaculée', 'Léonce',
    'Providence', 'Salvator', 'Yvette', 'Désiré', 'Clarisse', 'Emmanuel', 'Fabiola', 'Gloria',
    'Innocent', 'Joëlle', 'Kevin', 'Léa', 'Moïse', 'Nadège', 'Olivier', 'Prisca', 'Rénovat',
    'Sandrine', 'Théoneste', 'Ursule', 'Vénérand', 'Willy', 'Anicet', 'Bella', 'Concessa',
    'Dieudonné', 'Euphrasie', 'Fidèle', 'Grâce', 'Honoré', 'Ines', 'Japhet'
];
var NOMS = [
    'Ndikumana', 'Nzeyimana', 'Bizimana', 'Niyonzima', 'Habimana', 'Nkurunziza', 'Ndayishimiye',
    'Nizigiyimana', 'Baragahoranye', 'Ntahomvukiye', 'Ntirampeba', 'Nahimana', 'Sindayigaya',
    'Manirakiza', 'Nsengiyumva', 'Ntahonkuriye', 'Barampama', 'Nininahazwe', 'Nzisabira', 'Ntakirutimana'
];
/** Province -> Communes -> Zones -> Collines/Quartiers (échantillon représentatif) */
export var DECOUPAGE = {
    'Bujumbura Mairie': {
        'Mukaza': { 'Zone Rohero': ['Rohero I', 'Rohero II'], 'Zone Buyenzi': ['Buyenzi', 'Bunanga'] },
        'Ntahangwa': { 'Zone Ngagara': ['Ngagara I', 'Ngagara II'], 'Zone Cibitoke': ['Cibitoke', 'Gasenyi'] },
        'Muha': { 'Zone Kanyosha': ['Kanyosha', 'Kigobe'], 'Zone Musaga': ['Musaga', 'Kabondo'] }
    },
    'Gitega': {
        'Gitega': { 'Zone Nyamugari': ['Nyamugari', 'Mirango'], 'Zone Shanka': ['Shanka', 'Nyakizu'] },
        'Nyanza-Lac': { 'Zone Centre': ['Nyanza-Lac Centre', 'Kiyange'] },
        'Ryansoro': { 'Zone Ryansoro': ['Kigamba', 'Nyabikenke'] }
    },
    'Ngozi': {
        'Ngozi': { 'Zone Ngozi': ['Nyamugari', 'Rugazi'] },
        'Kiremba': { 'Zone Kiremba': ['Kiremba Centre', 'Marangara'] },
        'Busiga': { 'Zone Busiga': ['Busiga Centre', 'Rugari'] }
    },
    'Muyinga': {
        'Muyinga': { 'Zone Muyinga': ['Muyinga Centre', 'Gasave'] },
        'Gasorwe': { 'Zone Gasorwe': ['Gasorwe Centre', 'Nyabihanga'] },
        'Giteranyi': { 'Zone Giteranyi': ['Giteranyi Centre', 'Rugero'] }
    },
    'Bururi': {
        'Bururi': { 'Zone Bururi': ['Bururi Centre', 'Nyabikenke'] },
        'Rutovu': { 'Zone Rutovu': ['Rutovu Centre', 'Rugoti'] },
        'Songa': { 'Zone Songa': ['Songa Centre', 'Rutumo'] }
    },
    'Kayanza': {
        'Kayanza': { 'Zone Kayanza': ['Kayanza Centre', 'Rango'] },
        'Butaganzwa': { 'Zone Butaganzwa': ['Butaganzwa Centre', 'Nyagisozi'] },
        'Gahombo': { 'Zone Gahombo': ['Gahombo Centre', 'Rugereka'] }
    },
    'Rumonge': {
        'Rumonge': { 'Zone Rumonge': ['Rumonge Centre', 'Kigwena'] },
        'Buyengero': { 'Zone Buyengero': ['Buyengero Centre', 'Kagongo'] },
        'Burambi': { 'Zone Burambi': ['Burambi Centre', 'Nyabisindu'] }
    },
    'Cibitoke': {
        'Cibitoke': { 'Zone Cibitoke': ['Cibitoke Centre', 'Rugombo Nord'] },
        'Buganda': { 'Zone Buganda': ['Buganda Centre', 'Muzinda'] },
        'Rugombo': { 'Zone Rugombo': ['Rugombo Centre', 'Rukana'] }
    }
};
export var PROVINCE_NAMES = Object.keys(DECOUPAGE);
export function communesOf(province) {
    var _a;
    return Object.keys((_a = DECOUPAGE[province]) !== null && _a !== void 0 ? _a : {});
}
export function zonesOf(province, commune) {
    var _a, _b;
    return Object.keys((_b = (_a = DECOUPAGE[province]) === null || _a === void 0 ? void 0 : _a[commune]) !== null && _b !== void 0 ? _b : {});
}
export function collinesOf(province, commune, zone) {
    var _a, _b, _c;
    return (_c = (_b = (_a = DECOUPAGE[province]) === null || _a === void 0 ? void 0 : _a[commune]) === null || _b === void 0 ? void 0 : _b[zone]) !== null && _c !== void 0 ? _c : [];
}
var REGIONS = ['Région Centre', 'Région Nord', 'Région Sud', 'Région Est', 'Région Ouest', 'Région Bujumbura'];
var ADMIN_ROLES = ['Super Administrateur', 'Administrateur Financier', 'Administrateur Support', 'Administrateur Conformité', 'Administrateur Technique'];
function pick(arr, seed) {
    return arr[seed % arr.length];
}
function pad(n, len) {
    if (len === void 0) { len = 3; }
    return n.toString().padStart(len, '0');
}
function formatDate(daysAgo) {
    var d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fullName(i, offset) {
    if (offset === void 0) { offset = 0; }
    return "".concat(pick(PRENOMS, i + offset), " ").concat(pick(NOMS, i * 3 + 7 + offset));
}
function phone(prefix, i) {
    return "+257 ".concat(prefix, " ").concat(pad((i * 37 + 11) % 900 + 10, 2), " ").concat(pad((i * 53 + 19) % 90, 2), " ").concat(pad((i * 71 + 29) % 90, 2));
}
function cni(i) {
    return "".concat(1100 + (i * 7) % 800).concat(pad((i * 913) % 100000, 5)).concat(pad((i * 31) % 100, 2));
}
function numeroCarte(i, prefix) {
    if (prefix === void 0) { prefix = '6304'; }
    return "".concat(prefix, " ").concat(pad((i * 337) % 10000, 4), " ").concat(pad((i * 619) % 10000, 4), " ").concat(pad((i * 977) % 10000, 4));
}
function nif(i) {
    return "4".concat(pad((i * 4111) % 100000000, 8));
}
function rccm(i, place) {
    if (place === void 0) { place = 'BJM'; }
    return "RCCM/".concat(place, "/").concat(pad((i * 271) % 100000, 5));
}
function adresse(i, offset) {
    if (offset === void 0) { offset = 0; }
    var province = pick(PROVINCE_NAMES, i + offset);
    var communes = communesOf(province);
    var commune = pick(communes, i + offset + 1);
    var zones = zonesOf(province, commune);
    var zone = pick(zones, i + offset + 2);
    var collines = collinesOf(province, commune, zone);
    var colline = pick(collines, i + offset + 3);
    return { province: province, commune: commune, zone: zone, colline: colline };
}
// ---------- Super Agents (30) ----------
export var SUPER_AGENTS = Array.from({ length: 30 }, function (_, idx) {
    var i = idx + 1;
    var statut = i % 11 === 0 ? 'suspendu' : i % 17 === 0 ? 'archive' : 'actif';
    return __assign(__assign({ id: "SA-".concat(pad(i)), nom: fullName(i, 2) + ' (' + pick(REGIONS, i) + ')', telephone: phone('79', i), cni: cni(i + 500), numeroCarte: numeroCarte(i, '6390'), nif: nif(i + 100), rccm: rccm(i + 40), documentAcceptation: "acceptation_superagent_".concat(pad(i), ".pdf"), region: pick(REGIONS, i) }, adresse(i, 10)), { statut: statut, nbAgents: 3 + (i * 7) % 25, soldeDistribution: 500000 + ((i * 91237) % 8000000), performanceGlobale: 55 + (i * 13) % 45, commissionsMois: 40000 + ((i * 6173) % 900000), dateCreation: formatDate(200 + i * 11) });
});
// ---------- Agents (30) ----------
export var AGENTS = Array.from({ length: 30 }, function (_, idx) {
    var i = idx + 1;
    var sa = SUPER_AGENTS[i % SUPER_AGENTS.length];
    var statut = i % 9 === 0 ? 'suspendu' : i % 23 === 0 ? 'archive' : 'actif';
    return __assign(__assign({ id: "AG-".concat(pad(i)), nom: fullName(i, 5), telephone: phone('76', i), cni: cni(i + 200), numeroCarte: numeroCarte(i, '6304'), nif: nif(i + 300), rccm: rccm(i + 90, 'GTG'), documentAcceptation: "acceptation_agent_".concat(pad(i), ".pdf"), superAgentId: sa.id, superAgentNom: sa.nom.split(' (')[0] }, adresse(i, 4)), { statut: statut, soldeEMoney: 50000 + ((i * 34567) % 2000000), soldeCash: 20000 + ((i * 18923) % 800000), limiteJournaliere: 500000 + (i % 5) * 250000, performance: 40 + (i * 17) % 60, commissionsMois: 15000 + ((i * 4231) % 250000), dateCreation: formatDate(150 + i * 6) });
});
// ---------- Clients (30) ----------
export var CLIENTS = Array.from({ length: 30 }, function (_, idx) {
    var i = idx + 1;
    var statut = i % 8 === 0 ? 'suspendu' : i % 19 === 0 ? 'archive' : 'actif';
    var kyc = (1 + (i % 3));
    var agent = AGENTS[i % AGENTS.length];
    return __assign(__assign({ id: "CL-".concat(pad(i)), nom: fullName(i, 9), telephone: phone('62', i), email: "client".concat(pad(i), "@iblopay.bi"), cni: cni(i), numeroCarte: numeroCarte(i, '6521'), agentId: agent.id, agentNom: agent.nom }, adresse(i, 7)), { statut: statut, kycLevel: kyc, soldeWallet: (i * 12345) % 500000, nbCartes: i % 4, nbBeneficiaires: 1 + (i % 6), dateCreation: formatDate(30 + i * 4), derniereConnexion: formatDate(i % 15) });
});
// ---------- Administrateurs (10) ----------
export var ADMINS = Array.from({ length: 10 }, function (_, idx) {
    var i = idx + 1;
    var statut = i % 6 === 0 ? 'desactive' : 'actif';
    return {
        id: "AD-".concat(pad(i)),
        nom: fullName(i, 15),
        email: "admin".concat(pad(i), "@iblopay.bi"),
        role: pick(ADMIN_ROLES, i),
        statut: statut,
        doubleAuth: i % 3 !== 0,
        derniereConnexion: formatDate(i % 10)
    };
});
//# sourceMappingURL=users-mock-data.js.map