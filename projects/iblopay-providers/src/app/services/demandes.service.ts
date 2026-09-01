import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SoumissionFormulaire, RendementGlobal, RendementParService, ServiceIndicateurs } from '../models/provider.model';
import { MOCK_SOUMISSIONS, MOCK_RENDEMENT_GLOBAL, MOCK_RENDEMENT_SERVICES, MOCK_SERVICE_INDICATEURS } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class DemandesService {
  private soumissions: SoumissionFormulaire[] = [...MOCK_SOUMISSIONS];

  getAll(): Observable<SoumissionFormulaire[]> {
    return of(this.soumissions).pipe(delay(200));
  }

  updateStatut(id: number, statut: SoumissionFormulaire['statut'], etape: string): Observable<SoumissionFormulaire> {
    this.soumissions = this.soumissions.map(s => s.id === id ? { ...s, statut, etapeActuelle: etape, dateMaj: new Date() } : s);
    return of(this.soumissions.find(s => s.id === id)!).pipe(delay(150));
  }

  confirmerPaiement(id: number): Observable<SoumissionFormulaire> {
    this.soumissions = this.soumissions.map(s => s.id === id ? { ...s, montantPaye: true, dateMaj: new Date() } : s);
    return of(this.soumissions.find(s => s.id === id)!).pipe(delay(150));
  }

  getRendementGlobal(): Observable<RendementGlobal> {
    return of(MOCK_RENDEMENT_GLOBAL).pipe(delay(150));
  }

  getRendementParService(): Observable<RendementParService[]> {
    return of(MOCK_RENDEMENT_SERVICES).pipe(delay(150));
  }

  getIndicateursByService(serviceId: number): Observable<ServiceIndicateurs | undefined> {
    return of(MOCK_SERVICE_INDICATEURS.find(i => i.serviceId === serviceId)).pipe(delay(150));
  }

  getServicesAvecIndicateurs(): Observable<number[]> {
    return of(MOCK_SERVICE_INDICATEURS.map(i => i.serviceId)).pipe(delay(100));
  }
}
