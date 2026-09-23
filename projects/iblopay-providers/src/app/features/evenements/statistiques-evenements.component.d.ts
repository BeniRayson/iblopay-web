import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { EvenementsService } from '../../services/evenements.service';
import { BilletsService } from '../../services/billets.service';
import { StatsEvenementsGlobal, StatsParEvenement, Evenement, VenteHistorique, Billet } from '../../models/evenements.model';
interface KpiItem {
    icon: string;
    label: string;
    valeur: string;
    couleur: string;
}
export declare class StatistiquesEvenementsComponent implements OnInit, AfterViewInit {
    private evenementsService;
    private billetsService;
    chartCanvas?: ElementRef<HTMLCanvasElement>;
    stats: StatsEvenementsGlobal | null;
    statsParEvenement: StatsParEvenement[];
    evenements: Evenement[];
    historique: VenteHistorique[];
    billets: Billet[];
    evenementSelectionneId: number | null;
    kpisEvenement: KpiItem[];
    isLoadingKpis: boolean;
    private chart?;
    constructor(evenementsService: EvenementsService, billetsService: BilletsService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    selectionnerEvenement(id: number): void;
    formatBIF(v: number): string;
    buildChart(): void;
    get billetsVendusCount(): number;
    get revenuTotalBillets(): number;
    getWorkloadLabel(remplissage: number): string;
    getWorkloadClass(remplissage: number): string;
    colorClass(couleur: string): string;
}
export {};
//# sourceMappingURL=statistiques-evenements.component.d.ts.map