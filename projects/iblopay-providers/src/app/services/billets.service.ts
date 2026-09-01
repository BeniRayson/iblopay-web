import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Billet, StatutBillet } from '../models/evenements.model';
import { MOCK_BILLETS } from '../data/mock-events-data';

@Injectable({ providedIn: 'root' })
export class BilletsService {
  private billetsSubject = new BehaviorSubject<Billet[]>([...MOCK_BILLETS]);
  billets$ = this.billetsSubject.asObservable();
  private nextId = Math.max(0, ...MOCK_BILLETS.map(b => b.id)) + 1;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.demarrerSimulationTempsReel();
  }

  getAll(): Observable<Billet[]> {
    return this.billets$;
  }

  /** Simule l'arrivée de nouvelles ventes/réservations de billets en temps réel. */
  private demarrerSimulationTempsReel(): void {
    if (this.intervalId) return;
    const noms = ['Ndayishimiye Jean', 'Bukuru Marie', 'Hakizimana Eric', 'Irakoze Sandrine', 'Nshimirimana Pascal', 'Bigirimana Alice', 'Ntahonkuriye Gérard', 'Minani Chantal'];
    this.intervalId = setInterval(() => {
      const billets = this.billetsSubject.value.map(b => b);

      // Certaines réservations passent automatiquement à "Payé" puis "Utilisé"
      const misAJour = billets.map(b => {
        if (b.statut === 'RESERVE' && Math.random() > 0.6) {
          return { ...b, statut: 'PAYE' as StatutBillet };
        }
        if (b.statut === 'PAYE' && Math.random() > 0.85) {
          return { ...b, statut: 'UTILISE' as StatutBillet, dateUtilisation: new Date() };
        }
        return b;
      });

      // De temps en temps, une nouvelle vente arrive
      if (Math.random() > 0.5) {
        const nouveau: Billet = {
          id: this.nextId++,
          numeroReference: `BIL-${7000 + this.nextId}`,
          evenementId: [1, 2, 3][Math.floor(Math.random() * 3)]!,
          categorieNom: ['Standard', 'Tribune', 'VIP', 'Populaire'][Math.floor(Math.random() * 4)]!,
          clientNom: noms[Math.floor(Math.random() * noms.length)]!,
          clientTelephone: '+257 79 ' + Math.floor(100000 + Math.random() * 900000),
          prix: [5000, 8000, 12000, 15000, 20000, 30000][Math.floor(Math.random() * 6)]!,
          statut: 'RESERVE',
          dateAchat: new Date()
        };
        this.billetsSubject.next([nouveau, ...misAJour]);
      } else {
        this.billetsSubject.next(misAJour);
      }
    }, 5000);
  }

  arreterSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  changerStatut(id: number, statut: StatutBillet): void {
    const billets = this.billetsSubject.value.map(b => {
      if (b.id !== id) return b;
      const maj: Billet = { ...b, statut };
      if (statut === 'UTILISE') maj.dateUtilisation = new Date();
      return maj;
    });
    this.billetsSubject.next(billets);
  }
}
