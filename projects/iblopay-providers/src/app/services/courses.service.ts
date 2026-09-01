import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, StatutCourse } from '../models/transport.model';
import { MOCK_COURSES } from '../data/mock-transport-data';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private coursesSubject = new BehaviorSubject<Course[]>([...MOCK_COURSES]);
  courses$ = this.coursesSubject.asObservable();
  private nextId = Math.max(0, ...MOCK_COURSES.map(c => c.id)) + 1;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.demarrerSimulationTempsReel();
  }

  getAll(): Observable<Course[]> {
    return this.courses$;
  }

  /** Fait avancer légèrement les courses en cours pour simuler un suivi en temps réel. */
  private demarrerSimulationTempsReel(): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const courses = this.coursesSubject.value.map(c => {
        if (c.statut !== 'EN_COURS') return c;
        const nouvelleProgression = Math.min(100, c.progression + Math.floor(Math.random() * 6) + 2);
        if (nouvelleProgression >= 100) {
          return { ...c, progression: 100, statut: 'TERMINEE' as StatutCourse, dateFin: new Date() };
        }
        return { ...c, progression: nouvelleProgression };
      });
      this.coursesSubject.next(courses);
    }, 4000);
  }

  arreterSimulation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  changerStatut(id: number, statut: StatutCourse): void {
    const courses = this.coursesSubject.value.map(c => {
      if (c.id !== id) return c;
      const maj: Course = { ...c, statut };
      if (statut === 'ACCEPTEE') maj.progression = 5;
      if (statut === 'EN_COURS' && !c.dateDebut) maj.dateDebut = new Date();
      if (statut === 'TERMINEE') { maj.progression = 100; maj.dateFin = new Date(); }
      if (statut === 'ANNULEE') maj.progression = 0;
      return maj;
    });
    this.coursesSubject.next(courses);
  }

  assignerVehicule(id: number, vehiculeId: number, chauffeurId: number): void {
    const courses = this.coursesSubject.value.map(c =>
      c.id === id ? { ...c, vehiculeId, chauffeurId, statut: 'ACCEPTEE' as StatutCourse, progression: 5 } : c
    );
    this.coursesSubject.next(courses);
  }

  creerCourse(course: Partial<Course>): void {
    const nouvelle: Course = {
      id: this.nextId++,
      numeroReference: `CRS-${9000 + this.nextId}`,
      type: course.type || 'TAXI',
      clientNom: course.clientNom || '',
      clientTelephone: course.clientTelephone || '',
      depart: course.depart || '',
      destination: course.destination || '',
      distanceKm: course.distanceKm || 0,
      prix: course.prix || 0,
      statut: 'DEMANDE',
      progression: 0,
      dateDemande: new Date()
    };
    this.coursesSubject.next([nouvelle, ...this.coursesSubject.value]);
  }
}
