// ============================================================
// MODÈLES — IBLOPAY PROVIDERS
// Reflète le schéma : services / formulaires dynamiques /
// soumissions / réponses / workflow / statistiques
// ============================================================

export interface ServiceInstitution {
  id: number;
  nom: string;
  code: string;
  description: string;
  categorie: string;
  sousCategorie?: string;
  prix?: number;
  devise: string;
  documentsRequis: string[];
  statut: 'ACTIF' | 'INACTIF' | 'BROUILLON';
  formulaireId?: number;
  workflowId?: number;
  dateCreation: Date;
  demandesRecues?: number;
  demandesTraitees?: number;
}

// ─── FORM BUILDER ─────────────────────────────────────────

export type TypeChamp =
  | 'TEXTE' | 'NOMBRE' | 'DATE' | 'EMAIL' | 'TELEPHONE'
  | 'SELECT' | 'CHECKBOX' | 'FICHIER' | 'ADRESSE';

export interface FormulaireChamp {
  id: string;
  typeChamp: TypeChamp;
  label: string;
  code: string;
  obligatoire: boolean;
  ordre: number;
  configuration?: {
    placeholder?: string;
    options?: string[];       // pour SELECT
    formatsAcceptes?: string[]; // pour FICHIER
    aide?: string;
  };
}

export interface Formulaire {
  id: number;
  institutionId: number;
  serviceId: number;
  nom: string;
  code: string;
  version: number;
  statut: 'BROUILLON' | 'PUBLIE' | 'ARCHIVE';
  champs: FormulaireChamp[];
  createdAt: Date;
  description?: string;
  configuration?: {
    nbColonnes?: number;
  };
}

// ─── SOUMISSIONS / DEMANDES ────────────────────────────────

export type StatutSoumission =
  | 'SOUMIS' | 'PAIEMENT_EN_ATTENTE' | 'RECU' | 'EN_VERIFICATION'
  | 'EN_VALIDATION' | 'EN_TRAITEMENT' | 'APPROUVE' | 'REJETE' | 'TERMINE';

export interface ReponseFormulaire {
  label: string;
  valeur: string;
  type?: 'TEXTE' | 'FICHIER';
  nomFichier?: string;
  apercuUrl?: string; // URL d'aperçu (image) du document joint
}

export interface SoumissionFormulaire {
  id: number;
  numeroReference: string;
  formulaireId: number;
  serviceId: number;
  serviceNom: string;
  utilisateurNom: string;
  utilisateurTelephone: string;
  statut: StatutSoumission;
  etapeActuelle: string;
  dateSoumission: Date;
  dateMaj: Date;
  montant: number;
  montantPaye: boolean;
  reponses: ReponseFormulaire[];
}

// ─── WORKFLOW ───────────────────────────────────────────────

export interface WorkflowEtape {
  id: string;
  nom: string;
  code: string;
  ordre: number;
  responsable: string;
  delaiHeures: number;
  actions: string[];
  notifications: boolean;
}

export interface Workflow {
  id: number;
  serviceId: number;
  nom: string;
  statut: 'ACTIF' | 'INACTIF';
  etapes: WorkflowEtape[];
}

// ─── STATISTIQUES ────────────────────────────────────────────

export interface RendementGlobal {
  demandesRecues: number;
  demandesTraitees: number;
  enAttente: number;
  rejetees: number;
  tempsMoyenTraitementJours: number;
  tauxTraitement: number;
  revenusGeneres: number;
}

export interface RendementParService {
  serviceId: number;
  serviceNom: string;
  demandes: number;
  traitees: number;
  enAttente: number;
  tempsMoyenJours: number;
}

// ─── INDICATEURS PERSONNALISÉS PAR SERVICE ───────────────────
// Ex: pour un service de transport -> bus actifs, trajets, revenus...

export interface IndicateurKpi {
  label: string;
  valeur: string;
  icon: string;
  couleur: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'cyan';
}

export interface RepartitionItem {
  label: string;
  valeur: number;
  couleur: string;
}

export interface ServiceIndicateurs {
  serviceId: number;
  categorieService: 'TRANSPORT' | 'CERTIFICATS' | 'GENERIQUE';
  kpis: IndicateurKpi[];
  repartition: RepartitionItem[]; // alimente le diagramme camembert
  repartitionTitre: string;
}
