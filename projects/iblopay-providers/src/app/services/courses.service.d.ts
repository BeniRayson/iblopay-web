import { Observable } from 'rxjs';
import { Course, StatutCourse } from '../models/transport.model';
export declare class CoursesService {
    private coursesSubject;
    courses$: Observable<Course[]>;
    private nextId;
    private intervalId;
    constructor();
    getAll(): Observable<Course[]>;
    /** Fait avancer légèrement les courses en cours pour simuler un suivi en temps réel. */
    private demarrerSimulationTempsReel;
    arreterSimulation(): void;
    changerStatut(id: number, statut: StatutCourse): void;
    assignerVehicule(id: number, vehiculeId: number, chauffeurId: number): void;
    creerCourse(course: Partial<Course>): void;
}
//# sourceMappingURL=courses.service.d.ts.map