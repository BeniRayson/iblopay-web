import { Observable } from 'rxjs';
import { SoumissionFormulaire, RendementGlobal, RendementParService, ServiceIndicateurs } from '../models/provider.model';
export declare class DemandesService {
    private soumissions;
    getAll(): Observable<SoumissionFormulaire[]>;
    updateStatut(id: number, statut: SoumissionFormulaire['statut'], etape: string): Observable<SoumissionFormulaire>;
    confirmerPaiement(id: number): Observable<SoumissionFormulaire>;
    getRendementGlobal(): Observable<RendementGlobal>;
    getRendementParService(): Observable<RendementParService[]>;
    getIndicateursByService(serviceId: number): Observable<ServiceIndicateurs | undefined>;
    getServicesAvecIndicateurs(): Observable<number[]>;
}
//# sourceMappingURL=demandes.service.d.ts.map