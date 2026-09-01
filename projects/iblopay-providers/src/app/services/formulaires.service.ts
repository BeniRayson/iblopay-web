import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Formulaire, FormulaireChamp, TypeChamp } from '../models/provider.model';
import { MOCK_FORMULAIRES } from '../data/mock-data';

export interface ChampPaletteItem {
  type: TypeChamp;
  label: string;
  icon: string;
}

export const PALETTE_CHAMPS: ChampPaletteItem[] = [
  { type: 'TEXTE', label: 'Texte', icon: 'fa-solid fa-font' },
  { type: 'NOMBRE', label: 'Nombre', icon: 'fa-solid fa-hashtag' },
  { type: 'DATE', label: 'Date', icon: 'fa-solid fa-calendar-days' },
  { type: 'EMAIL', label: 'Email', icon: 'fa-solid fa-envelope' },
  { type: 'TELEPHONE', label: 'Téléphone', icon: 'fa-solid fa-phone' },
  { type: 'SELECT', label: 'Select', icon: 'fa-solid fa-list' },
  { type: 'CHECKBOX', label: 'Checkbox', icon: 'fa-regular fa-square-check' },
  { type: 'FICHIER', label: 'Fichier', icon: 'fa-solid fa-paperclip' },
  { type: 'ADRESSE', label: 'Adresse', icon: 'fa-solid fa-location-dot' }
];

@Injectable({ providedIn: 'root' })
export class FormulairesService {
  private formulaires: Formulaire[] = [...MOCK_FORMULAIRES];
  private nextId = Math.max(...this.formulaires.map(f => f.id)) + 1;

  getAll(): Observable<Formulaire[]> {
    return of(this.formulaires).pipe(delay(200));
  }

  getByServiceId(serviceId: number): Observable<Formulaire | undefined> {
    return this.getAll().pipe(map(list => list.find(f => f.serviceId === serviceId)));
  }

  getById(id: number): Observable<Formulaire | undefined> {
    return this.getAll().pipe(map(list => list.find(f => f.id === id)));
  }

  save(formulaire: Formulaire): Observable<Formulaire> {
    if (formulaire.id) {
      this.formulaires = this.formulaires.map(f => f.id === formulaire.id ? formulaire : f);
    } else {
      formulaire.id = this.nextId++;
      formulaire.createdAt = new Date();
      this.formulaires = [formulaire, ...this.formulaires];
    }
    return of(formulaire).pipe(delay(250));
  }

  creerChampVide(type: TypeChamp, ordre: number): FormulaireChamp {
    const item = PALETTE_CHAMPS.find(p => p.type === type)!;
    return {
      id: 'champ_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      typeChamp: type,
      label: item.label,
      code: item.label.toLowerCase().replace(/\s+/g, '_'),
      obligatoire: false,
      ordre,
      configuration: type === 'SELECT' ? { options: ['Option 1', 'Option 2'] } : {}
    };
  }
}
