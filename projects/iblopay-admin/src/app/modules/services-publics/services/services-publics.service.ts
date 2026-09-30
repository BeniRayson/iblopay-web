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



    getAll(): Observable<ServicePublic[]> {
        return of(SERVICES_PUBLICS_MOCK_COMPLETE);
    }


    getById(id: number): Observable<ServicePublic | undefined> {
        return this.getAll().pipe(
            map(services => services.find(s => s.id === id))
        );
    }


    update(service: ServicePublic): Observable<ServicePublic> {
        return of(service);
    }


    create(service: ServicePublic): Observable<ServicePublic> {
        return of({ ...service, id: Date.now() });
    }


    delete(id: number): Observable<void> {
        return of(void 0);
    }



    getCategories(serviceId: number): Observable<Categorie[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.categories || [])
        );
    }


    getCategorieById(serviceId: number, categorieId: number): Observable<Categorie | undefined> {
        return this.getCategories(serviceId).pipe(
            map(categories => categories.find(c => c.id === categorieId))
        );
    }


    createCategorie(serviceId: number, categorie: Categorie): Observable<Categorie> {
        return of({ ...categorie, id: Date.now(), serviceId: serviceId });
    }


    updateCategorie(serviceId: number, categorie: Categorie): Observable<Categorie> {
        return of({ ...categorie, dateModification: new Date() });
    }


    deleteCategorie(serviceId: number, categorieId: number): Observable<void> {
        return of(void 0);
    }



    getTypesRNF(serviceId: number): Observable<TypeRNF[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.typesRNF || [])
        );
    }


    getTypeRNFById(serviceId: number, typeRNFId: number): Observable<TypeRNF | undefined> {
        return this.getTypesRNF(serviceId).pipe(
            map(types => types.find(t => t.id === typeRNFId))
        );
    }


    createTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF> {
        return of({ ...typeRNF, id: Date.now(), serviceId: serviceId });
    }


    updateTypeRNF(serviceId: number, typeRNF: TypeRNF): Observable<TypeRNF> {
        return of(typeRNF);
    }


    deleteTypeRNF(serviceId: number, typeRNFId: number): Observable<void> {
        return of(void 0);
    }



    getSousTypesRNF(serviceId: number, typeRNFId: number): Observable<SousTypeRNF[]> {
        return this.getTypeRNFById(serviceId, typeRNFId).pipe(
            map(type => type?.sousTypes || [])
        );
    }


    createSousTypeRNF(serviceId: number, typeRNFId: number, sousType: SousTypeRNF): Observable<SousTypeRNF> {
        return of({ ...sousType, id: Date.now(), typeRNFId: typeRNFId });
    }


    updateSousTypeRNF(serviceId: number, sousType: SousTypeRNF): Observable<SousTypeRNF> {
        return of(sousType);
    }


    deleteSousTypeRNF(serviceId: number, sousTypeId: number): Observable<void> {
        return of(void 0);
    }



    getPaiementsRNF(serviceId: number): Observable<PaiementRNF[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.paiements || [])
        );
    }


    getPaiementRNFById(serviceId: number, paiementId: number): Observable<PaiementRNF | undefined> {
        return this.getPaiementsRNF(serviceId).pipe(
            map(paiements => paiements.find(p => p.id === paiementId))
        );
    }


    createPaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF> {
        return of({ ...paiement, id: Date.now(), serviceId: serviceId });
    }


    updatePaiementRNF(serviceId: number, paiement: PaiementRNF): Observable<PaiementRNF> {
        return of(paiement);
    }


    deletePaiementRNF(serviceId: number, paiementId: number): Observable<void> {
        return of(void 0);
    }


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



    getUtilisateurs(serviceId: number): Observable<Utilisateur[]> {
        return this.getById(serviceId).pipe(
            map(service => service?.utilisateurs || [])
        );
    }


    getUtilisateurById(serviceId: number, utilisateurId: number): Observable<Utilisateur | undefined> {
        return this.getUtilisateurs(serviceId).pipe(
            map(utilisateurs => utilisateurs.find(u => u.id === utilisateurId))
        );
    }


    createUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return of({ ...utilisateur, id: Date.now(), serviceId: serviceId });
    }


    updateUtilisateur(serviceId: number, utilisateur: Utilisateur): Observable<Utilisateur> {
        return of(utilisateur);
    }


    deleteUtilisateur(serviceId: number, utilisateurId: number): Observable<void> {
        return of(void 0);
    }


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
