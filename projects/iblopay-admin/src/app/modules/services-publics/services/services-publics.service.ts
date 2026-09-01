import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    ServicePublic,
    Utilisateur,
    Categorie,
    TypeRNF,
    SousTypeRNF,
    PaiementRNF
} from '../models/service-public.model';
import { SERVICES_PUBLICS_MOCK_COMPLETE } from '../data/services-publics.mock';

@Injectable({
    providedIn: 'root'
})
export class ServicesPublicsService {

    private readonly apiUrl = '/api/services-publics';

    constructor(private http: HttpClient) { }

    // ============================================================
    // SERVICES PUBLICS
    // ============================================================

    /**
     * Récupère la liste complète des services publics
     */
    getAll(): Observable<ServicePublic[]> {
        return of(SERVICES_PUBLICS_MOCK_COMPLETE);
    }

    /**
     * Récupère un service public par son ID
     * @param id - ID du service
     */
    getById(id: number): Observable<ServicePublic | undefined> {
        return this.getAll().pipe(
            map(services => services.find(s => s.id === id))
        );
    }

    /**
     * Met à jour un service public
     * @param service - Service à mettre à jour
     */
    update(service: ServicePublic): Observable<ServicePublic> {
        // Simulation d'une mise à jour
        return of(service);
    }

    /**
     * Crée un nouveau service public
     * @param service - Service à créer
     */
    create(service: ServicePublic): Observable<ServicePublic> {
        return of({ ...service, id: Date.now() });
    }

    /**
     * Supprime un service public
     * @param id - ID du service à supprimer
     */
    delete(id: number): Observable<void> {
        return of(void 0);
    }

    // ============================================================
    // CATÉGORIES
    // ============================================================

    /**
     * Récupère toutes les catégories d'un service
     * @param serviceId - ID du service
     */
    getCategories(serviceId: number): Observable<Categorie[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.categories || [])
        );
    }

    /**
     * Récupère une catégorie par son ID
     * @param serviceId - ID du service
     * @param categorieId - ID de la catégorie
     */
    getCategorieById(serviceId: number, categorieId: number): Observable<Categorie | undefined> {
        return this.getCategories(serviceId).pipe(
            map(categories => categories.find(c => c.id === categorieId))
        );
    }

    /**
     * Crée une nouvelle catégorie
     * @param serviceId - ID du service
     * @param categorie - Catégorie à créer
     */
    createCategorie(serviceId: number, categorie: Categorie): Observable<Categorie> {
        return of({ ...categorie, id: Date.now(), serviceId: serviceId });
    }

    /**
     * Met à jour une catégorie
     * @param serviceId - ID du service
     * @param categorie - Catégorie à mettre à jour
     */
    updateCategorie(serviceId: number, categorie: Categorie): Observable<Categorie> {
        return of({ ...categorie, dateModification: new Date() });
    }

    /**
     * Supprime une catégorie
     * @param serviceId - ID du service
     * @param categorieId - ID de la catégorie à supprimer
     */
    deleteCategorie(serviceId: number, categorieId: number): Observable<void> {
        return of(void 0);
    }

    // ============================================================
    // TYPES RNF
    // ============================================================

    /**
     * Récupère tous les types RNF d'un service
     * @param serviceId - ID du service
     */
    getTypesRNF(serviceId: number): Observable<TypeRNF[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.typesRNF || [])
        );
    }

    /**
     * Récupère un type RNF par son ID
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF
     */
    getTypeRNFById(serviceId: number, typeRNFId: number): Observable<TypeRNF | undefined> {
        return this.getTypesRNF(serviceId).pipe(
            map(types => types.find(t => t.id === typeRNFId))
        );
    }

    /**
     * Crée un nouveau type RNF
     * @param serviceId - ID du service
     * @param typeRNF - Type RNF à créer
     */
    createTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF> {
        return of({ ...typeRNF, id: Date.now(), serviceId: serviceId });
    }

    /**
     * Met à jour un type RNF
     * @param serviceId - ID du service
     * @param typeRNF - Type RNF à mettre à jour
     */
    updateTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF> {
        return of(typeRNF);
    }

    /**
     * Supprime un type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF à supprimer
     */
    deleteTypeRNF(serviceId: number, typeRNFId: number): Observable<void> {
        return of(void 0);
    }

    // ============================================================
    // SOUS-TYPES RNF
    // ============================================================

    /**
     * Récupère tous les sous-types d'un type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF
     */
    getSousTypesRNF(serviceId: number, typeRNFId: number): Observable<SousTypeRNF[]> {
        return this.getTypeRNFById(serviceId, typeRNFId).pipe(
            map(type => type?.sousTypes || [])
        );
    }

    /**
     * Crée un nouveau sous-type RNF
     * @param serviceId - ID du service
     * @param typeRNFId - ID du type RNF parent
     * @param sousType - Sous-type à créer
     */
    createSousTypeRNF(serviceId: number, typeRNFId: number, sousType: SousTypeRNF): Observable<SousTypeRNF> {
        return of({ ...sousType, id: Date.now(), typeRNFId: typeRNFId });
    }

    /**
     * Met à jour un sous-type RNF
     * @param serviceId - ID du service
     * @param sousType - Sous-type à mettre à jour
     */
    updateSousTypeRNF(serviceId: number, sousType: SousTypeRNF): Observable<SousTypeRNF> {
        return of(sousType);
    }

    /**
     * Supprime un sous-type RNF
     * @param serviceId - ID du service
     * @param sousTypeId - ID du sous-type à supprimer
     */
    deleteSousTypeRNF(serviceId: number, sousTypeId: number): Observable<void> {
        return of(void 0);
    }

    // ============================================================
    // PAIEMENTS RNF
    // ============================================================

    /**
     * Récupère tous les paiements RNF d'un service
     * @param serviceId - ID du service
     */
    getPaiementsRNF(serviceId: number): Observable<PaiementRNF[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.paiements || [])
        );
    }

    /**
     * Récupère un paiement RNF par son ID
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement
     */
    getPaiementRNFById(serviceId: number, paiementId: number): Observable<PaiementRNF | undefined> {
        return this.getPaiementsRNF(serviceId).pipe(
            map(paiements => paiements.find(p => p.id === paiementId))
        );
    }

    /**
     * Crée un nouveau paiement RNF
     * @param serviceId - ID du service
     * @param paiement - Paiement à créer
     */
    createPaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF> {
        return of({ ...paiement, id: Date.now(), serviceId: serviceId });
    }

    /**
     * Met à jour un paiement RNF
     * @param serviceId - ID du service
     * @param paiement - Paiement à mettre à jour
     */
    updatePaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF> {
        return of(paiement);
    }

    /**
     * Supprime un paiement RNF
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à supprimer
     */
    deletePaiementRNF(serviceId: number, paiementId: number): Observable<void> {
        return of(void 0);
    }

    /**
     * Valide un paiement RNF (change le statut à PAYE)
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à valider
     */
    validerPaiementRNF(serviceId: number, paiementId: number): Observable<PaiementRNF> {
        return this.getPaiementRNFById(serviceId, paiementId).pipe(
            map(paiement => {
                if (paiement) {
                    return { ...paiement, statut: 'PAYE' as const };
                }
                throw new Error('Paiement non trouvé');
            })
        );
    }

    /**
     * Annule un paiement RNF (change le statut à ANNULE)
     * @param serviceId - ID du service
     * @param paiementId - ID du paiement à annuler
     */
    annulerPaiementRNF(serviceId: number, paiementId: number): Observable<PaiementRNF> {
        return this.getPaiementRNFById(serviceId, paiementId).pipe(
            map(paiement => {
                if (paiement) {
                    return { ...paiement, statut: 'ANNULE' as const };
                }
                throw new Error('Paiement non trouvé');
            })
        );
    }

    // ============================================================
    // UTILISATEURS
    // ============================================================

    /**
     * Récupère tous les utilisateurs d'un service
     * @param serviceId - ID du service
     */
    getUtilisateurs(serviceId: number): Observable<Utilisateur[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.utilisateurs || [])
        );
    }

    /**
     * Récupère un utilisateur par son ID
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur
     */
    getUtilisateurById(serviceId: number, utilisateurId: number): Observable<Utilisateur | undefined> {
        return this.getUtilisateurs(serviceId).pipe(
            map(utilisateurs => utilisateurs.find(u => u.id === utilisateurId))
        );
    }

    /**
     * Crée un nouvel utilisateur
     * @param serviceId - ID du service
     * @param utilisateur - Utilisateur à créer
     */
    createUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return of({ ...utilisateur, id: Date.now(), serviceId: serviceId });
    }

    /**
     * Met à jour un utilisateur
     * @param serviceId - ID du service
     * @param utilisateur - Utilisateur à mettre à jour
     */
    updateUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return of(utilisateur);
    }

    /**
     * Supprime un utilisateur
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur à supprimer
     */
    deleteUtilisateur(serviceId: number, utilisateurId: number): Observable<void> {
        return of(void 0);
    }

    /**
     * Change le statut d'un utilisateur
     * @param serviceId - ID du service
     * @param utilisateurId - ID de l'utilisateur
     * @param statut - Nouveau statut
     */
    changerStatutUtilisateur(serviceId: number, utilisateurId: number, statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU'): Observable<Utilisateur> {
        return this.getUtilisateurById(serviceId, utilisateurId).pipe(
            map(utilisateur => {
                if (utilisateur) {
                    return { ...utilisateur, statut: statut };
                }
                throw new Error('Utilisateur non trouvé');
            })
        );
    }
}