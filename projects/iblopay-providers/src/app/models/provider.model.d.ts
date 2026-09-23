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
export type TypeChamp = 'TEXTE' | 'NOMBRE' | 'DATE' | 'EMAIL' | 'TELEPHONE' | 'SELECT' | 'CHECKBOX' | 'FICHIER' | 'ADRESSE';
export interface FormulaireChamp {
    id: string;
    typeChamp: TypeChamp;
    label: string;
    code: string;
    obligatoire: boolean;
    ordre: number;
    configuration?: {
        placeholder?: string;
        options?: string[];
        formatsAcceptes?: string[];
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
export type StatutSoumission = 'SOUMIS' | 'PAIEMENT_EN_ATTENTE' | 'RECU' | 'EN_VERIFICATION' | 'EN_VALIDATION' | 'EN_TRAITEMENT' | 'APPROUVE' | 'REJETE' | 'TERMINE';
export interface ReponseFormulaire {
    label: string;
    valeur: string;
    type?: 'TEXTE' | 'FICHIER';
    nomFichier?: string;
    apercuUrl?: string;
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
/** Catalogue des droits/permissions qu'un compte peut se voir attribuer sur une étape. */
export type DroitWorkflow = 'VOIR_DEMANDE' | 'VOIR_DOCUMENTS' | 'VALIDER' | 'REJETER' | 'MODIFIER_INFOS' | 'ENCAISSER_PAIEMENT' | 'VOIR_STATISTIQUES';
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
    repartition: RepartitionItem[];
    repartitionTitre: string;
}
//# sourceMappingURL=provider.model.d.ts.map