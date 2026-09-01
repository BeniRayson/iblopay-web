import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePublic } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';

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

        // Validation
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

    getServiceColor(abreviation: string): string {
        if (!abreviation) return '#16293a';

        const colors: string[] = [
            '#16293a', '#a9803d', '#386a4e', '#9c4033',
            '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e',
            '#46586a', '#85661f', '#2f4f5e', '#734531',
            '#4d6650', '#8a6a2e', '#603a33', '#3f5a6e'
        ];
        let hash = 0;
        for (let i = 0; i < abreviation.length; i++) {
            hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index] || '#16293a';
    }
}