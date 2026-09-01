// src/app/core/layout/layout.component.ts
import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { SearchService, SearchResult } from '../services/search.service';
import { NotificationService, AppNotification } from '../services/notification.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    currentDate: Date = new Date(2026, 6, 15);
    currentTime: string = '';
    currentDay: string = '';
    isSidebarOpen: boolean = true;
    isDarkMode: boolean = true;
    private clockSubscription?: Subscription;
    private routerSubscription?: Subscription;
    private cleanupSubscription?: Subscription;

    readonly baseTitle = 'IBLOPAY — Administration';
    moduleTitle: string | null = null;
    currentModuleKey: string | null = null;

    get pageTitle(): string {
        return this.moduleTitle ? `${this.baseTitle} — ${this.moduleTitle}` : this.baseTitle;
    }

    searchQuery: string = '';
    isSearchOpen: boolean = false;
    searchResults$: Observable<SearchResult[]> = this.searchService.results$;

    // Notifications
    isNotifOpen: boolean = false;
    notifications$: Observable<AppNotification[]> = this.notificationService.getForModule(null);
    unreadCount$: Observable<number> = this.notificationService.unreadCountForModule(null);

    menuItems = [
        { icon: 'fa-solid fa-gauge', label: 'Tableau de bord', link: '/dashboard' },
        { icon: 'fa-solid fa-users', label: 'Utilisateurs', link: '/users' },
        { icon: 'fa-solid fa-money-bill-transfer', label: 'Transactions', link: '/transactions' },
        { icon: 'fa-solid fa-coins', label: 'Commissions', link: '/commissions' },
        { icon: 'fa-solid fa-credit-card', label: 'Cartes', link: '/cards' },
        { icon: 'fa-solid fa-building-columns', label: 'Services publics', link: '/services-publics', badge: '12' },
        { icon: 'fa-solid fa-user-tie', label: 'Supers Agents', link: '/agents' },
        { icon: 'fa-solid fa-clock', label: 'Demandes en attente', link: '/requests', badge: '7' },
        { icon: 'fa-solid fa-chart-line', label: 'Rapports', link: '/reports' },
        { icon: 'fa-solid fa-gear', label: 'Paramètres', link: '/settings' }
    ];

    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private searchService: SearchService,
        private notificationService: NotificationService,
        private elementRef: ElementRef
    ) {
        this.generateMockNotifications();
    }

    ngOnInit(): void {
        this.initClock();
        this.loadTheme();
        this.updateRouteContext();
        
        this.routerSubscription = this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe(() => this.updateRouteContext());

        // Nettoyage auto toutes les 5 minutes
        this.cleanupSubscription = interval(300000).subscribe(() => {
            const now = new Date();
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            this.notificationService.cleanup(twentyFourHoursAgo);
        });

        // Log pour vérifier les notifications
        this.notifications$.subscribe(notifs => {
            console.log('📊 Notifications dans le composant:', notifs.length);
        });
    }

    ngOnDestroy(): void {
        if (this.clockSubscription) {
            this.clockSubscription.unsubscribe();
        }
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
        if (this.cleanupSubscription) {
            this.cleanupSubscription.unsubscribe();
        }
    }

    private generateMockNotifications(): void {
        setTimeout(() => {
            const now = new Date();

            const notifications: AppNotification[] = [
                {
                    id: 'notif-1',
                    title: '💰 Transaction importante',
                    message: 'Super Agent Jean Ndayishimiye a effectué un transfert de 15 000 000 Fbu',
                    type: 'transaction',
                    icon: 'fa-solid fa-money-bill-wave',
                    date: new Date(now.getTime() - 5 * 60000),
                    read: false,
                    link: ['/transactions', 'txn-001'],
                    module: 'transactions',
                    priority: 'high'
                },
                {
                    id: 'notif-2',
                    title: '👤 Nouveau client enregistré',
                    message: 'L\'agent Pierre Niyonzima a ouvert un compte pour Claire Mukiza',
                    type: 'user',
                    icon: 'fa-solid fa-user-plus',
                    date: new Date(now.getTime() - 15 * 60000),
                    read: false,
                    link: ['/users', 'user-123'],
                    module: 'users',
                    priority: 'medium'
                },
                {
                    id: 'notif-3',
                    title: '📊 Commission reçue',
                    message: 'Super Agent Marie Uwimana a reçu 450 000 Fbu de commission',
                    type: 'commission',
                    icon: 'fa-solid fa-percent',
                    date: new Date(now.getTime() - 45 * 60000),
                    read: false,
                    link: ['/commissions', 'com-045'],
                    module: 'commissions',
                    priority: 'medium'
                },
                {
                    id: 'notif-4',
                    title: '🏦 Dépôt en espèces',
                    message: 'L\'agent Alain Niyonzima a effectué un dépôt de 8 500 000 Fbu',
                    type: 'deposit',
                    icon: 'fa-solid fa-arrow-down',
                    date: new Date(now.getTime() - 2 * 3600000),
                    read: false,
                    link: ['/transactions', 'dep-045'],
                    module: 'transactions',
                    priority: 'high'
                },
                {
                    id: 'notif-5',
                    title: '🔄 Approvisionnement e-Money',
                    message: 'Wallet de Jean Ndayishimiye approvisionné de 10 000 000 Fbu',
                    type: 'fund',
                    icon: 'fa-solid fa-coins',
                    date: new Date(now.getTime() - 3 * 3600000),
                    read: false,
                    link: ['/users', 'user-001', 'fund'],
                    module: 'users',
                    priority: 'medium'
                },
                {
                    id: 'notif-6',
                    title: '⚠️ Alerte de sécurité',
                    message: 'Tentative de connexion suspecte détectée',
                    type: 'alert',
                    icon: 'fa-solid fa-shield-alt',
                    date: new Date(now.getTime() - 5 * 3600000),
                    read: false,
                    link: ['/settings', 'security'],
                    module: 'settings',
                    priority: 'high'
                },
                {
                    id: 'notif-7',
                    title: '🌟 Nouveau Super Agent',
                    message: 'David Niyongabo promu Super Agent',
                    type: 'user',
                    icon: 'fa-solid fa-user-cog',
                    date: new Date(now.getTime() - 6 * 3600000),
                    read: false,
                    link: ['/users', 'user-045'],
                    module: 'users',
                    priority: 'medium'
                },
                {
                    id: 'notif-8',
                    title: '🔄 Transfert inter-agents',
                    message: 'Claire Mukiza a transféré 2 500 000 Fbu',
                    type: 'transaction',
                    icon: 'fa-solid fa-exchange-alt',
                    date: new Date(now.getTime() - 8 * 3600000),
                    read: false,
                    link: ['/transactions', 'txn-056'],
                    module: 'transactions',
                    priority: 'medium'
                }
            ];

            notifications.forEach(n => {
                this.notificationService.add(n);
            });
        }, 1000);
    }

    private updateRouteContext(): void {
        let route = this.activatedRoute.root;
        let moduleKey: string | null = null;

        while (route.firstChild) {
            route = route.firstChild;
            const data = route.snapshot.data;
            if (data && data['module']) {
                moduleKey = data['module'];
            }
        }

        const currentUrl = this.router.url?.split('?')[0] ?? '';
        let title: string | null = null;
        for (const item of this.menuItems) {
            if (currentUrl.startsWith(item.link)) {
                title = item.label;
                break;
            }
        }

        this.moduleTitle = title;
        this.currentModuleKey = moduleKey;

        this.searchQuery = '';
        this.searchService.clear();
        this.notifications$ = this.notificationService.getForModule(moduleKey);
        this.unreadCount$ = this.notificationService.unreadCountForModule(moduleKey);
    }

    private initClock(): void {
        this.updateClock();
        this.clockSubscription = interval(1000).subscribe(() => {
            this.updateClock();
        });
    }

    private updateClock(): void {
        const now = new Date();
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

        this.currentDay = `${days[this.currentDate.getDay()]} ${this.currentDate.getDate()} ${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    toggleSidebar(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    closeSidebar(): void {
        this.isSidebarOpen = false;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        const width = (event.target as Window).innerWidth;
        if (width <= 900) {
            this.isSidebarOpen = false;
        } else {
            this.isSidebarOpen = true;
        }
    }

    get menuToggleIcon(): string {
        return this.isSidebarOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }

    get themeToggleIcon(): string {
        return this.isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    toggleTheme(): void {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('light-mode', !this.isDarkMode);
        localStorage.setItem('iblopay_theme', this.isDarkMode ? 'dark' : 'light');
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem('iblopay_theme');
        if (savedTheme === 'light') {
            this.isDarkMode = false;
            document.body.classList.add('light-mode');
        } else {
            this.isDarkMode = true;
            document.body.classList.remove('light-mode');
        }
    }

    onSearchInput(): void {
        this.isSearchOpen = true;
        this.searchService.search(this.currentModuleKey || 'global', this.searchQuery);
    }

    onSearchFocus(): void {
        this.isSearchOpen = true;
    }

    selectSearchResult(result: SearchResult): void {
        this.isSearchOpen = false;
        this.searchQuery = '';
        this.searchService.clear();
        this.router.navigate(Array.isArray(result.link) ? result.link : [result.link]);
    }

    toggleNotifications(): void {
        this.isNotifOpen = !this.isNotifOpen;
        this.isSearchOpen = false;
        console.log('🔔 Toggle notifications:', this.isNotifOpen);
    }

    openNotification(notification: AppNotification): void {
        console.log('📌 Ouvrir notification:', notification.title);
        this.notificationService.markAsRead(notification.id);
        this.isNotifOpen = false;
        if (notification.link) {
            const link = Array.isArray(notification.link) ? notification.link : [notification.link];
            this.router.navigate(link);
        }
    }

    // ✅ Marquer toutes les notifications comme lues
    markAllNotificationsRead(event: Event): void {
        event.stopPropagation();
        console.log('🔔 Marquer tout comme lu - Module:', this.currentModuleKey);
        this.notificationService.markAllAsRead();
        // Supprimer les notifications lues après un petit délai
        setTimeout(() => {
            this.notificationService.removeAllRead();
            console.log('✅ Notifications lues supprimées');
        }, 300);
    }

    // ✅ Supprimer toutes les notifications
    clearAllNotifications(event: Event): void {
        event.stopPropagation();
        console.log('🗑️ Supprimer toutes les notifications');
        this.notificationService.clear();
        this.isNotifOpen = false;
    }

    @HostListener('document:click', ['$event'])
    handleDocumentClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            return;
        }
        const target = event.target as HTMLElement;
        if (!target.closest('.search-box')) {
            this.isSearchOpen = false;
        }
        if (!target.closest('.icon-btn-wrap')) {
            this.isNotifOpen = false;
        }
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.querySelector('.search-input') as HTMLInputElement;
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
                this.isSearchOpen = true;
            }
        }
        if (event.key === 'Escape') {
            this.isSearchOpen = false;
            this.isNotifOpen = false;
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}