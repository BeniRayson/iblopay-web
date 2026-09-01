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
  /** Type de formulaire : DYNAMIQUE (champs classiques) ou DOCUMENT (texte libre façon lettre/Word). */
  typeFormulaire?: 'DYNAMIQUE' | 'DOCUMENT';
  /** Contenu HTML du document, utilisé uniquement quand typeFormulaire === 'DOCUMENT'. */
  contenuDocument?: string;
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
  /** Description libre de ce que cette étape / ce rôle doit valider ou vérifier. */
  ceQuIlValide?: string;
  /** Identifiants des comptes (CompteUtilisateur) rattachés à cette étape du workflow. */
  comptesAssignesIds?: number[];
}

export interface Workflow {
  id: number;
  serviceId: number;
  nom: string;
  description?: string;
  statut: 'ACTIF' | 'INACTIF';
  etapes: WorkflowEtape[];
  dateCreation?: Date;
}

// ─── COMPTES UTILISATEURS INTERNES (STAFF DU WORKFLOW) ───────
// Comptes créés par l'admin pour chaque étape d'un workflow :
// secrétaire, agent de vérification, validateur, caissier, etc.
// Chaque compte se connecte et ne voit que ce que ses droits autorisent.

/** Catalogue des droits/permissions qu'un compte peut se voir attribuer sur une étape. */
export type DroitWorkflow =
  | 'VOIR_DEMANDE'        // Consulter les demandes arrivées à son étape
  | 'VOIR_DOCUMENTS'      // Voir les pièces jointes / documents soumis
  | 'VALIDER'             // Valider / approuver et faire avancer l'étape
  | 'REJETER'             // Rejeter une demande
  | 'MODIFIER_INFOS'      // Modifier les informations d'une demande
  | 'ENCAISSER_PAIEMENT'  // Confirmer / encaisser un paiement
  | 'VOIR_STATISTIQUES';  // Consulter les statistiques liées au service

export interface CompteUtilisateur {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email?: string;
  /** Intitulé du poste / rôle dans le workflow (ex: Secrétaire, Agent de vérification...). */
  role: string;
  /** Identifiant de connexion généré automatiquement (ex: prenom.nom). */
  identifiantConnexion: string;
  /** Mot de passe défini par l'admin à la création du compte (utilisé pour la connexion). */
  motDePasse: string;
  statut: 'ACTIF' | 'INACTIF';
  workflowId: number;
  serviceId: number;
  /** Étape du workflow à laquelle ce compte est rattaché. */
  etapeId: string;
  etapeNom?: string;
  /** Droits accordés à ce compte : détermine ce qu'il voit/valide une fois connecté. */
  droits: DroitWorkflow[];
  dateCreation: Date;
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
