import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ServicePublic,
    Utilisateur,
    Categorie,
    TypeRNF,
    PaiementRNF
} from '../../models/service-public.model';
import { ServicesPublicsService } from '../../services/services-publics.service';

export interface Activite {
    id: number;
    type: 'paiement' | 'utilisateur' | 'categorie' | 'type-rnf' | 'system';
    title: string;
    user: string;
    date: Date;
    details?: string;
}

export interface DemandeEnAttente {
    id: number;
    reference: string;
    type: string;
    objet: string;
    demandeur: string;
    emailDemandeur: string;
    dateDemande: Date;
    priorite: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'CRITIQUE';
    statut: 'EN_ATTENTE' | 'EN_COURS' | 'VALIDEE' | 'REJETEE';
    description?: string;
    documents?: string[];
}

@Component({
    selector: 'app-services-publics-detail',
    standalone: false,
    templateUrl: './services-publics-detail.component.html',
    styleUrls: ['./services-publics-detail.component.scss']
})
export class ServicesPublicsDetailComponent implements OnInit, OnDestroy {

    service: ServicePublic | undefined;
    loading = false;
    notFound = false;

    // Module actif
    activeModule: string = 'apercu';

    // ============================================================
    // PAGINATION
    // ============================================================
    usersCurrentPage: number = 1;
    usersItemsPerPage: number = 10;
    usersTotalPages: number = 0;

    categoriesCurrentPage: number = 1;
    categoriesItemsPerPage: number = 10;
    categoriesTotalPages: number = 0;

    typesRNFCurrentPage: number = 1;
    typesRNFItemsPerPage: number = 10;
    typesRNFTotalsPages: number = 0;

    paiementsCurrentPage: number = 1;
    paiementsItemsPerPage: number = 10;
    paiementsTotalPages: number = 0;

    demandesCurrentPage: number = 1;
    demandesItemsPerPage: number = 10;
    demandesTotalPages: number = 0;

    activitiesCurrentPage: number = 1;
    activitiesItemsPerPage: number = 12;
    activityTypeFilter: string = '';

    // ============================================================
    // ACTIVITÉS EN TEMPS RÉEL
    // ============================================================
    allActivities: Activite[] = [];
    private activityInterval: any;
    private activityCounter: number = 0;

    // ============================================================
    // EXPORT
    // ============================================================
    exportLoading: boolean = false;

    // Notification
    showNotification: boolean = false;
    notificationMessage: string = '';
    notificationType: 'success' | 'error' | 'info' = 'success';

    // Fiche Type RNF (aperçu rapide)
    viewingTypeRNF: TypeRNF | null = null;

    // Fiche Demande (aperçu rapide)
    viewingDemande: DemandeEnAttente | null = null;

    readonly Math = Math;

    // Types pour getRandomItem
    private activityTypes: ('paiement' | 'utilisateur' | 'categorie' | 'type-rnf')[] =
        ['paiement', 'utilisateur', 'categorie', 'type-rnf'];

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
                this.notFound = !data;
                this.loading = false;
                if (this.service) {
                    this.initPagination();
                    this.initActivities();
                    this.startActivityRealtime();
                }
            },
            error: () => {
                this.notFound = true;
                this.loading = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.stopActivityRealtime();
    }

    // ============================================================
    // INITIALISATION
    // ============================================================

    initPagination(): void {
        this.usersTotalPages = Math.ceil((this.service?.utilisateurs?.length || 0) / this.usersItemsPerPage);
        if (this.usersTotalPages === 0) this.usersTotalPages = 1;

        this.categoriesTotalPages = Math.ceil((this.service?.categories?.length || 0) / this.categoriesItemsPerPage);
        if (this.categoriesTotalPages === 0) this.categoriesTotalPages = 1;

        this.typesRNFTotalsPages = Math.ceil((this.service?.typesRNF?.length || 0) / this.typesRNFItemsPerPage);
        if (this.typesRNFTotalsPages === 0) this.typesRNFTotalsPages = 1;

        this.paiementsTotalPages = Math.ceil((this.service?.paiements?.length || 0) / this.paiementsItemsPerPage);
        if (this.paiementsTotalPages === 0) this.paiementsTotalPages = 1;

        this.demandesTotalPages = Math.ceil((this.service?.demandesEnAttente?.length || 0) / this.demandesItemsPerPage);
        if (this.demandesTotalPages === 0) this.demandesTotalPages = 1;
    }

    // ============================================================
    // ACTIVITÉS EN TEMPS RÉEL
    // ============================================================

    initActivities(): void {
        this.allActivities = this.generateInitialActivities();
        this.activityCounter = this.allActivities.length;
    }

    private getRandomItem<T>(array: T[], fallback: T): T {
        if (!array || array.length === 0) return fallback;
        return array[Math.floor(Math.random() * array.length)] || fallback;
    }

    generateInitialActivities(): Activite[] {
        const activities: Activite[] = [];
        const titles = [
            'Nouveau paiement RNF enregistré',
            'Utilisateur ajouté au système',
            'Nouvelle catégorie créée',
            'Type RNF mis à jour',
            'Paiement validé',
            'Nouvel utilisateur inscrit',
            'Catégorie modifiée',
            'Type RNF ajouté'
        ];
        const users = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Nkurunziza', 'Claire Niyonzima', 'Système'];

        for (let i = 0; i < 15; i++) {
            const date = new Date();
            date.setMinutes(date.getMinutes() - i * 3 - Math.random() * 10);
            activities.push({
                id: i + 1,
                type: this.getRandomItem(this.activityTypes, 'paiement'),
                title: this.getRandomItem(titles, 'Nouvelle activité'),
                user: this.getRandomItem(users, 'Système'),
                date: date
            });
        }
        return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    startActivityRealtime(): void {
        this.activityInterval = setInterval(() => {
            this.addNewActivity();
        }, 5000);
    }

    stopActivityRealtime(): void {
        if (this.activityInterval) {
            clearInterval(this.activityInterval);
            this.activityInterval = null;
        }
    }

    addNewActivity(): void {
        const titles = [
            'Nouveau paiement RNF enregistré',
            'Utilisateur ajouté au système',
            'Nouvelle catégorie créée',
            'Type RNF mis à jour',
            'Paiement validé',
            'Nouvel utilisateur inscrit'
        ];
        const users = ['Jean Ndayishimiye', 'Marie Uwimana', 'Pierre Nkurunziza', 'Claire Niyonzima', 'Système'];

        this.activityCounter++;
        const newActivity: Activite = {
            id: this.activityCounter,
            type: this.getRandomItem(this.activityTypes, 'paiement'),
            title: this.getRandomItem(titles, 'Nouvelle activité'),
            user: this.getRandomItem(users, 'Système'),
            date: new Date()
        };

        this.allActivities = [newActivity, ...this.allActivities];
        if (this.allActivities.length > 100) {
            this.allActivities = this.allActivities.slice(0, 100);
        }
    }

    getRecentActivities(limit: number = 10): Activite[] {
        return this.allActivities.slice(0, limit);
    }

    getAllActivitiesCount(): number {
        return this.allActivities.length;
    }

    // ============================================================
    // ONGLET "TOUTES LES ACTIVITÉS"
    // ============================================================

    get filteredActivities(): Activite[] {
        if (!this.activityTypeFilter) return this.allActivities;
        return this.allActivities.filter(a => a.type === this.activityTypeFilter);
    }

    get activitiesTotalPages(): number {
        return Math.max(1, Math.ceil(this.filteredActivities.length / this.activitiesItemsPerPage));
    }

    get paginatedActivities(): Activite[] {
        const start = (this.activitiesCurrentPage - 1) * this.activitiesItemsPerPage;
        return this.filteredActivities.slice(start, start + this.activitiesItemsPerPage);
    }

    setActivityFilter(type: string): void {
        this.activityTypeFilter = type;
        this.activitiesCurrentPage = 1;
    }

    changeActivitiesPage(page: number): void {
        if (page < 1 || page > this.activitiesTotalPages) return;
        this.activitiesCurrentPage = page;
    }

    getActivitiesPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.activitiesCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.activitiesTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    getActivityTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            'paiement': 'Paiement',
            'utilisateur': 'Utilisateur',
            'categorie': 'Catégorie',
            'type-rnf': 'Type RNF',
            'system': 'Système'
        };
        return labels[type] || type;
    }

    // ============================================================
    // MODULES - NAVIGATION
    // ============================================================

    switchModule(module: string): void {
        this.activeModule = module;
    }

    getTotalItems(): number {
        if (!this.service) return 0;
        return (this.service.utilisateurs?.length || 0) +
            (this.service.demandesEnAttente?.length || 0) +
            (this.service.categories?.length || 0) +
            (this.service.typesRNF?.length || 0) +
            (this.service.paiements?.length || 0);
    }

    // ============================================================
    // GETTERS PAGINATION
    // ============================================================

    get paginatedUtilisateurs(): Utilisateur[] {
        if (!this.service?.utilisateurs) return [];
        const start = (this.usersCurrentPage - 1) * this.usersItemsPerPage;
        return this.service.utilisateurs.slice(start, start + this.usersItemsPerPage);
    }

    get paginatedCategories(): Categorie[] {
        if (!this.service?.categories) return [];
        const start = (this.categoriesCurrentPage - 1) * this.categoriesItemsPerPage;
        return this.service.categories.slice(start, start + this.categoriesItemsPerPage);
    }

    get paginatedTypesRNF(): TypeRNF[] {
        if (!this.service?.typesRNF) return [];
        const start = (this.typesRNFCurrentPage - 1) * this.typesRNFItemsPerPage;
        return this.service.typesRNF.slice(start, start + this.typesRNFItemsPerPage);
    }

    get paginatedPaiements(): PaiementRNF[] {
        if (!this.service?.paiements) return [];
        const start = (this.paiementsCurrentPage - 1) * this.paiementsItemsPerPage;
        return this.service.paiements.slice(start, start + this.paiementsItemsPerPage);
    }

    get paginatedDemandes(): DemandeEnAttente[] {
        if (!this.service?.demandesEnAttente) return [];
        const start = (this.demandesCurrentPage - 1) * this.demandesItemsPerPage;
        return this.service.demandesEnAttente.slice(start, start + this.demandesItemsPerPage);
    }

    // ============================================================
    // MÉTHODES DE PAGINATION - UTILISATEURS
    // ============================================================

    changeUsersPage(page: number): void {
        if (page < 1 || page > this.usersTotalPages) return;
        this.usersCurrentPage = page;
    }

    getUsersPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.usersCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.usersTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // MÉTHODES DE PAGINATION - CATÉGORIES
    // ============================================================

    changeCategoriesPage(page: number): void {
        if (page < 1 || page > this.categoriesTotalPages) return;
        this.categoriesCurrentPage = page;
    }

    getCategoriesPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.categoriesCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.categoriesTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // MÉTHODES DE PAGINATION - TYPES RNF
    // ============================================================

    changeTypesRNFPage(page: number): void {
        if (page < 1 || page > this.typesRNFTotalsPages) return;
        this.typesRNFCurrentPage = page;
    }

    getTypesRNFPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.typesRNFCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.typesRNFTotalsPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // MÉTHODES DE PAGINATION - PAIEMENTS
    // ============================================================

    changePaiementsPage(page: number): void {
        if (page < 1 || page > this.paiementsTotalPages) return;
        this.paiementsCurrentPage = page;
    }

    getPaiementsPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.paiementsCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.paiementsTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // MÉTHODES DE PAGINATION - DEMANDES
    // ============================================================

    changeDemandesPage(page: number): void {
        if (page < 1 || page > this.demandesTotalPages) return;
        this.demandesCurrentPage = page;
    }

    getDemandesPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.demandesCurrentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.demandesTotalPages, start + maxVisible - 1);
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // ============================================================
    // STATISTIQUES DES DEMANDES
    // ============================================================

    getDemandesParPriorite(priorite: string): number {
        if (!this.service?.demandesEnAttente) return 0;
        return this.service.demandesEnAttente.filter((d: DemandeEnAttente) => d.priorite === priorite).length;
    }

    getDemandesParStatut(statut: string): number {
        if (!this.service?.demandesEnAttente) return 0;
        return this.service.demandesEnAttente.filter((d: DemandeEnAttente) => d.statut === statut).length;
    }

    // ============================================================
    // NAVIGATION
    // ============================================================

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    // ============================================================
    // ACTIONS SERVICE
    // ============================================================

    onEdit(): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id]);
        }
    }

    onActivate(): void {
        if (!this.service || this.service.actif) return;
        const updatedService = { ...this.service, actif: true };
        this.servicesPublicsService.update(updatedService).subscribe({
            next: () => {
                this.service = updatedService;
                this.addActivity('system', `Service "${this.service?.abreviation}" activé`);
            },
            error: () => { }
        });
    }

    onDeactivate(): void {
        if (!this.service || !this.service.actif) return;
        const updatedService = { ...this.service, actif: false };
        this.servicesPublicsService.update(updatedService).subscribe({
            next: () => {
                this.service = updatedService;
                this.addActivity('system', `Service "${this.service?.abreviation}" désactivé`);
            },
            error: () => { }
        });
    }

    // ============================================================
    // ACTIONS UTILISATEURS
    // ============================================================

    onAddUtilisateur(): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'utilisateur', 'new']);
        }
    }

    onEditUtilisateur(user: Utilisateur): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'utilisateur', user.id]);
        }
    }

    onToggleUtilisateur(user: Utilisateur): void {
        const newStatut = user.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF';
        if (this.service && this.service.utilisateurs) {
            this.service.utilisateurs = this.service.utilisateurs.map(u =>
                u.id === user.id ? { ...u, statut: newStatut as any } : u
            );
            this.addActivity(user.prenom + ' ' + user.nom, `Statut de l'utilisateur changé en ${newStatut}`);
            this.initPagination();
        }
    }

    onDeleteUtilisateur(user: Utilisateur): void {
        if (!this.service || !this.service.utilisateurs) return;
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`)) {
            this.service.utilisateurs = this.service.utilisateurs.filter(u => u.id !== user.id);
            this.addActivity('system', `Utilisateur "${user.prenom} ${user.nom}" supprimé`);
            this.initPagination();
        }
    }

    // ============================================================
    // ACTIONS CATÉGORIES
    // ============================================================

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
        this.addActivity('system', `Catégorie "${category.nom}" ${category.actif ? 'activée' : 'désactivée'}`);
    }

    getCategoryColor(code: string): string {
        const colors = ['#16293a', '#a9803d', '#386a4e', '#9c4033', '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e'];
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
            hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#16293a';
    }

    // ============================================================
    // ACTIONS TYPES RNF
    // ============================================================

    onAddTypeRNF(): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'type-rnf', 'new']);
        }
    }

    onViewTypeRNF(type: TypeRNF): void {
        this.viewingTypeRNF = type;
    }

    closeTypeRNFModal(): void {
        this.viewingTypeRNF = null;
    }

    onEditTypeRNF(type: TypeRNF): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'type-rnf', type.id]);
        }
    }

    onToggleTypeRNF(type: TypeRNF): void {
        type.actif = !type.actif;
        this.addActivity('system', `Type RNF "${type.libelle}" ${type.actif ? 'activé' : 'désactivé'}`);
    }

    // ============================================================
    // ACTIONS PAIEMENTS
    // ============================================================

    onAddPaiement(): void {
        if (this.service) {
            this.router.navigate(['/services-publics/edit', this.service.id, 'paiement', 'new']);
        }
    }

    getTypeRNFNom(typeRNFId: number): string {
        const type = this.service?.typesRNF?.find(t => t.id === typeRNFId);
        return type?.libelle || 'N/A';
    }

    getSousTypeRNFNom(sousTypeRNFId?: number): string {
        if (!sousTypeRNFId) return 'N/A';
        for (const type of this.service?.typesRNF || []) {
            const sousType = type.sousTypes?.find(st => st.id === sousTypeRNFId);
            if (sousType) return sousType.nom;
        }
        return 'N/A';
    }

    getTotalPaiements(): number {
        if (!this.service?.paiements) return 0;
        return this.service.paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
    }

    // ============================================================
    // ACTIONS DEMANDES
    // ============================================================

    onViewDemande(demande: DemandeEnAttente): void {
        this.viewingDemande = demande;
    }

    closeDemandeModal(): void {
        this.viewingDemande = null;
    }

    onTraiterDemande(demande: DemandeEnAttente): void {
        demande.statut = 'EN_COURS';
        this.addActivity('system', `Demande "${demande.reference}" mise en cours de traitement`);
    }

    onRejeterDemande(demande: DemandeEnAttente): void {
        if (confirm(`Êtes-vous sûr de vouloir rejeter la demande "${demande.reference}" ?`)) {
            demande.statut = 'REJETEE';
            this.addActivity('system', `Demande "${demande.reference}" rejetée`);
        }
    }

    onValiderDemande(demande: DemandeEnAttente): void {
        if (confirm(`Êtes-vous sûr de vouloir valider la demande "${demande.reference}" ?`)) {
            demande.statut = 'VALIDEE';
            this.addActivity('system', `Demande "${demande.reference}" validée`);
        }
    }

    // ============================================================
    // EXPORT
    // ============================================================

    exportUsers(): void {
        this.exportData('UTILISATEURS', 'export_utilisateurs');
    }

    exportCategories(): void {
        this.exportData('CATEGORIES', 'export_categories');
    }

    exportTypesRNF(): void {
        this.exportData('TYPES_RNF', 'export_types_rnf');
    }

    exportPaiements(): void {
        this.exportData('PAIEMENTS', 'export_paiements');
    }

    exportDemandes(): void {
        this.exportData('DEMANDES', 'export_demandes');
    }

    private exportData(type: string, fileName: string): void {
        this.exportLoading = true;
        const serviceName = this.service?.abreviation || 'service';

        setTimeout(() => {
            this.exportLoading = false;
            console.log(`Export ${type} du service ${serviceName} terminé avec succès.`);
            this.addActivity('system', `Export ${type} effectué`);

            this.showNotification = true;
            this.notificationMessage = `Export ${type} terminé avec succès !`;
            this.notificationType = 'success';
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        }, 1500);
    }

    // ============================================================
    // GESTION DES ACTIVITÉS
    // ============================================================

    private addActivity(user: string, action: string): void {
        const newActivity: Activite = {
            id: ++this.activityCounter,
            type: 'system',
            title: action,
            user: user,
            date: new Date()
        };
        this.allActivities = [newActivity, ...this.allActivities];
        if (this.allActivities.length > 100) {
            this.allActivities = this.allActivities.slice(0, 100);
        }
    }

    // ============================================================
    // UTILITAIRES
    // ============================================================

    getServiceColor(abreviation: string): string {
        if (!abreviation) return '#16293a';
        const colors: string[] = [
            '#16293a', '#a9803d', '#386a4e', '#9c4033',
            '#2c5b76', '#6b4d2e', '#5c6b3f', '#7c5a2e',
            '#46586a', '#85661f', '#2f4f5e', '#734531'
        ];
        let hash = 0;
        for (let i = 0; i < abreviation.length; i++) {
            hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length] || '#16293a';
    }

    closeNotification(): void {
        this.showNotification = false;
    }
}