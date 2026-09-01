// ============================================================
// MODÈLE SERVICE PUBLIC
// ============================================================

export interface ServicePublic {
    id: number;
    numero: number;
    abreviation: string;
    description: string;
    type: 'INTERNE' | 'EXTERNE';
    actif: boolean;
    dateCreation: Date;
    version: string;
    responsable: string;
    email: string;
    telephone: string;
    siteWeb: string;
    utilisateurs?: Utilisateur[];
    categories?: Categorie[];
    typesRNF?: TypeRNF[];
    paiements?: PaiementRNF[];
    institutions?: Institution[];
    statistiques?: Statistiques;
}

// ============================================================
// CATÉGORIES DE SERVICES
// ============================================================
export interface Categorie {
    id: number;
    nom: string;
    code: string;
    description: string;
    type: 'RNF' | 'FISCALE' | 'AUTRE';
    actif: boolean;
    dateCreation: Date;
    dateModification?: Date;
    serviceId: number;
    frais?: Frais[];
    documentsRequis?: DocumentRequis[];
    statistiques?: CategorieStatistiques;
}

export interface Frais {
    id: number;
    nom: string;
    description: string;
    montant: number;
    devise: string;
    type: 'FIXE' | 'PERCENTAGE' | 'FORFAITAIRE';
    frequence: 'MENSUEL' | 'TRIMESTRIEL' | 'ANNUEL' | 'PONCTUEL';
    actif: boolean;
    dateCreation: Date;
    dateModification?: Date;
    categorieId: number;
    montantMin?: number;
    montantMax?: number;
    pourcentage?: number;
    compteNumero?: string;
    compteLibelle?: string;
}

export interface DocumentRequis {
    id: number;
    nom: string;
    description: string;
    type: 'FORMULAIRE' | 'CERTIFICAT' | 'ATTRESTATION' | 'AUTRE';
    obligatoire: boolean;
    format: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE' | 'AUTRE';
    dateCreation: Date;
    dateModification?: Date;
    categorieId: number;
    version?: string;
    modele?: string;
}

export interface CategorieStatistiques {
    totalFrais: number;
    totalDocuments: number;
    totalOperations: number;
    montantTotal: number;
    dernierMois: {
        operations: number;
        montant: number;
    };
}

// ============================================================
// TYPES DE RNF (Basé sur le fichier Excel)
// ============================================================
export interface TypeRNF {
    id: number;
    numero: number;
    libelle: string;
    description: string;
    typePaiement: 'A' | 'B' | 'C' | 'D';
    categorie: string;
    institution: string;
    actif: boolean;
    dateCreation: Date;
    dateModification?: Date;
    serviceId: number;
    sousTypes?: SousTypeRNF[];
    statistiques?: TypeRNFStatistiques;
}

export interface SousTypeRNF {
    id: number;
    nom: string;
    description: string;
    typeRNFId: number;
    actif: boolean;
    dateCreation: Date;
    dateModification?: Date;
    montantEstime?: number;
    frequence?: 'MENSUEL' | 'TRIMESTRIEL' | 'ANNUEL' | 'PONCTUEL';
    compteNumero?: string;
    compteLibelle?: string;
    baseCalcul?: string;
    taux?: number;
}

export interface TypeRNFStatistiques {
    totalSousTypes: number;
    totalPaiements: number;
    montantTotalPaiements: number;
    dernierMois: {
        paiements: number;
        montant: number;
    };
}

// ============================================================
// PAIEMENTS DES RNF
// ============================================================
export interface PaiementRNF {
    id: number;
    reference: string;
    typeRNFId: number;
    sousTypeRNFId?: number;
    montant: number;
    devise: string;
    statut: 'PAYE' | 'EN_ATTENTE' | 'ANNULE' | 'PARTIEL';
    datePaiement: Date;
    dateEcheance: Date;
    dateValidation?: Date;
    description: string;
    utilisateurId?: number;
    utilisateurNom?: string;
    serviceId: number;
    compteDestinataire: string;
    modePaiement: 'VIREMENT' | 'ESPECES' | 'CHEQUE' | 'MOBILE';
    referencePaiement?: string;
    observations?: string;
    institutionId?: number;
    categorieId?: number;
}

// ============================================================
// INSTITUTIONS
// ============================================================
export interface Institution {
    id: number;
    nom: string;
    code: string;
    description: string;
    type: 'ARCT' | 'OBM' | 'OBPE' | 'OBUHA' | 'ARCA' | 'MINEDUC' | 'MININTER' | 'MINJUST' | 'MINREX' | 'ABREMA' | 'OHP' | 'LONA' | 'OTRACO' | 'AUTRE';
    actif: boolean;
    dateCreation: Date;
    dateModification?: Date;
    serviceId: number;
    contact?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
    statistiques?: InstitutionStatistiques;
}

export interface InstitutionStatistiques {
    totalTypesRNF: number;
    totalPaiements: number;
    montantTotalPaiements: number;
}

// ============================================================
// UTILISATEURS DU SERVICE
// ============================================================
export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: 'ADMIN' | 'AGENT' | 'CLIENT' | 'SUPERVISEUR';
    statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
    dateInscription: Date;
    dernierAcces: Date;
    serviceId: number;
}

// ============================================================
// STATISTIQUES
// ============================================================
export interface Statistiques {
    totalUtilisateurs: number;
    utilisateursActifs: number;
    totalTypesRNF: number;
    totalSousTypes: number;
    totalPaiements: number;
    montantTotalPaiements: number;
    totalCategories: number;
    totalInstitutions: number;
    dernierMois: StatistiquesMensuelles;
}

export interface StatistiquesMensuelles {
    mois: string;
    paiements: number;
    montant: number;
    utilisateurs: number;
    nouveauxTypes: number;
}

// ============================================================
// ACTIVITÉS
// ============================================================
export interface Activite {
    id: number;
    type: 'paiement' | 'utilisateur' | 'categorie' | 'type-rnf' | 'system';
    title: string;
    user: string;
    date: Date;
    details?: string;
}