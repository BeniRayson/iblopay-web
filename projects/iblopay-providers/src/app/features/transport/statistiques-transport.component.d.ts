import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TransportService } from '../../services/transport.service';
import { CoursesService } from '../../services/courses.service';
import { StatsTransportGlobal, StatsParLigneOuZone, LigneBus, ZoneTaxi, TrajetHistorique, Chauffeur, Course } from '../../models/transport.model';
interface KpiItem {
    icon: string;
    label: string;
    valeur: string;
    couleur: string;
}
export declare class StatistiquesTransportComponent implements OnInit, AfterViewInit {
    private transportService;
    private coursesService;
    chartCanvas?: ElementRef<HTMLCanvasElement>;
    stats: StatsTransportGlobal | null;
    statsParLigneOuZone: StatsParLigneOuZone[];
    lignes: LigneBus[];
    zones: ZoneTaxi[];
    chauffeurs: Chauffeur[];
    historique: TrajetHistorique[];
    courses: Course[];
    trajetSelectionneId: string | null;
    kpisTrajet: KpiItem[];
    isLoadingKpis: boolean;
    private chart?;
    constructor(transportService: TransportService, coursesService: CoursesService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    selectionnerTrajet(cle: string): void;
    formatBIF(v: number): string;
    buildChart(): void;
    get termineesAujourdhui(): number;
    get revenuTotalCourses(): number;
    get tauxReussite(): number;
    getWorkloadLabel(occupation: number): string;
    getWorkloadClass(occupation: number): string;
    colorClass(couleur: string): string;
}
export {};
//# sourceMappingURL=statistiques-transport.component.d.ts.map