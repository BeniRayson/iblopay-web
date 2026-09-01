export interface StatCard {
    id: string;
    icon: string;
    iconColor: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'cyan' | 'gold' | 'pink';
    label: string;
    value: string | number;
    change: number;
    changeLabel: string;
    highlight?: boolean;
    isService?: boolean;
    link: string;
}

export interface ProvinceData {
    name: string;
    amount: number;
    emoji?: string;
    color?: string;
}

export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

export interface ChartDataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
}

export interface ServicePublic {
    name: string;
    total: number;
    traitees: number;
    enCours: number;
    rejetees: number;
}

export interface ActivityItem {
    label: string;
    value: string | number;
}

export interface QuickAccess {
    id: string;
    label: string;
    icon: string;
    link: string;
    colorClass: string;
}

export interface DashboardStats {
    users: StatCard;
    agents: StatCard;
    superAgents: StatCard;
    merchants: StatCard;
    transactions: StatCard;
    stateCommission: StatCard;
    iblopayCommission: StatCard;
    publicServices: StatCard;
}

export interface ProvinceStatistics {
    depots: ProvinceData[];
    transactions: ProvinceData[];
    commissions: ProvinceData[];
}