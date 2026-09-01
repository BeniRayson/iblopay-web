export const DASHBOARD_CONSTANTS = {
    // Périodes pour le graphique
    CHART_PERIODS: [
        { value: 7, label: '1 semaine' },
        { value: 14, label: '2 semaines' },
        { value: 21, label: '3 semaines' },
        { value: 30, label: '30 derniers jours' },
        { value: 45, label: '45 jours' },
        { value: 60, label: '60 jours' },
        { value: 90, label: '90 jours' }
    ],

    // Couleurs des statistiques — alignées sur la palette de marque
    // "soleil levant" du dashboard (voir dashboard.component.scss)
    STAT_COLORS: {
        blue: '#4C8DFF',
        green: '#2BC98A',
        purple: '#9B6BFF',
        orange: '#F2A93B',
        teal: '#14b8a6',
        cyan: '#4FD1E8',
        gold: '#F2B705',
        pink: '#ec4899'
    },

    // Messages
    WELCOME_MESSAGE: 'Vue d\'ensemble de toute la plateforme IBLOPAY',
    REFRESH_BUTTON: 'Actualiser'
};