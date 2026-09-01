import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ActiviteJournal {
  id: number;
  icone: string;
  message: string;
  lien?: string | undefined;
  date: Date;
}

/**
 * Journal des actions effectuées dans l'application (création de service,
 * de workflow, de compte, publication, validation de demande...).
 * Alimente la cloche de notifications en haut de l'interface, ainsi que
 * la page « Notifications ». Purement en mémoire (+ localStorage) pour
 * cette démonstration, mais conçu pour être branché sur un vrai backend.
 */
const CLE_STOCKAGE = 'iblopay_providers_activites';
const MAX_ENTREES = 100;

@Injectable({ providedIn: 'root' })
export class ActiviteService {
  private activitesSubject = new BehaviorSubject<ActiviteJournal[]>(this.restaurer());
  activites$ = this.activitesSubject.asObservable();
  private prochainId = (this.activitesSubject.value[0]?.id || 0) + 1;

  get activites(): ActiviteJournal[] {
    return this.activitesSubject.value;
  }

  consigner(message: string, icone: string = 'fa-solid fa-circle-info', lien?: string): void {
    const entree: ActiviteJournal = {
      id: this.prochainId++,
      icone,
      message,
      lien,
      date: new Date()
    };
    const liste = [entree, ...this.activitesSubject.value].slice(0, MAX_ENTREES);
    this.activitesSubject.next(liste);
    this.sauvegarder(liste);
  }

  marquerToutesVues(): void {
    // Réservé pour une future distinction lu/non-lu.
  }

  private sauvegarder(liste: ActiviteJournal[]): void {
    try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(liste)); } catch { /* stockage indisponible */ }
  }

  private restaurer(): ActiviteJournal[] {
    try {
      const brut = localStorage.getItem(CLE_STOCKAGE);
      if (!brut) return [];
      const liste = JSON.parse(brut) as ActiviteJournal[];
      return liste.map(a => ({ ...a, date: new Date(a.date) }));
    } catch {
      return [];
    }
  }
}
