import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ServiceInstitution } from '../models/provider.model';
import { MOCK_SERVICES } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private services: ServiceInstitution[] = [...MOCK_SERVICES];
  private nextId = Math.max(...this.services.map(s => s.id)) + 1;

  getAll(): Observable<ServiceInstitution[]> {
    return of(this.services).pipe(delay(200));
  }

  getById(id: number): Observable<ServiceInstitution | undefined> {
    return this.getAll().pipe(map(list => list.find(s => s.id === id)));
  }

  create(service: Partial<ServiceInstitution>): Observable<ServiceInstitution> {
    const created: ServiceInstitution = {
      id: this.nextId++,
      nom: service.nom || '',
      code: service.code || '',
      description: service.description || '',
      categorie: service.categorie || '',
      sousCategorie: service.sousCategorie || '',
      devise: service.devise || 'BIF',
      documentsRequis: service.documentsRequis || [],
      statut: service.statut || 'BROUILLON',
      dateCreation: new Date(),
      demandesRecues: 0,
      demandesTraitees: 0,
      ...(service.prix ? { prix: service.prix } : {})
    };
    this.services = [created, ...this.services];
    return of(created).pipe(delay(200));
  }

  update(service: ServiceInstitution): Observable<ServiceInstitution> {
    this.services = this.services.map(s => s.id === service.id ? { ...s, ...service } : s);
    return of(service).pipe(delay(200));
  }

  delete(id: number): Observable<void> {
    this.services = this.services.filter(s => s.id !== id);
    return of(void 0).pipe(delay(150));
  }
}
