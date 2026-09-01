export const AGENT_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  STATUS_COLORS: {
    ACTIVE: '#4caf50',
    PENDING: '#ff9800',
    SUSPENDED: '#ffc107',
    BLOCKED: '#f44336',
    INACTIVE: '#9e9e9e',
    TERMINATED: '#d32f2f'
  },
  STATUS_LABELS: {
    ACTIVE: 'Actif',
    PENDING: 'En attente',
    SUSPENDED: 'Suspendu',
    BLOCKED: 'Bloqué',
    INACTIVE: 'Inactif',
    TERMINATED: 'Résilié'
  },
  TYPE_LABELS: {
    SUPER_AGENT: 'Super Agent',
    MASTER_AGENT: 'Master Agent',
    AGENT: 'Agent',
    SUB_AGENT: 'Sous-agent',
    RETAILER: 'Détaillant'
  }
} as const;