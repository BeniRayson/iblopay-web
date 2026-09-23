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
}
export interface Workflow {
    id: number;
    serviceId: number;
    nom: string;
    statut: 'ACTIF' | 'INACTIF';
    etapes: WorkflowEtape[];
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