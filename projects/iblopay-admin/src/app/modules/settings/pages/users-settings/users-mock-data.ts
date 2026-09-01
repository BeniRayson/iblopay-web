/**
 * Données simulées (mock) pour la page Gestion des utilisateurs.
 * 30 Clients, 30 Agents, 30 Super Agents, 10 Administrateurs.
 * Génération déterministe (pas de Math.random) pour un rendu stable.
 */

export type Statut = 'actif' | 'suspendu' | 'archive';
export type StatutAdmin = 'actif' | 'desactive';

/** Découpage administratif du Burundi : Province > Commune > Zone > Colline/Quartier */
export interface Adresse {
  province: string;
  commune: string;
  zone: string;
  colline: string;
}

export interface ClientUser extends Adresse {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  cni: string;
  numeroCarte: string;
  agentId: string;
  agentNom: string;
  statut: Statut;
  kycLevel: 1 | 2 | 3;
  soldeWallet: number;
  nbCartes: number;
  nbBeneficiaires: number;
  dateCreation: string;
  derniereConnexion: string;
}

export interface AgentUser extends Adresse {
  id: string;
  nom: string;
  telephone: string;
  cni: string;
  numeroCarte: string;
  nif: string;
  rccm: string;
  documentAcceptation: string;
  superAgentId: string;
  superAgentNom: string;
  statut: Statut;
  soldeEMoney: number;
  soldeCash: number;
  limiteJournaliere: number;
  performance: number;
  commissionsMois: number;
  dateCreation: string;
}

export interface SuperAgentUser extends Adresse {
  id: string;
  nom: string;
  telephone: string;
  cni: string;
  numeroCarte: string;
  nif: string;
  rccm: string;
  documentAcceptation: string;
  region: string;
  statut: Statut;
  nbAgents: number;
  soldeDistribution: number;
  performanceGlobale: number;
  commissionsMois: number;
  dateCreation: string;
}

export interface AdminUser {
  id: string;
  nom: string;
  email: string;
  role: string;
  statut: StatutAdmin;
  doubleAuth: boolean;
  derniereConnexion: string;
}

const PRENOMS = [
  'Élise','Aline','Jean-Claude','Diane','Espérance','Gaspard','Immaculée','Léonce',
  'Providence','Salvator','Yvette','Désiré','Clarisse','Emmanuel','Fabiola','Gloria',
  'Innocent','Joëlle','Kevin','Léa','Moïse','Nadège','Olivier','Prisca','Rénovat',
  'Sandrine','Théoneste','Ursule','Vénérand','Willy','Anicet','Bella','Concessa',
  'Dieudonné','Euphrasie','Fidèle','Grâce','Honoré','Ines','Japhet'
];
const NOMS = [
  'Ndikumana','Nzeyimana','Bizimana','Niyonzima','Habimana','Nkurunziza','Ndayishimiye',
  'Nizigiyimana','Baragahoranye','Ntahomvukiye','Ntirampeba','Nahimana','Sindayigaya',
  'Manirakiza','Nsengiyumva','Ntahonkuriye','Barampama','Nininahazwe','Nzisabira','Ntakirutimana'
];

/** Province -> Communes -> Zones -> Collines/Quartiers (échantillon représentatif) */
export const DECOUPAGE: Record<string, Record<string, Record<string, string[]>>> = {
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
export const PROVINCE_NAMES = Object.keys(DECOUPAGE);
export function communesOf(province: string): string[] {
  return Object.keys(DECOUPAGE[province] ?? {});
}
export function zonesOf(province: string, commune: string): string[] {
  return Object.keys(DECOUPAGE[province]?.[commune] ?? {});
}
export function collinesOf(province: string, commune: string, zone: string): string[] {
  return DECOUPAGE[province]?.[commune]?.[zone] ?? [];
}

const REGIONS = ['Région Centre','Région Nord','Région Sud','Région Est','Région Ouest','Région Bujumbura'];
const ADMIN_ROLES = ['Super Administrateur','Administrateur Financier','Administrateur Support','Administrateur Conformité','Administrateur Technique'];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]!;
}

function pad(n: number, len = 3): string {
  return n.toString().padStart(len, '0');
}

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fullName(i: number, offset = 0): string {
  return `${pick(PRENOMS, i + offset)} ${pick(NOMS, i * 3 + 7 + offset)}`;
}

function phone(prefix: string, i: number): string {
  return `+257 ${prefix} ${pad((i * 37 + 11) % 900 + 10, 2)} ${pad((i * 53 + 19) % 90, 2)} ${pad((i * 71 + 29) % 90, 2)}`;
}

function cni(i: number): string {
  return `${1100 + (i * 7) % 800}${pad((i * 913) % 100000, 5)}${pad((i * 31) % 100, 2)}`;
}

function numeroCarte(i: number, prefix = '6304'): string {
  return `${prefix} ${pad((i * 337) % 10000, 4)} ${pad((i * 619) % 10000, 4)} ${pad((i * 977) % 10000, 4)}`;
}

function nif(i: number): string {
  return `4${pad((i * 4111) % 100000000, 8)}`;
}

function rccm(i: number, place = 'BJM'): string {
  return `RCCM/${place}/${pad((i * 271) % 100000, 5)}`;
}

function adresse(i: number, offset = 0): Adresse {
  const province = pick(PROVINCE_NAMES, i + offset);
  const communes = communesOf(province);
  const commune = pick(communes, i + offset + 1);
  const zones = zonesOf(province, commune);
  const zone = pick(zones, i + offset + 2);
  const collines = collinesOf(province, commune, zone);
  const colline = pick(collines, i + offset + 3);
  return { province, commune, zone, colline };
}

// ---------- Super Agents (30) ----------
export const SUPER_AGENTS: SuperAgentUser[] = Array.from({ length: 30 }, (_, idx) => {
  const i = idx + 1;
  const statut: Statut = i % 11 === 0 ? 'suspendu' : i % 17 === 0 ? 'archive' : 'actif';
  return {
    id: `SA-${pad(i)}`,
    nom: fullName(i, 2) + ' (' + pick(REGIONS, i) + ')',
    telephone: phone('79', i),
    cni: cni(i + 500),
    numeroCarte: numeroCarte(i, '6390'),
    nif: nif(i + 100),
    rccm: rccm(i + 40),
    documentAcceptation: `acceptation_superagent_${pad(i)}.pdf`,
    region: pick(REGIONS, i),
    ...adresse(i, 10),
    statut,
    nbAgents: 3 + (i * 7) % 25,
    soldeDistribution: 500_000 + ((i * 91_237) % 8_000_000),
    performanceGlobale: 55 + (i * 13) % 45,
    commissionsMois: 40_000 + ((i * 6173) % 900_000),
    dateCreation: formatDate(200 + i * 11)
  };
});

// ---------- Agents (30) ----------
export const AGENTS: AgentUser[] = Array.from({ length: 30 }, (_, idx) => {
  const i = idx + 1;
  const sa = SUPER_AGENTS[i % SUPER_AGENTS.length]!;
  const statut: Statut = i % 9 === 0 ? 'suspendu' : i % 23 === 0 ? 'archive' : 'actif';
  return {
    id: `AG-${pad(i)}`,
    nom: fullName(i, 5),
    telephone: phone('76', i),
    cni: cni(i + 200),
    numeroCarte: numeroCarte(i, '6304'),
    nif: nif(i + 300),
    rccm: rccm(i + 90, 'GTG'),
    documentAcceptation: `acceptation_agent_${pad(i)}.pdf`,
    superAgentId: sa.id,
    superAgentNom: sa.nom.split(' (')[0]!,
    ...adresse(i, 4),
    statut,
    soldeEMoney: 50_000 + ((i * 34_567) % 2_000_000),
    soldeCash: 20_000 + ((i * 18_923) % 800_000),
    limiteJournaliere: 500_000 + (i % 5) * 250_000,
    performance: 40 + (i * 17) % 60,
    commissionsMois: 15_000 + ((i * 4231) % 250_000),
    dateCreation: formatDate(150 + i * 6)
  };
});

// ---------- Clients (30) ----------
export const CLIENTS: ClientUser[] = Array.from({ length: 30 }, (_, idx) => {
  const i = idx + 1;
  const statut: Statut = i % 8 === 0 ? 'suspendu' : i % 19 === 0 ? 'archive' : 'actif';
  const kyc = (1 + (i % 3)) as 1 | 2 | 3;
  const agent = AGENTS[i % AGENTS.length]!;
  return {
    id: `CL-${pad(i)}`,
    nom: fullName(i, 9),
    telephone: phone('62', i),
    email: `client${pad(i)}@iblopay.bi`,
    cni: cni(i),
    numeroCarte: numeroCarte(i, '6521'),
    agentId: agent.id,
    agentNom: agent.nom,
    ...adresse(i, 7),
    statut,
    kycLevel: kyc,
    soldeWallet: (i * 12_345) % 500_000,
    nbCartes: i % 4,
    nbBeneficiaires: 1 + (i % 6),
    dateCreation: formatDate(30 + i * 4),
    derniereConnexion: formatDate(i % 15)
  };
});

// ---------- Administrateurs (10) ----------
export const ADMINS: AdminUser[] = Array.from({ length: 10 }, (_, idx) => {
  const i = idx + 1;
  const statut: StatutAdmin = i % 6 === 0 ? 'desactive' : 'actif';
  return {
    id: `AD-${pad(i)}`,
    nom: fullName(i, 15),
    email: `admin${pad(i)}@iblopay.bi`,
    role: pick(ADMIN_ROLES, i),
    statut,
    doubleAuth: i % 3 !== 0,
    derniereConnexion: formatDate(i % 10)
  };
});