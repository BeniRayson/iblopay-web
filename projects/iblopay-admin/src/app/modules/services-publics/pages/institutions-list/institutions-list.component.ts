import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institution } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';

@Component({
    selector: 'app-institutions-list',
    standalone: false,
    templateUrl: './institutions-list.component.html',
    styleUrls: ['./institutions-list.component.scss']
})
export class InstitutionsListComponent implements OnInit {

    institutions: Institution[] = [];
    serviceId: number = 0;
    loading = false;
    notFound = false;

    viewingInstitution: Institution | null = null;

    showNotification: boolean = false;
    notificationMessage: string = '';
    notificationType: 'success' | 'error' | 'info' = 'success';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicesPublicsService: ServicesPublicsService
    ) { }

    ngOnInit(): void {
        this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
        this.loading = true;
        this.servicesPublicsService.getById(this.serviceId).subscribe({
            next: (data) => {
                this.institutions = data?.institutions || [];
                this.notFound = !data;
                this.loading = false;
            },
            error: () => {
                this.notFound = true;
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/services-publics', this.serviceId]);
    }

    getServiceColor(code: string): string {
        const colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
            hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#16293a';
    }

    getInstitutionTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            'ARCT': 'ARCT',
            'OBM': 'OBM',
            'OBPE': 'OBPE',
            'OBUHA': 'OBUHA',
            'ARCA': 'ARCA',
            'MINEDUC': 'Ministère Éducation',
            'MININTER': 'Ministère Intérieur',
            'MINJUST': 'Ministère Justice',
            'MINREX': 'Ministère Relations Extérieures',
            'ABREMA': 'ABREMA',
            'OHP': 'OHP',
            'LONA': 'LONA',
            'OTRACO': 'OTRACO',
            'AUTRE': 'Autre'
        };
        return labels[type] || type;
    }

    onViewInstitution(institution: Institution): void {
        this.viewingInstitution = institution;
    }

    closeInstitutionModal(): void {
        this.viewingInstitution = null;
    }

    onEditInstitution(institution: Institution): void {
        if (this.serviceId) {
            this.router.navigate(['/services-publics/edit', this.serviceId, 'institution', institution.id]);
        }
    }

    onToggleInstitution(institution: Institution): void {
        institution.actif = !institution.actif;
        this.showNotificationMessage(
            `Institution "${institution.nom}" ${institution.actif ? 'activée' : 'désactivée'} avec succès.`,
            'success'
        );
    }

    onAddInstitution(): void {
        if (this.serviceId) {
            this.router.navigate(['/services-publics/edit', this.serviceId, 'institution', 'new']);
        }
    }

    exportData(): void {
        this.showNotificationMessage('Export des institutions en cours…', 'info');
        setTimeout(() => {
            this.showNotificationMessage('Export terminé avec succès.', 'success');
        }, 1200);
    }

    showNotificationMessage(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        this.notificationMessage = message;
        this.notificationType = type;
        this.showNotification = true;
        setTimeout(() => {
            this.showNotification = false;
        }, 3000);
    }
}