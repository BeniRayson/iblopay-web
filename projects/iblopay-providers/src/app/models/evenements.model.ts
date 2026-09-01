// ============================================================
// MODÈLES — MODULE ÉVÉNEMENTS (MATCHS, CONCERTS, CONFÉRENCES...)
// Événements, lieux, organisateurs, billetterie en temps réel,
// statistiques événements enrichies.
// ============================================================

export type TypeEvenement = 'MATCH' | 'CONCERT' | 'CONFERENCE' | 'FESTIVAL' | 'AUTRE';
export type StatutEvenement = 'PROGRAMME' | 'EN_COURS' | 'TERMINE' | 'ANNULE';
export type TypeLieu = string;

export interface Lieu {
  id: number;
  nom: string;
  ville: string;
  adresse: string;
  type: TypeLieu;
  capaciteMax: number;
  statut: 'ACTIF' | 'INACTIF';
}

export interface Organisateur {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  entreprise?: string;
  email?: string;
  statut: 'ACTIF' | 'INACTIF';
  nombreEvenements?: number;
  revenuTotal?: number;
  dateInscription: Date;
}

export interface CategorieBillet {
  nom: string;
  prix: number;
  quantiteDisponible: number;
  quantiteVendue: number;
}

export interface Evenement {
  id: number;
  nom: string;
  type: TypeEvenement;
  lieuId: number;
  organisateurId: number;
  dateDebut: Date;
  dateFin: Date;
  description?: string;
  capaciteTotale: number;
  categoriesBillets: CategorieBillet[];
  statut: StatutEvenement;
  dateCreation: Date;
  /** Nom du fichier/photo joint (affiche, flyer, document officiel...). */
  pieceJointeNom?: string;
  /** Contenu du fichier encodé en base64 (data URL), stocké localement pour l'aperçu/téléchargement. */
  pieceJointeDataUrl?: string;
}

export type StatutBillet = 'RESERVE' | 'PAYE' | 'UTILISE' | 'ANNULE';

export interface Billet {
  id: number;
  numeroReference: string;
  evenementId: number;
  categorieNom: string;
  clientNom: string;
  clientTelephone: string;
  prix: number;
  statut: StatutBillet;
  dateAchat: Date;
  dateUtilisation?: Date;
}

/** Vente/entrée historique (pour l'historique par événement + rapports). */
export interface VenteHistorique {
  id: number;
  evenementId: number;
  categorieNom: string;
  date: Date;
  quantite: number;
  revenu: number;
  statut: 'VALIDE' | 'ANNULE';
}

// ─── STATISTIQUES ÉVÉNEMENTS ───────────────────────────────

export interface StatsEvenementsGlobal {
  totalEvenements: number;
  evenementsActifs: number;
  totalOrganisateurs: number;
  billetsVendusAujourdhui: number;
  revenuAujourdhui: number;
  tauxRemplissageMoyen: number; // %
  reclamationsOuvertes: number;
}

export interface StatsParEvenement {
  id: number;
  nom: string;
  type: TypeEvenement;
  billetsVendus: number;
  revenu: number;
  tauxRemplissage: number;
}

export interface ReclamationEvenement {
  id: number;
  evenementId: number;
  type: 'BILLET_INVALIDE' | 'PROBLEME_ACCES' | 'RETARD' | 'RECLAMATION';
  description: string;
  statut: 'OUVERT' | 'EN_COURS' | 'RESOLU';
  dateSignalement: Date;
}
