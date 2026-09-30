import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePublic } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';
import { ICON_PATHS } from '../../utils/service-icons';
import { getServiceColor, getServiceInitials } from '../../utils/service-display.util';

@Component({
    selector: 'app-services-publics-edit',
    standalone: false,
    templateUrl: './services-publics-edit.component.html',
    styleUrls: ['./services-publics-edit.component.scss']
})
export class ServicesPublicsEditComponent implements OnInit {

    service: ServicePublic | undefined;
    loading = false;
    error: string = '';
    isNew: boolean = false;

    readonly iconPaths = ICON_PATHS;
    readonly getColor = getServiceColor;
    readonly getInitials = getServiceInitials;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicesPublicsService: ServicesPublicsService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id === 'new') {
            this.isNew = true;
            this.service = this.getEmptyService();
            this.loading = false;
        } else {
            this.isNew = false;
            this.loading = true;
            this.servicesPublicsService.getById(Number(id)).subscribe({
                next: (data) => {
                    if (data) {
                        this.service = data;
                    } else {
                        this.error = 'Service non trouvé';
                    }
                    this.loading = false;
                },
                error: (err) => {
                    this.error = 'Erreur lors du chargement du service';
                    this.loading = false;
                    console.error(err);
                }
            });
        }
    }

    getEmptyService(): ServicePublic {
        return {
            id: 0,
            numero: 0,
            abreviation: '',
            description: '',
            type: 'INTERNE',
            actif: true,
            dateCreation: new Date(),
            version: '1.0.0',
            responsable: '',
            email: '',
            telephone: '',
            siteWeb: '',
            utilisateurs: [],
            categories: [],
            typesRNF: [],
            paiements: []
        };
    }

    goBack(): void {
        this.router.navigate(['/services-publics']);
    }

    cancel(): void {
        this.router.navigate(['/services-publics']);
    }

    onSubmit(): void {
        if (!this.service) return;

        if (!this.service.abreviation || !this.service.description) {
            this.error = 'Veuillez remplir tous les champs obligatoires';
            return;
        }

        const operation = this.service.id === 0
            ? this.servicesPublicsService.create(this.service)
            : this.servicesPublicsService.update(this.service);

        operation.subscribe({
            next: (result) => {
                this.router.navigate(['/services-publics']);
            },
            error: (err) => {
                this.error = 'Erreur lors de l\'enregistrement du service';
                console.error(err);
            }
        });
    }

    /** Date de création au format « yyyy-MM-dd » attendu par <input type="date">. */
    get dateCreationInput(): string {
        if (!this.service?.dateCreation) return '';
        const d = new Date(this.service.dateCreation);
        return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
    }

    set dateCreationInput(value: string) {
        if (this.service && value) {
            this.service.dateCreation = new Date(value);
        }
    }
}
