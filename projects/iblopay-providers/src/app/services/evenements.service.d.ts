import { Observable } from 'rxjs';
import { Lieu, Organisateur, Evenement, StatsEvenementsGlobal, StatsParEvenement, VenteHistorique, ReclamationEvenement } from '../models/evenements.model';
export declare class EvenementsService {
    private lieux;
    private organisateurs;
    private evenements;
    private historique;
    private reclamations;
    private typesLieux;
    private nextLieuId;
    private nextOrganisateurId;
    private nextEvenementId;
    getTypesLieux(): Observable<string[]>;
    ajouterTypeLieu(nom: string): void;
    getLieux(): Observable<Lieu[]>;
    creerLieu(l: Partial<Lieu>): Observable<Lieu>;
    modifierLieu(l: Lieu): Observable<Lieu>;
    supprimerLieu(id: number): Observable<void>;
    toggleStatutLieu(l: Lieu): Observable<Lieu>;
    getOrganisateurs(): Observable<Organisateur[]>;
    creerOrganisateur(o: Partial<Organisateur>): Observable<Organisateur>;
    modifierOrganisateur(o: Organisateur): Observable<Organisateur>;
    toggleStatutOrganisateur(id: number): Observable<Organisateur>;
    supprimerOrganisateur(id: number): Observable<void>;
    getEvenements(): Observable<Evenement[]>;
    getEvenementById(id: number): Observable<Evenement | undefined>;
    creerEvenement(e: Partial<Evenement>): Observable<Evenement>;
    modifierEvenement(e: Evenement): Observable<Evenement>;
    supprimerEvenement(id: number): Observable<void>;
    toggleStatutEvenement(e: Evenement, statut: Evenement['statut']): Observable<Evenement>;
    getStatsGlobal(): Observable<StatsEvenementsGlobal>;
    getStatsParEvenement(): Observable<StatsParEvenement[]>;
    getHistorique(): Observable<VenteHistorique[]>;
    getHistoriqueParEvenement(evenementId: number): Observable<VenteHistorique[]>;
    getReclamations(): Observable<ReclamationEvenement[]>;
}
//# sourceMappingURL=evenements.service.d.ts.map