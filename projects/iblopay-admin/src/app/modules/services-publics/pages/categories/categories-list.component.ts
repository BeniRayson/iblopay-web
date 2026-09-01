import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePublic, Categorie } from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';

@Component({
    selector: 'app-categories-list',
    standalone: false,
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

    service: ServicePublic | undefined;
    categories: Categorie[] = [];
    loading = false;

    showNotification: boolean = false;
    notificationMessage: string = '';
    notificationType: 'success' | 'error' | 'info' = 'success';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicesPublicsService: ServicesPublicsService
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loading = true;
        this.servicesPublicsService.getById(id).subscribe({
            next: (data) => {
                this.service = data;
                this.categories = data?.categories || [];
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/services-publics', this.service?.id]);
    }

    getCategoryColor(code: string): string {
        const colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
            hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#16293a';
    }

    onAddCategory(): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', 'new']);
        }
    }

    onViewCategory(category: Categorie): void {
        if (this.service) {
            this.router.navigate(['/services-publics', this.service.id, 'categories', category.id]);
        }
    }

    onEditCategory(category: Categorie): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'categorie', category.id]);
        }
    }

    onToggleCategory(category: Categorie): void {
        category.actif = !category.actif;
        this.showNotificationMessage(
            `Catégorie "${category.nom}" ${category.actif ? 'activée' : 'désactivée'} avec succès.`,
            'success'
        );
    }

    exportData(): void {
        this.showNotificationMessage('Export des catégories en cours…', 'info');
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