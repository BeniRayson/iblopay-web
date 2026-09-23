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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
var DashboardService = function () {
    var _classDecorators = [Injectable({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DashboardService = _classThis = /** @class */ (function () {
        function DashboardService_1() {
            var _this = this;
            this.statsSubject = new BehaviorSubject(this.getDefaultStats());
            this.stats$ = this.statsSubject.asObservable();
            this.provinceStatsSubject = new BehaviorSubject(this.getDefaultProvinceStats());
            this.provinceStats$ = this.provinceStatsSubject.asObservable();
            // Simuler des mises à jour en temps réel
            setInterval(function () {
                _this.simulateUpdates();
            }, 30000);
        }
        DashboardService_1.prototype.getStats = function () {
            return this.stats$;
        };
        DashboardService_1.prototype.getProvinceStats = function () {
            return this.provinceStats$;
        };
        DashboardService_1.prototype.getPublicServices = function () {
            var services = [
                { name: 'Permis de construire', total: 28456, traitees: 24987, enCours: 2675, rejetees: 794 },
                { name: 'Certificat de résidence', total: 24125, traitees: 21652, enCours: 1842, rejetees: 631 },
                { name: 'Extrait de naissance', total: 18984, traitees: 16852, enCours: 1556, rejetees: 576 },
                { name: 'Certificat de célibat', total: 15236, traitees: 13497, enCours: 1210, rejetees: 529 },
                { name: 'Autorisation d\'exploiter', total: 11655, traitees: 9357, enCours: 1170, rejetees: 1128 }
            ];
            return of(services);
        };
        DashboardService_1.prototype.getActivities = function () {
            var activities = [
                { label: 'Transactions effectuées', value: 412589 },
                { label: 'Volume total', value: '98 600 000 Fbu' },
                { label: 'Nouveaux clients enregistrés', value: 32458 },
                { label: 'Dépôts effectués', value: '45 200 000 Fbu' },
                { label: 'Retraits effectués', value: '32 100 000 Fbu' }
            ];
            return of(activities);
        };
        DashboardService_1.prototype.getQuickAccess = function () {
            var items = [
                { id: 'create-user', label: 'Créer un utilisateur', icon: '👤', link: '/users/create', colorClass: 'b1' },
                { id: 'create-agent', label: 'Créer un agent', icon: '👥', link: '/agents/create', colorClass: 'b9' },
                { id: 'create-merchant', label: 'Créer un marchand', icon: '🛒', link: '/merchants/create', colorClass: 'b3' },
                { id: 'create-super-agent', label: 'Créer un super agent', icon: '⭐', link: '/super-agents/create', colorClass: 'b4' },
                { id: 'create-service', label: 'Créer un service public', icon: '🏛️', link: '/services/create', colorClass: 'b5' },
                { id: 'intra-agricole', label: 'Intra Agricole', icon: '🌾', link: '/intra-agricole', colorClass: 'b2' },
                { id: 'global-report', label: 'Rapport global', icon: '📊', link: '/reports', colorClass: 'b7' },
                { id: 'system-settings', label: 'Paramètres système', icon: '⚙️', link: '/settings', colorClass: 'b8' },
                { id: 'transactions', label: 'Transactions', icon: '🔄', link: '/transactions', colorClass: 'b6' }
            ];
            return of(items);
        };
        DashboardService_1.prototype.getRecentRegistrations = function () {
            var items = [
                { label: 'Nouveau client', value: 'Marie Nduwimana' },
                { label: 'Nouvel agent', value: 'Samuel Niyonkuru' },
                { label: 'Nouveau marchand', value: 'Smart Shop' },
                { label: 'Nouveau super agent', value: 'Innocent Manirakiza' },
                { label: 'Nouveau service public', value: 'Permis de construire' }
            ];
            return of(items);
        };
        DashboardService_1.prototype.getPendingRequests = function () {
            var items = [
                { label: 'Ouverture de compte marchand', value: 12 },
                { label: 'Demande d\'augmentation de plafond', value: 8 },
                { label: 'Validation de documents KYC', value: 23 },
                { label: 'Demande d\'habilitation agent', value: 5 },
                { label: 'Création de service public', value: 7 }
            ];
            return of(items);
        };
        DashboardService_1.prototype.refreshData = function () {
            this.simulateUpdates();
            return of(true);
        };
        DashboardService_1.prototype.getDefaultStats = function () {
            return {
                users: {
                    id: 'users',
                    icon: '👥',
                    iconColor: 'blue',
                    label: 'Utilisateurs',
                    value: 1248532,
                    change: 12.5,
                    changeLabel: 'vs mois',
                    link: '/users'
                },
                agents: {
                    id: 'agents',
                    icon: '🧑‍💼',
                    iconColor: 'green',
                    label: 'Agents',
                    value: 18532,
                    change: 8.3,
                    changeLabel: 'vs mois',
                    link: '/agents'
                },
                superAgents: {
                    id: 'super-agents',
                    icon: '⭐',
                    iconColor: 'purple',
                    label: 'Super Agents',
                    value: 1245,
                    change: 5.7,
                    changeLabel: 'vs mois',
                    link: '/super-agents'
                },
                merchants: {
                    id: 'merchants',
                    icon: '🛒',
                    iconColor: 'orange',
                    label: 'Marchands',
                    value: 45892,
                    change: 10.2,
                    changeLabel: 'vs mois',
                    link: '/merchants'
                },
                transactions: {
                    id: 'transactions',
                    icon: '🔄',
                    iconColor: 'teal',
                    label: 'Transactions (auj.)',
                    value: '523 690 000 Fbu',
                    change: 14.6,
                    changeLabel: 'vs hier',
                    link: '/transactions'
                },
                stateCommission: {
                    id: 'state-commission',
                    icon: '💰',
                    iconColor: 'cyan',
                    label: 'Commission État',
                    value: '1 245 800 000 Fbu',
                    change: 18.9,
                    changeLabel: 'vs mois',
                    highlight: true,
                    link: '/commissions'
                },
                iblopayCommission: {
                    id: 'iblopay-commission',
                    icon: '🏢',
                    iconColor: 'gold',
                    label: 'Commission IBLOPAY',
                    value: '2 229 100 000 Fbu',
                    change: 22.3,
                    changeLabel: 'vs mois',
                    highlight: true,
                    link: '/commissions'
                },
                publicServices: {
                    id: 'public-services',
                    icon: '🏛️',
                    iconColor: 'pink',
                    label: 'Services Publics',
                    value: 128456,
                    change: 15.2,
                    changeLabel: 'vs mois',
                    isService: true,
                    link: '/services-publics'
                }
            };
        };
        DashboardService_1.prototype.getDefaultProvinceStats = function () {
            return {
                depots: [
                    { name: 'Butanyerera', amount: 42300000, emoji: '📍', color: 'green' },
                    { name: 'Burunga', amount: 28700000, emoji: '📍', color: 'blue' },
                    { name: 'Buhumuza', amount: 22100000, emoji: '📍', color: 'orange' },
                    { name: 'Gitega', amount: 19800000, emoji: '📍', color: 'purple' },
                    { name: 'Bujumbura', amount: 122780000, emoji: '📍', color: 'gold' }
                ],
                transactions: [
                    { name: 'Butanyerera', amount: 98400000, emoji: '📍', color: 'blue' },
                    { name: 'Burunga', amount: 67200000, emoji: '📍', color: 'green' },
                    { name: 'Buhumuza', amount: 52800000, emoji: '📍', color: 'orange' },
                    { name: 'Gitega', amount: 45600000, emoji: '📍', color: 'purple' },
                    { name: 'Bujumbura', amount: 259690000, emoji: '📍', color: 'gold' }
                ],
                commissions: [
                    { name: 'Butanyerera', amount: 945000, emoji: '📍', color: 'purple' },
                    { name: 'Burunga', amount: 820000, emoji: '📍', color: 'cyan' },
                    { name: 'Buhumuza', amount: 680000, emoji: '📍', color: 'gold' },
                    { name: 'Gitega', amount: 590000, emoji: '📍', color: 'green' },
                    { name: 'Bujumbura', amount: 439900, emoji: '📍', color: 'blue' }
                ]
            };
        };
        DashboardService_1.prototype.simulateUpdates = function () {
            // Mettre à jour les stats avec de petites variations
            var current = this.statsSubject.value;
            // Simuler des changements aléatoires
            var randomChange = function (base, percent) {
                var factor = 1 + (Math.random() - 0.5) * 0.02;
                return Math.round(base * factor);
            };
            // Mise à jour des valeurs numériques
            if (typeof current.users.value === 'number') {
                current.users.value = randomChange(current.users.value, 0.02);
            }
            if (typeof current.agents.value === 'number') {
                current.agents.value = randomChange(current.agents.value, 0.02);
            }
            if (typeof current.superAgents.value === 'number') {
                current.superAgents.value = randomChange(current.superAgents.value, 0.02);
            }
            if (typeof current.merchants.value === 'number') {
                current.merchants.value = randomChange(current.merchants.value, 0.02);
            }
            if (typeof current.publicServices.value === 'number') {
                current.publicServices.value = randomChange(current.publicServices.value, 0.02);
            }
            // Mise à jour des commissions avec nouvelles valeurs
            var stateComm = 1245800000 + Math.round((Math.random() - 0.5) * 10000000);
            var iblopayComm = 2229100000 + Math.round((Math.random() - 0.5) * 20000000);
            current.stateCommission.value = stateComm.toLocaleString('fr-FR') + ' Fbu';
            current.iblopayCommission.value = iblopayComm.toLocaleString('fr-FR') + ' Fbu';
            this.statsSubject.next(current);
            // Mise à jour des provinces
            var provinceStats = this.provinceStatsSubject.value;
            provinceStats.depots.forEach(function (p) {
                p.amount += Math.round((Math.random() - 0.45) * 1500000);
                p.amount = Math.max(2000000, p.amount);
            });
            provinceStats.transactions.forEach(function (p) {
                p.amount += Math.round((Math.random() - 0.45) * 2500000);
                p.amount = Math.max(3000000, p.amount);
            });
            provinceStats.commissions.forEach(function (p) {
                p.amount += Math.round((Math.random() - 0.45) * 50000);
                p.amount = Math.max(200000, p.amount);
            });
            this.provinceStatsSubject.next(provinceStats);
        };
        return DashboardService_1;
    }());
    __setFunctionName(_classThis, "DashboardService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardService = _classThis;
}();
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map