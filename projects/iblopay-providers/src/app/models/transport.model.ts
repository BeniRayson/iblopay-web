// ============================================================
// MODÈLES — MODULE TRANSPORT (BUS & TAXIS)
// Flotte, chauffeurs, lignes/zones, courses en temps réel,
// statistiques transport enrichies.
// ============================================================

export type TypeVehicule = 'BUS' | 'TAXI';
export type TypeMotorisation = 'ESSENCE' | 'DIESEL' | 'ELECTRIQUE' | 'HYBRIDE';

export type StatutVehiculeBus = 'EN_SERVICE' | 'AU_DEPOT' | 'EN_PANNE' | 'EN_MAINTENANCE';
export type StatutVehiculeTaxi = 'DISPONIBLE' | 'EN_COURSE' | 'HORS_SERVICE' | 'EN_MAINTENANCE';
export type StatutVehicule = StatutVehiculeBus | StatutVehiculeTaxi;

export interface Vehicule {
  id: number;
  type: TypeVehicule;
  matricule: string;
  marqueModele: string;
  /** Nombre de places assises — pertinent surtout pour les bus. */
  capacite?: number;
  statut: StatutVehicule;
  chauffeurId?: number;
  /** Pour un bus : la ligne sur laquelle il circule. */
  ligneId?: number;
  /** Pour un taxi : sa zone de service par défaut. */
  zoneId?: number;
  kilometrage: number;
  motorisation: TypeMotorisation;
  /** Consommation moyenne pour 100 km : litres (essence/diesel/hybride) ou kWh (électrique). */
  consommationMoyenne100km: number;
  dateDerniereMaintenance?: Date;
  prochaineMaintenanceKm?: number;
  dateMiseEnService: Date;
}

export interface Chauffeur {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  numeroPermis: string;
  permisValidite: Date;
  vehiculeId?: number;
  statut: 'ACTIF' | 'INACTIF';
  note?: number; // note moyenne /5 donnée par les passagers
  nombreCourses?: number;
  revenuTotal?: number; // revenu total généré (BIF), cumulé
  dateEmbauche: Date;
}

export interface LigneBus {
  id: number;
  nom: string;
  code: string;
  arrets: string[];
  tarif: number;
  distanceKm: number;
  dureeMinutesEstimee: number;
  frequenceMinutes: number;
  statut: 'ACTIVE' | 'INACTIVE';
}

export type TarificationTaxi = 'COMPTEUR' | 'FORFAIT';

export interface ZoneTaxi {
  id: number;
  nom: string;
  tarification: TarificationTaxi;
  tarifBase: number;
  tarifParKm?: number;
  forfaitMoyen?: number;
  statut: 'ACTIVE' | 'INACTIVE';
}

export type StatutCourse = 'DEMANDE' | 'ACCEPTEE' | 'EN_COURS' | 'TERMINEE' | 'ANNULEE';

export interface Course {
  id: number;
  numeroReference: string;
  type: TypeVehicule;
  clientNom: string;
  clientTelephone: string;
  vehiculeId?: number;
  chauffeurId?: number;
  /** Pour un bus : la ligne empruntée. */
  ligneId?: number;
  /** Pour un bus : nom de la ligne. Pour un taxi : adresse de départ. */
  depart: string;
  /** Pour un bus : arrêt de descente. Pour un taxi : adresse d'arrivée. */
  destination: string;
  distanceKm: number;
  prix: number;
  statut: StatutCourse;
  progression: number; // 0-100, pour la simulation de suivi en temps réel
  dateDemande: Date;
  dateDebut?: Date;
  dateFin?: Date;
}

/** Trajet historique terminé — sert à l'historique par ligne/véhicule et aux rapports. */
export interface TrajetHistorique {
  id: number;
  ligneId?: number;
  zoneId?: number;
  type: TypeVehicule;
  vehiculeId: number;
  chauffeurId: number;
  date: Date;
  dureeMinutes: number;
  passagers: number;
  revenu: number;
  statut: 'TERMINE' | 'ANNULE';
}

export interface IncidentTransport {
  id: number;
  vehiculeId: number;
  type: 'PANNE' | 'ACCIDENT' | 'RETARD' | 'RECLAMATION';
  description: string;
  statut: 'OUVERT' | 'EN_COURS' | 'RESOLU';
  dateSignalement: Date;
}

// ─── STATISTIQUES TRANSPORT ────────────────────────────────

export interface StatsTransportGlobal {
  totalVehicules: number;
  vehiculesActifs: number;
  totalChauffeurs: number;
  coursesAujourdhui: number;
  revenuAujourdhui: number;
  distanceTotaleKm: number;
  tauxOccupationMoyen: number; // %
  incidentsOuverts: number;
}

export interface StatsParLigneOuZone {
  id: number;
  nom: string;
  type: TypeVehicule;
  courses: number;
  revenu: number;
  tauxOccupation: number;
}
