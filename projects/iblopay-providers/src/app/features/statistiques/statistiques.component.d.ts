import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { DemandesService } from '../../services/demandes.service';
import { ServicesService } from '../../services/services.service';
import { RendementGlobal, RendementParService, ServiceIndicateurs, ServiceInstitution } from '../../models/provider.model';
export declare class StatistiquesComponent implements OnInit, AfterViewInit {
    private demandesService;
    private servicesService;
    chartCanvas?: ElementRef<HTMLCanvasElement>;
    pieCanvas?: ElementRef<HTMLCanvasElement>;
    rendement?: RendementGlobal;
    rendementServices: RendementParService[];
    services: ServiceInstitution[];
    serviceSelectionneId: number | null;
    indicateursService: ServiceIndicateurs | null;
    isLoadingIndicateurs: boolean;
    private chart?;
    private pieChart?;
    constructor(demandesService: DemandesService, servicesService: ServicesService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    selectionnerService(serviceId: number): void;
    buildChart(): void;
    buildPieChart(): void;
    tauxTraitement(s: RendementParService): number;
    getWorkloadLabel(enAttente: number): string;
    getWorkloadClass(enAttente: number): string;
    colorClass(couleur: string): string;
}
//# sourceMappingURL=statistiques.component.d.ts.map