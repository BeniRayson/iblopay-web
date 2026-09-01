import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
    StatCard,
    ProvinceData,
    ServicePublic,
    ActivityItem,
    QuickAccess,
    DashboardStats,
    ProvinceStatistics
} from '../models/dashboard.interface';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private statsSubject = new BehaviorSubject<DashboardStats>(this.getDefaultStats());
    stats$ = this.statsSubject.asObservable();

    private provinceStatsSubject = new BehaviorSubject<ProvinceStatistics>(this.getDefaultProvinceStats());
    provinceStats$ = this.provinceStatsSubject.asObservable();

    constructor() {
        // Simuler des mises à jour en temps réel
        setInterval(() => {
            this.simulateUpdates();
        }, 30000);
    }

    getStats(): Observable<DashboardStats> {
        return this.stats$;
    }

    getProvinceStats(): Observable<ProvinceStatistics> {
        return this.provinceStats$;
    }

    getPublicServices(): Observable<ServicePublic[]> {
        const services: ServicePublic[] = [
            { name: 'Permis de construire', total: 28456, traitees: 24987, enCours: 2675, rejetees: 794 },
            { name: 'Certificat de résidence', total: 24125, traitees: 21652, enCours: 1842, rejetees: 631 },
            { name: 'Extrait de naissance', total: 18984, traitees: 16852, enCours: 1556, rejetees: 576 },
            { name: 'Certificat de célibat', total: 15236, traitees: 13497, enCours: 1210, rejetees: 529 },
            { name: 'Autorisation d\'exploiter', total: 11655, traitees: 9357, enCours: 1170, rejetees: 1128 }
        ];
        return of(services);
    }

    getActivities(): Observable<ActivityItem[]> {
        const activities: ActivityItem[] = [
            { label: 'Transactions effectuées', value: 412589 },
            { label: 'Volume total', value: '98 600 000 Fbu' },
            { label: 'Nouveaux clients enregistrés', value: 32458 },
            { label: 'Dépôts effectués', value: '45 200 000 Fbu' },
            { label: 'Retraits effectués', value: '32 100 000 Fbu' }
        ];
        return of(activities);
    }

    getQuickAccess(): Observable<QuickAccess[]> {
        const items: QuickAccess[] = [
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
    }

    getRecentRegistrations(): Observable<ActivityItem[]> {
        const items: ActivityItem[] = [
            { label: 'Nouveau client', value: 'Marie Nduwimana' },
            { label: 'Nouvel agent', value: 'Samuel Niyonkuru' },
            { label: 'Nouveau marchand', value: 'Smart Shop' },
            { label: 'Nouveau super agent', value: 'Innocent Manirakiza' },
            { label: 'Nouveau service public', value: 'Permis de construire' }
        ];
        return of(items);
    }

    getPendingRequests(): Observable<ActivityItem[]> {
        const items: ActivityItem[] = [
            { label: 'Ouverture de compte marchand', value: 12 },
            { label: 'Demande d\'augmentation de plafond', value: 8 },
            { label: 'Validation de documents KYC', value: 23 },
            { label: 'Demande d\'habilitation agent', value: 5 },
            { label: 'Création de service public', value: 7 }
        ];
        return of(items);
    }

    refreshData(): Observable<boolean> {
        this.simulateUpdates();
        return of(true);
    }

    private getDefaultStats(): DashboardStats {
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
    }

    private getDefaultProvinceStats(): ProvinceStatistics {
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
    }

    private simulateUpdates(): void {
        // Mettre à jour les stats avec de petites variations
        const current = this.statsSubject.value;

        // Simuler des changements aléatoires
        const randomChange = (base: number, percent: number) => {
            const factor = 1 + (Math.random() - 0.5) * 0.02;
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
        const stateComm = 1245800000 + Math.round((Math.random() - 0.5) * 10000000);
        const iblopayComm = 2229100000 + Math.round((Math.random() - 0.5) * 20000000);
        current.stateCommission.value = stateComm.toLocaleString('fr-FR') + ' Fbu';
        current.iblopayCommission.value = iblopayComm.toLocaleString('fr-FR') + ' Fbu';

        this.statsSubject.next(current);

        // Mise à jour des provinces
        const provinceStats = this.provinceStatsSubject.value;
        provinceStats.depots.forEach(p => {
            p.amount += Math.round((Math.random() - 0.45) * 1500000);
            p.amount = Math.max(2000000, p.amount);
        });
        provinceStats.transactions.forEach(p => {
            p.amount += Math.round((Math.random() - 0.45) * 2500000);
            p.amount = Math.max(3000000, p.amount);
        });
        provinceStats.commissions.forEach(p => {
            p.amount += Math.round((Math.random() - 0.45) * 50000);
            p.amount = Math.max(200000, p.amount);
        });
        this.provinceStatsSubject.next(provinceStats);
    }
}