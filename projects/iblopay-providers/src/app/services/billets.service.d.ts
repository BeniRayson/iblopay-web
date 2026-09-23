import { Observable } from 'rxjs';
import { Billet, StatutBillet } from '../models/evenements.model';
export declare class BilletsService {
    private billetsSubject;
    billets$: Observable<Billet[]>;
    private nextId;
    private intervalId;
    constructor();
    getAll(): Observable<Billet[]>;
    /** Simule l'arrivée de nouvelles ventes/réservations de billets en temps réel. */
    private demarrerSimulationTempsReel;
    arreterSimulation(): void;
    changerStatut(id: number, statut: StatutBillet): void;
}
//# sourceMappingURL=billets.service.d.ts.map