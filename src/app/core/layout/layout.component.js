var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// src/app/core/layout/layout.component.ts
import { Component, HostListener } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';
var LayoutComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-layout',
            templateUrl: './layout.component.html',
            styleUrls: ['./layout.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _onResize_decorators;
    var _handleDocumentClick_decorators;
    var _handleKeyboardEvent_decorators;
    var LayoutComponent = _classThis = /** @class */ (function () {
        function LayoutComponent_1(authService, router, activatedRoute, searchService, notificationService, elementRef) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.router = router;
            this.activatedRoute = activatedRoute;
            this.searchService = searchService;
            this.notificationService = notificationService;
            this.elementRef = elementRef;
            this.currentDate = new Date(2026, 6, 15);
            this.currentTime = '';
            this.currentDay = '';
            this.isSidebarOpen = true;
            this.isDarkMode = true;
            this.baseTitle = 'IBLOPAY — Administration';
            this.moduleTitle = null;
            this.currentModuleKey = null;
            this.searchQuery = '';
            this.isSearchOpen = false;
            this.searchResults$ = this.searchService.results$;
            // Notifications
            this.isNotifOpen = false;
            this.notifications$ = this.notificationService.getForModule(null);
            this.unreadCount$ = this.notificationService.unreadCountForModule(null);
            this.menuItems = [
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
            this.generateMockNotifications();
        }
        Object.defineProperty(LayoutComponent_1.prototype, "pageTitle", {
            get: function () {
                return this.moduleTitle ? "".concat(this.baseTitle, " \u2014 ").concat(this.moduleTitle) : this.baseTitle;
            },
            enumerable: false,
            configurable: true
        });
        LayoutComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.initClock();
            this.loadTheme();
            this.updateRouteContext();
            this.routerSubscription = this.router.events
                .pipe(filter(function (e) { return e instanceof NavigationEnd; }))
                .subscribe(function () { return _this.updateRouteContext(); });
            // Nettoyage auto toutes les 5 minutes
            this.cleanupSubscription = interval(300000).subscribe(function () {
                var now = new Date();
                var twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                _this.notificationService.cleanup(twentyFourHoursAgo);
            });
            // Log pour vérifier les notifications
            this.notifications$.subscribe(function (notifs) {
                console.log('📊 Notifications dans le composant:', notifs.length);
            });
        };
        LayoutComponent_1.prototype.ngOnDestroy = function () {
            if (this.clockSubscription) {
                this.clockSubscription.unsubscribe();
            }
            if (this.routerSubscription) {
                this.routerSubscription.unsubscribe();
            }
            if (this.cleanupSubscription) {
                this.cleanupSubscription.unsubscribe();
            }
        };
        LayoutComponent_1.prototype.generateMockNotifications = function () {
            var _this = this;
            setTimeout(function () {
                var now = new Date();
                var notifications = [
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
                notifications.forEach(function (n) {
                    _this.notificationService.add(n);
                });
            }, 1000);
        };
        LayoutComponent_1.prototype.updateRouteContext = function () {
            var _a, _b;
            var route = this.activatedRoute.root;
            var moduleKey = null;
            while (route.firstChild) {
                route = route.firstChild;
                var data = route.snapshot.data;
                if (data && data['module']) {
                    moduleKey = data['module'];
                }
            }
            var currentUrl = (_b = (_a = this.router.url) === null || _a === void 0 ? void 0 : _a.split('?')[0]) !== null && _b !== void 0 ? _b : '';
            var title = null;
            for (var _i = 0, _c = this.menuItems; _i < _c.length; _i++) {
                var item = _c[_i];
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
        };
        LayoutComponent_1.prototype.initClock = function () {
            var _this = this;
            this.updateClock();
            this.clockSubscription = interval(1000).subscribe(function () {
                _this.updateClock();
            });
        };
        LayoutComponent_1.prototype.updateClock = function () {
            var now = new Date();
            var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            this.currentDay = "".concat(days[this.currentDate.getDay()], " ").concat(this.currentDate.getDate(), " ").concat(months[this.currentDate.getMonth()], " ").concat(this.currentDate.getFullYear());
            this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        };
        LayoutComponent_1.prototype.toggleSidebar = function () {
            this.isSidebarOpen = !this.isSidebarOpen;
        };
        LayoutComponent_1.prototype.closeSidebar = function () {
            this.isSidebarOpen = false;
        };
        LayoutComponent_1.prototype.onResize = function (event) {
            var width = event.target.innerWidth;
            if (width <= 900) {
                this.isSidebarOpen = false;
            }
            else {
                this.isSidebarOpen = true;
            }
        };
        Object.defineProperty(LayoutComponent_1.prototype, "menuToggleIcon", {
            get: function () {
                return this.isSidebarOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LayoutComponent_1.prototype, "themeToggleIcon", {
            get: function () {
                return this.isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            },
            enumerable: false,
            configurable: true
        });
        LayoutComponent_1.prototype.toggleTheme = function () {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('light-mode', !this.isDarkMode);
            localStorage.setItem('iblopay_theme', this.isDarkMode ? 'dark' : 'light');
        };
        LayoutComponent_1.prototype.loadTheme = function () {
            var savedTheme = localStorage.getItem('iblopay_theme');
            if (savedTheme === 'light') {
                this.isDarkMode = false;
                document.body.classList.add('light-mode');
            }
            else {
                this.isDarkMode = true;
                document.body.classList.remove('light-mode');
            }
        };
        LayoutComponent_1.prototype.onSearchInput = function () {
            this.isSearchOpen = true;
            this.searchService.search(this.currentModuleKey || 'global', this.searchQuery);
        };
        LayoutComponent_1.prototype.onSearchFocus = function () {
            this.isSearchOpen = true;
        };
        LayoutComponent_1.prototype.selectSearchResult = function (result) {
            this.isSearchOpen = false;
            this.searchQuery = '';
            this.searchService.clear();
            this.router.navigate(Array.isArray(result.link) ? result.link : [result.link]);
        };
        LayoutComponent_1.prototype.toggleNotifications = function () {
            this.isNotifOpen = !this.isNotifOpen;
            this.isSearchOpen = false;
            console.log('🔔 Toggle notifications:', this.isNotifOpen);
        };
        LayoutComponent_1.prototype.openNotification = function (notification) {
            console.log('📌 Ouvrir notification:', notification.title);
            this.notificationService.markAsRead(notification.id);
            this.isNotifOpen = false;
            if (notification.link) {
                var link = Array.isArray(notification.link) ? notification.link : [notification.link];
                this.router.navigate(link);
            }
        };
        // ✅ Marquer toutes les notifications comme lues
        LayoutComponent_1.prototype.markAllNotificationsRead = function (event) {
            var _this = this;
            event.stopPropagation();
            console.log('🔔 Marquer tout comme lu - Module:', this.currentModuleKey);
            this.notificationService.markAllAsRead();
            // Supprimer les notifications lues après un petit délai
            setTimeout(function () {
                _this.notificationService.removeAllRead();
                console.log('✅ Notifications lues supprimées');
            }, 300);
        };
        // ✅ Supprimer toutes les notifications
        LayoutComponent_1.prototype.clearAllNotifications = function (event) {
            event.stopPropagation();
            console.log('🗑️ Supprimer toutes les notifications');
            this.notificationService.clear();
            this.isNotifOpen = false;
        };
        LayoutComponent_1.prototype.handleDocumentClick = function (event) {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                return;
            }
            var target = event.target;
            if (!target.closest('.search-box')) {
                this.isSearchOpen = false;
            }
            if (!target.closest('.icon-btn-wrap')) {
                this.isNotifOpen = false;
            }
        };
        LayoutComponent_1.prototype.handleKeyboardEvent = function (event) {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                var searchInput = document.querySelector('.search-input');
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
        };
        LayoutComponent_1.prototype.logout = function () {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
        };
        return LayoutComponent_1;
    }());
    __setFunctionName(_classThis, "LayoutComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _onResize_decorators = [HostListener('window:resize', ['$event'])];
        _handleDocumentClick_decorators = [HostListener('document:click', ['$event'])];
        _handleKeyboardEvent_decorators = [HostListener('window:keydown', ['$event'])];
        __esDecorate(_classThis, null, _onResize_decorators, { kind: "method", name: "onResize", static: false, private: false, access: { has: function (obj) { return "onResize" in obj; }, get: function (obj) { return obj.onResize; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDocumentClick_decorators, { kind: "method", name: "handleDocumentClick", static: false, private: false, access: { has: function (obj) { return "handleDocumentClick" in obj; }, get: function (obj) { return obj.handleDocumentClick; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleKeyboardEvent_decorators, { kind: "method", name: "handleKeyboardEvent", static: false, private: false, access: { has: function (obj) { return "handleKeyboardEvent" in obj; }, get: function (obj) { return obj.handleKeyboardEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LayoutComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LayoutComponent = _classThis;
}();
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map