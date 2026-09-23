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
/** Province -> Communes -> Zones -> Collines/Quartiers (échantillon représentatif) */
export declare const DECOUPAGE: Record<string, Record<string, Record<string, string[]>>>;
export declare const PROVINCE_NAMES: string[];
export declare function communesOf(province: string): string[];
export declare function zonesOf(province: string, commune: string): string[];
export declare function collinesOf(province: string, commune: string, zone: string): string[];
export declare const SUPER_AGENTS: SuperAgentUser[];
export declare const AGENTS: AgentUser[];
export declare const CLIENTS: ClientUser[];
export declare const ADMINS: AdminUser[];
//# sourceMappingURL=users-mock-data.d.ts.map