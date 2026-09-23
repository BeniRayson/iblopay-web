import { OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { DemandesService } from '../../services/demandes.service';
import { FormulairesService } from '../../services/formulaires.service';
import { ServiceInstitution, RendementGlobal, RendementParService, SoumissionFormulaire, Formulaire } from '../../models/provider.model';
export declare class DashboardComponent implements OnInit {
    private servicesService;
    private demandesService;
    private formulairesService;
    services: ServiceInstitution[];
    formulaires: Formulaire[];
    rendement?: RendementGlobal;
    rendementServices: RendementParService[];
    demandes: SoumissionFormulaire[];
    dernieresDemandes: SoumissionFormulaire[];
    derniersUtilisateurs: SoumissionFormulaire[];
    isLoading: boolean;
    today: Date;
    private readonly colors;
    constructor(servicesService: ServicesService, demandesService: DemandesService, formulairesService: FormulairesService);
    ngOnInit(): void;
    get servicesActifs(): number;
    get servicesBrouillon(): number;
    get formulairesPublies(): number;
    get formulairesBrouillon(): number;
    get utilisateursDistincts(): number;
    get demandesEnCours(): number;
    get demandesUrgentes(): SoumissionFormulaire[];
    getServiceColor(serviceNom: string): string;
    formatBIFComplet(v: number): string;
    formatBIF(v: number): string;
    statutClass(statut: string): string;
    statutLabel(statut: string): string;
}
//# sourceMappingURL=dashboard.component.d.ts.map