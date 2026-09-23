import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePublic } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
export declare class ServicesPublicsEditComponent implements OnInit {
    private route;
    private router;
    private servicesPublicsService;
    service: ServicePublic | undefined;
    loading: boolean;
    error: string;
    isNew: boolean;
    constructor(route: ActivatedRoute, router: Router, servicesPublicsService: ServicesPublicsService);
    ngOnInit(): void;
    getEmptyService(): ServicePublic;
    goBack(): void;
    cancel(): void;
    onSubmit(): void;
    getServiceColor(abreviation: string): string;
}
//# sourceMappingURL=services-publics-edit.component.d.ts.map