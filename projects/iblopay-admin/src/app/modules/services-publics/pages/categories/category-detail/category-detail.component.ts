import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie, Frais, DocumentRequis } from '../../../models/service-public.model';
import { ServicesPublicsService } from '../../../services/services-publics.service';

@Component({
    selector: 'app-category-detail',
    standalone: false,
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

    category: Categorie | undefined;
    serviceId: number = 0;
    loading = false;
    notFound = false;

    // Pagination
    fraisCurrentPage: number = 1;
    fraisItemsPerPage: number = 10;
    fraisTotalPages: number = 0;

    documentsCurrentPage: number = 1;
    documentsItemsPerPage: number = 10;
    documentsTotalPages: number = 0;

    activeTab: string = 'frais';

    showNotification: boolean = false;
    notificationMessage: string = '';
    notificationType: 'success' | 'error' | 'info' = 'success';

    // Formulaire Frais (modale)
    fraisModalOpen: boolean = false;
    fraisModalMode: 'add' | 'edit' = 'add';
    fraisForm: any = this.getEmptyFraisForm();
    private editingFraisId: number | null = null;

    // Formulaire Document requis (modale)
    documentModalOpen: boolean = false;
    documentModalMode: 'add' | 'edit' = 'add';
    documentForm: any = this.getEmptyDocumentForm();
    private editingDocumentId: number | null = null;

    readonly Math = Math;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicesPublicsService: ServicesPublicsService
    ) { }

    ngOnInit(): void {
        const serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));
        const categoryId = Number(this.route.snapshot.paramMap.get('id'));
        this.serviceId = serviceId;

        this.loading = true;

        // Récupérer le service et trouver la catégorie
        this.servicesPublicsService.getById(serviceId).subscribe({
            next: (service) => {
                if (service && service.categories) {
                    this.category = service.categories.find(c => c.id === categoryId);
                    this.notFound = !this.category;
                } else {
                    this.notFound = true;
                }
                this.loading = false;
                if (this.category) {
                    this.initPagination();
                }
            },
            error: () => {
                this.notFound = true;
                this.loading = false;
            }
        });
    }

    initPagination(): void {
        this.fraisTotalPages = Math.ceil((this.category?.frais?.length || 0) / this.fraisItemsPerPage);
        if (this.fraisTotalPages === 0) this.fraisTotalPages = 1;

        this.documentsTotalPages = Math.ceil((this.category?.documentsRequis?.length || 0) / this.documentsItemsPerPage);
        if (this.documentsTotalPages === 0) this.documentsTotalPages = 1;
    }

    get paginatedFrais(): Frais[] {
        if (!this.category?.frais) return [];
        const start = (this.fraisCurrentPage - 1) * this.fraisItemsPerPage;
        return this.category.frais.slice(start, start + this.fraisItemsPerPage);
    }

    get paginatedDocuments(): DocumentRequis[] {
        if (!this.category?.documentsRequis) return [];
        const start = (this.documentsCurrentPage - 1) * this.documentsItemsPerPage;
        return this.category.documentsRequis.slice(start, start + this.documentsItemsPerPage);
    }

    changeFraisPage(page: number): void {
        if (page < 1 || page > this.fraisTotalPages) return;
        this.fraisCurrentPage = page;
    }

    getFraisPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.fraisCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.fraisTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    changeDocumentsPage(page: number): void {
        if (page < 1 || page > this.documentsTotalPages) return;
        this.documentsCurrentPage = page;
    }

    getDocumentsPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.documentsCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.documentsTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    goBack(): void {
        this.router.navigate(['/services-publics', this.serviceId, 'categories']);
    }

    onAddFrais(): void {
        if (!this.category) return;
        this.fraisModalMode = 'add';
        this.editingFraisId = null;
        this.fraisForm = this.getEmptyFraisForm();
        this.fraisModalOpen = true;
    }

    onEditFrais(frais: Frais): void {
        this.fraisModalMode = 'edit';
        this.editingFraisId = frais.id;
        this.fraisForm = {
            nom: frais.nom,
            montant: frais.montant,
            devise: (frais as any).devise || 'BIF',
            type: frais.type || 'FIXE',
            pourcentage: (frais as any).pourcentage ?? null,
            montantMin: (frais as any).montantMin ?? null,
            frequence: (frais as any).frequence || 'PONCTUEL',
            actif: frais.actif !== false
        };
        this.fraisModalOpen = true;
    }

    closeFraisModal(): void {
        this.fraisModalOpen = false;
    }

    saveFrais(): void {
        if (!this.category) return;
        if (!this.fraisForm.nom || !this.fraisForm.nom.trim()) {
            this.showNotificationMessage('Le nom du frais est obligatoire.', 'error');
            return;
        }
        if (this.fraisForm.montant === null || this.fraisForm.montant === undefined || this.fraisForm.montant < 0) {
            this.showNotificationMessage('Le montant est invalide.', 'error');
            return;
        }

        if (this.fraisModalMode === 'add') {
            const newFrais = {
                id: Date.now(),
                nom: this.fraisForm.nom,
                montant: Number(this.fraisForm.montant),
                devise: this.fraisForm.devise || 'BIF',
                type: this.fraisForm.type,
                pourcentage: this.fraisForm.pourcentage,
                montantMin: this.fraisForm.montantMin,
                frequence: this.fraisForm.frequence,
                actif: this.fraisForm.actif
            } as any as Frais;
            this.category.frais = [...(this.category.frais || []), newFrais];
            this.initPagination();
            this.showNotificationMessage(`Frais "${newFrais.nom}" ajouté avec succès.`, 'success');
        } else if (this.editingFraisId !== null && this.category.frais) {
            this.category.frais = this.category.frais.map(f =>
                f.id === this.editingFraisId
                    ? {
                        ...f,
                        nom: this.fraisForm.nom,
                        montant: Number(this.fraisForm.montant),
                        devise: this.fraisForm.devise,
                        type: this.fraisForm.type,
                        pourcentage: this.fraisForm.pourcentage,
                        montantMin: this.fraisForm.montantMin,
                        frequence: this.fraisForm.frequence,
                        actif: this.fraisForm.actif
                    } as any as Frais
                    : f
            );
            this.showNotificationMessage(`Frais "${this.fraisForm.nom}" modifié avec succès.`, 'success');
        }

        this.fraisModalOpen = false;
    }

    onDeleteFrais(fraisId: number): void {
        if (!this.category?.frais) return;
        if (confirm('Êtes-vous sûr de vouloir supprimer ce frais ?')) {
            this.category.frais = this.category.frais.filter(f => f.id !== fraisId);
            this.initPagination();
            if (this.fraisCurrentPage > this.fraisTotalPages) {
                this.fraisCurrentPage = this.fraisTotalPages;
            }
            this.showNotificationMessage('Frais supprimé avec succès.', 'success');
        }
    }

    private getEmptyFraisForm(): any {
        return {
            nom: '',
            montant: null,
            devise: 'BIF',
            type: 'FIXE',
            pourcentage: null,
            montantMin: null,
            frequence: 'PONCTUEL',
            actif: true
        };
    }

    onAddDocument(): void {
        if (!this.category) return;
        this.documentModalMode = 'add';
        this.editingDocumentId = null;
        this.documentForm = this.getEmptyDocumentForm();
        this.documentModalOpen = true;
    }

    onEditDocument(doc: DocumentRequis): void {
        this.documentModalMode = 'edit';
        this.editingDocumentId = doc.id;
        this.documentForm = {
            nom: doc.nom,
            description: doc.description || '',
            type: (doc as any).type || 'AUTRE',
            format: doc.format || 'PDF',
            obligatoire: doc.obligatoire !== false,
            version: doc.version || ''
        };
        this.documentModalOpen = true;
    }

    closeDocumentModal(): void {
        this.documentModalOpen = false;
    }

    saveDocument(): void {
        if (!this.category) return;
        if (!this.documentForm.nom || !this.documentForm.nom.trim()) {
            this.showNotificationMessage('Le nom du document est obligatoire.', 'error');
            return;
        }

        if (this.documentModalMode === 'add') {
            const newDoc = {
                id: Date.now(),
                nom: this.documentForm.nom,
                description: this.documentForm.description,
                type: this.documentForm.type,
                format: this.documentForm.format,
                obligatoire: this.documentForm.obligatoire,
                version: this.documentForm.version
            } as any as DocumentRequis;
            this.category.documentsRequis = [...(this.category.documentsRequis || []), newDoc];
            this.initPagination();
            this.showNotificationMessage(`Document "${newDoc.nom}" ajouté avec succès.`, 'success');
        } else if (this.editingDocumentId !== null && this.category.documentsRequis) {
            this.category.documentsRequis = this.category.documentsRequis.map(d =>
                d.id === this.editingDocumentId
                    ? {
                        ...d,
                        nom: this.documentForm.nom,
                        description: this.documentForm.description,
                        type: this.documentForm.type,
                        format: this.documentForm.format,
                        obligatoire: this.documentForm.obligatoire,
                        version: this.documentForm.version
                    } as any as DocumentRequis
                    : d
            );
            this.showNotificationMessage(`Document "${this.documentForm.nom}" modifié avec succès.`, 'success');
        }

        this.documentModalOpen = false;
    }

    onDeleteDocument(docId: number): void {
        if (!this.category?.documentsRequis) return;
        if (confirm('Êtes-vous sûr de vouloir supprimer ce document requis ?')) {
            this.category.documentsRequis = this.category.documentsRequis.filter(d => d.id !== docId);
            this.initPagination();
            if (this.documentsCurrentPage > this.documentsTotalPages) {
                this.documentsCurrentPage = this.documentsTotalPages;
            }
            this.showNotificationMessage('Document supprimé avec succès.', 'success');
        }
    }

    private getEmptyDocumentForm(): any {
        return {
            nom: '',
            description: '',
            type: 'AUTRE',
            format: 'PDF',
            obligatoire: true,
            version: ''
        };
    }

    showNotificationMessage(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        this.notificationMessage = message;
        this.notificationType = type;
        this.showNotification = true;
        setTimeout(() => {
            this.showNotification = false;
        }, 3000);
    }

    getFraisTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            'FIXE': 'Fixe',
            'PERCENTAGE': 'Pourcentage',
            'FORFAITAIRE': 'Forfaitaire'
        };
        return labels[type] || type;
    }

    getFrequenceLabel(frequence: string): string {
        const labels: Record<string, string> = {
            'MENSUEL': 'Mensuel',
            'TRIMESTRIEL': 'Trimestriel',
            'ANNUEL': 'Annuel',
            'PONCTUEL': 'Ponctuel'
        };
        return labels[frequence] || frequence;
    }

    getTotalFrais(): number {
        if (!this.category?.frais) return 0;
        return this.category.frais.reduce((sum: number, f: Frais) => sum + f.montant, 0);
    }

    getCategoryColor(code: string): string {
        const colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
            hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#16293a';
    }
}