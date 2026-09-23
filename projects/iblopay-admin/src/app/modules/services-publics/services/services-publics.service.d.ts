import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicePublic, Utilisateur, Categorie, TypeRNF, SousTypeRNF, PaiementRNF } from '../models/service-public.model';
export declare class ServicesPublicsService {
    private http;
    private readonly apiUrl;
    constructor(http: HttpClient);
    /**
     * Récupère la liste complète des services publics
     */
    getAll(): Observable<ServicePublic[]>;
    /**
     * Récupère un service public par son ID
     * @param id - ID du service
     */
    getById(id: number): Observable<ServicePublic | undefined>;
    /**
     * Met à jour un service public
     * @param service - Service à mettre à jour
     */
    update(service: ServicePublic): Observable<ServicePublic>;
    /**
     * Crée un nouveau service public
     * @param service - Service à créer
     */
    create(service: ServicePublic): Observable<ServicePublic>;
    /**
     * Supprime un service public
     * @param id - ID du service à supprimer
     */
    delete(id: number): Observable<void>;
    /**
     * Récupère toutes les catégories d'un service
     * @param serviceId - ID du service
     */
    getCategories(serviceId: number): Observable<Categorie[]>;
    /**
     * Récupère une catégorie par son ID
     * @param serviceId - ID du service
     * @param categorieId - ID de la catégorie
     */
    getCategorieById(serviceId: number, categorieId: number): Observable<Categorie | undefined>;
    /**
     * Crée une nouvelle catégorie
     * @param serviceId - ID du service
     * @param categorie - Catégorie à créer
     */
    createCategorie(serviceId: number, categorie: Categorie): Observable<Categorie>;
    /**
     * Met à jour une catégorie
     * @param serviceId - ID du service
     * @param categorie - Catégorie à mettre à jour
     */
    updateCategorie(serviceId: number, categorie: Categorie): Observable<Categorie>;
    /**
     * Supprime une catégorie
     * @param serviceId - ID du service
     * @param categorieId - ID de la catégorie à supprimer
     */
    deleteCategorie(serviceId: number, categorieId: number): Observable<void>;
    /**
     * Récupère tous les types RNF d'un service
     * @param serviceId - ID du service
     */
    getTypesRNF(serviceId: number): Observable<TypeRNF[]>;
    /**
     * Récupère un type RNF par son ID
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF
     */
    getTypeRNFById(serviceId: number, typeRNFId: number): Observable<TypeRNF | undefined>;
    /**
     * Crée un nouveau type RNF
     * @param serviceId - ID du service
     * @param typeRNF - Type RNF à créer
     */
    createTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF>;
    /**
     * Met à jour un type RNF
     * @param serviceId - ID du service
     * @param typeRNF - Type RNF à mettre à jour
     */
    updateTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF>;
    /**
     * Supprime un type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF à supprimer
     */
    deleteTypeRNF(serviceId: number, typeRNFId: number): Observable<void>;
    /**
     * Récupère tous les sous-types d'un type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF
     */
    getSousTypesRNF(serviceId: number, typeRNFId: number): Observable<SousTypeRNF[]>;
    /**
     * Crée un nouveau sous-type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF parent
     * @param sousType - Sous-type à créer
     */
    createSousTypeRNF(serviceId: number, typeRNFId: number, sousType: SousTypeRNF): Observable<SousTypeRNF>;
    /**
     * Met à jour un sous-type RNF
     * @param serviceId - ID du service
     * @param sousType - Sous-type à mettre à jour
     */
    updateSousTypeRNF(serviceId: number, sousType: SousTypeRNF): Observable<SousTypeRNF>;
    /**
     * Supprime un sous-type RNF
     * @param serviceId - ID du service
     * @param sousTypeId - ID du sous-type à supprimer
     */
    deleteSousTypeRNF(serviceId: number, sousTypeId: number): Observable<void>;
    /**
     * Récupère tous les paiements RNF d'un service
     * @param serviceId - ID du service
     */
    getPaiementsRNF(serviceId: number): Observable<PaiementRNF[]>;
    /**
     * Récupère un paiement RNF par son ID
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement
     */
    getPaiementRNFById(serviceId: number, paiementId: number): Observable<PaiementRNF | undefined>;
    /**
     * Crée un nouveau paiement RNF
     * @param serviceId - ID du service
     * @param paiement - Paiement à créer
     */
    createPaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF>;
    /**
     * Met à jour un paiement RNF
     * @param serviceId - ID du service
     * @param paiement - Paiement à mettre à jour
     */
    updatePaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF>;
    /**
     * Supprime un paiement RNF
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à supprimer
     */
    deletePaiementRNF(serviceId: number, paiementId: number): Observable<void>;
    /**
     * Valide un paiement RNF (change le statut à PAYE)
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à valider
     */
    validerPaiementRNF(serviceId: number, paiementId: number): Observable<PaiementRNF>;
    /**
     * Annule un paiement RNF (change le statut à ANNULE)
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à annuler
     */
    annulerPaiementRNF(serviceId: number, paiementId: number): Observable<PaiementRNF>;
    /**
     * Récupère tous les utilisateurs d'un service
     * @param serviceId - ID du service
     */
    getUtilisateurs(serviceId: number): Observable<Utilisateur[]>;
    /**
     * Récupère un utilisateur par son ID
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur
     */
    getUtilisateurById(serviceId: number, utilisateurId: number): Observable<Utilisateur | undefined>;
    /**
     * Crée un nouvel utilisateur
     * @param serviceId - ID du service
     * @param utilisateur - Utilisateur à créer
     */
    createUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur>;
    /**
     * Met à jour un utilisateur
     * @param serviceId - ID du service
     * @param utilisateur - Utilisateur à mettre à jour
     */
    updateUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur>;
    /**
     * Supprime un utilisateur
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur à supprimer
     */
    deleteUtilisateur(serviceId: number, utilisateurId: number): Observable<void>;
    /**
     * Change le statut d'un utilisateur
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur
     * @param statut - Nouveau statut
     */
    changerStatutUtilisateur(serviceId: number, utilisateurId: number, statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU'): Observable<Utilisateur>;
}
//# sourceMappingURL=services-publics.service.d.ts.map