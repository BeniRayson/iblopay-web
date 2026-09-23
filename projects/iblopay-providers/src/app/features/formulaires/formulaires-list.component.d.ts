import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { ServicesService } from '../../services/services.service';
import { Formulaire, ServiceInstitution } from '../../models/provider.model';
export declare class FormulairesListComponent implements OnInit {
    private formulairesService;
    private servicesService;
    private router;
    formulaires: Formulaire[];
    services: ServiceInstitution[];
    isLoading: boolean;
    constructor(formulairesService: FormulairesService, servicesService: ServicesService, router: Router);
    ngOnInit(): void;
    serviceNom(serviceId: number): string;
    ouvrirFormulaire(f: Formulaire): void;
}
//# sourceMappingURL=formulaires-list.component.d.ts.map