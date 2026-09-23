import { OnInit } from '@angular/core';
import { EvenementsService } from '../../services/evenements.service';
import { BilletsService } from '../../services/billets.service';
import { Evenement, Organisateur, StatsEvenementsGlobal, StatsParEvenement, Billet, ReclamationEvenement } from '../../models/evenements.model';
export declare class EvenementsDashboardComponent implements OnInit {
    private evenementsService;
    private billetsService;
    evenements: Evenement[];
    organisateurs: Organisateur[];
    billets: Billet[];
    reclamations: ReclamationEvenement[];
    stats?: StatsEvenementsGlobal;
    statsParEvenement: StatsParEvenement[];
    dernieresVentes: Billet[];
    meilleursOrganisateurs: Organisateur[];
    isLoading: boolean;
    today: Date;
    private readonly colors;
    constructor(evenementsService: EvenementsService, billetsService: BilletsService);
    ngOnInit(): void;
    get evenementsAVenir(): Evenement[];
    get evenementsEnCours(): Evenement[];
    get reclamationsOuvertes(): ReclamationEvenement[];
    get organisateursActifs(): number;
    get billetsVendusCount(): number;
    getEvenementColor(nom: string): string;
    formatBIFComplet(v: number): string;
    nomEvenement(id: number): string;
    statutBilletClass(statut: string): string;
    statutBilletLabel(statut: string): string;
}
//# sourceMappingURL=evenements-dashboard.component.d.ts.map