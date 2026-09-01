import { KpiData, QuickAction, TransactionTableRow, TransactionDetail, TraceabilityData, TopActor, OperationTypeStats, AlertNotification, SystemActivity, UserRole, TransactionFilter } from '../models/transaction-hub.model';

export const MOCK_KPI_DATA: KpiData = {
  volumeTotal: {
    label: 'Volume total (aujourd\'hui)',
    value: '356 750 000 BIF',
    delta: '+12,45%',
    deltaType: 'increase',
    extra: 'vs hier',
    sparkline: [320, 345, 330, 360, 340, 356, 356]
  },
  transactionsToday: {
    label: 'Transactions (aujourd\'hui)',
    value: '1 256',
    delta: '+8,21%',
    deltaType: 'increase',
    extra: 'vs hier',
    sparkline: [1100, 1150, 1120, 1200, 1180, 1256, 1256]
  },
  succeeded: {
    label: 'Réussies',
    value: '1 150',
    delta: '+10,32%',
    deltaType: 'increase',
    extra: '91,56% · +10,32% vs hier'
  },
  failed: {
    label: 'Échouées',
    value: '28',
    delta: '-2,14%',
    deltaType: 'decrease',
    extra: '2,23% · -2,14% vs hier'
  },
  pending: {
    label: 'En attente',
    value: '78',
    delta: '+3,55%',
    deltaType: 'increase',
    extra: '6,21% · +3,55% vs hier'
  },
  depositsToValidate: {
    label: 'Dépôts à valider',
    value: '15',
    delta: '0',
    deltaType: 'neutral',
    link: 'Voir la liste ›'
  },
  trustAccountBalance: {
    label: 'Solde Trust Account',
    value: '4 782 550 000 BIF',
    delta: '0',
    deltaType: 'neutral',
    extra: 'À la banque'
  },
  eMoneyInCirculation: {
    label: 'e-Money en circulation',
    value: '12 865 450 300 BIF',
    delta: '0',
    deltaType: 'neutral',
    extra: 'Total dans les wallets'
  }
};

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
  { label: 'Attribuer e-Money (Bordereau)', subtitle: 'Approvisionner un Super Agent', type: 'primary', action: 'attribuer', icon: 'bi-wallet2' },
  { label: 'Réattribuer e-Money', subtitle: 'Corriger une transaction', type: 'outline-green', action: 'reattribuer', icon: 'bi-arrow-repeat' },
  { label: 'Demandes d\'approvisionnement', subtitle: 'À valider', type: 'plain', badge: 15, action: 'demandes', icon: 'bi-inbox' },
  { label: 'Relevés bancaires', subtitle: '', type: 'plain', action: 'releves', icon: 'bi-file-earmark-text' },
  { label: 'Rapports et exports', subtitle: '', type: 'plain', action: 'rapports', icon: 'bi-bar-chart' },
  { label: 'Journal d\'audit', subtitle: '', type: 'plain', action: 'audit', icon: 'bi-journal-text' }
];

export const MOCK_TRANSACTIONS_TABLE: TransactionTableRow[] = [
  { dateTime: '18/06/2024 10:45', transactionNo: 'TX-2024-06-001', type: 'Transfert', typePillColor: '#2f6fed', sender: 'Jean Baptiste M', recipient: 'Alice Niyonzima', amount: '250 000 BIF', fee: '2 500 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Bujumbura', category: 'mobile_money' },
  { dateTime: '18/06/2024 10:30', transactionNo: 'TX-2024-06-002', type: 'Cash In', typePillColor: '#7c3aed', sender: 'Agent Gitega Centre', recipient: 'Pierre Havugimana', amount: '500 000 BIF', fee: '0 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'attribué', location: 'Gitega', category: 'agent' },
  { dateTime: '18/06/2024 10:15', transactionNo: 'TX-2024-06-003', type: 'Cash Out', typePillColor: '#ea580c', sender: 'David Manirakiza', recipient: 'Agent Ngozi Ville', amount: '100 000 BIF', fee: '2 000 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Ngozi', category: 'agent' },
  { dateTime: '18/06/2024 10:00', transactionNo: 'TX-2024-06-004', type: 'Paiement NFC', typePillColor: '#0d9488', sender: 'Christine Uwimana', recipient: 'Marchant A', amount: '45 000 BIF', fee: '450 BIF', status: 'Réversé', statusPillColor: '#f97316', channel: 'card', location: 'Ruyigi', category: 'card' },
  { dateTime: '18/06/2024 09:45', transactionNo: 'TX-2024-06-005', type: 'Appro. SA', typePillColor: '#7c3aed', sender: 'Admin Iblopay', recipient: 'SA Jean Bosco', amount: '2 000 000 BIF', fee: '0 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'attribué', location: 'Bujumbura', category: 'super_agent' },
  { dateTime: '18/06/2024 09:30', transactionNo: 'TX-2024-06-006', type: 'Paiement facture', typePillColor: '#0d9488', sender: 'Emmanuel Ndayizeye', recipient: 'REGIDESO SA', amount: '35 000 BIF', fee: '350 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Kirundo', category: 'mobile_money' },
  { dateTime: '18/06/2024 09:15', transactionNo: 'TX-2024-06-007', type: 'Transfert', typePillColor: '#2f6fed', sender: 'Fatima Baziyaremye', recipient: 'Gratien Niyongabo', amount: '75 000 BIF', fee: '750 BIF', status: 'Échouée', statusPillColor: '#e14b4b', channel: 'wallet', location: 'Muyinga', category: 'mobile_money' },
  { dateTime: '18/06/2024 09:00', transactionNo: 'TX-2024-06-008', type: 'Cash In', typePillColor: '#7c3aed', sender: 'Agent Rumonge Est', recipient: 'Hélène Bukuru', amount: '150 000 BIF', fee: '0 BIF', status: 'En attente', statusPillColor: '#e0932c', channel: 'attribué', location: 'Rumonge', category: 'agent' },
  { dateTime: '18/06/2024 08:45', transactionNo: 'TX-2024-06-009', type: 'Cash Out', typePillColor: '#ea580c', sender: 'Innocent Mugisha', recipient: 'Agent Kayanza Centre', amount: '80 000 BIF', fee: '1 600 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Kayanza', category: 'agent' },
  { dateTime: '18/06/2024 08:30', transactionNo: 'TX-2024-06-010', type: 'Paiement NFC', typePillColor: '#0d9488', sender: 'Jacqueline Ndayizeye', recipient: 'Marchant B', amount: '22 500 BIF', fee: '225 BIF', status: 'Réversé', statusPillColor: '#f97316', channel: 'card', location: 'Bujumbura', category: 'card' },
  { dateTime: '18/06/2024 08:15', transactionNo: 'TX-2024-06-011', type: 'Transfert', typePillColor: '#2f6fed', sender: 'Karangwa Eric', recipient: 'Laurent Ntahonsigaye', amount: '320 000 BIF', fee: '3 200 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Makamba', category: 'mobile_money' },
  { dateTime: '18/06/2024 08:00', transactionNo: 'TX-2024-06-012', type: 'Cash In', typePillColor: '#7c3aed', sender: 'Agent Bujumbura Nord', recipient: 'Marie Goretti N.', amount: '1 000 000 BIF', fee: '0 BIF', status: 'Réversé', statusPillColor: '#f97316', channel: 'attribué', location: 'Bujumbura', category: 'agent' },
  { dateTime: '18/06/2024 07:45', transactionNo: 'TX-2024-06-013', type: 'Cash Out', typePillColor: '#ea580c', sender: 'Noël Bigirimana', recipient: 'Agent Bururi Ville', amount: '200 000 BIF', fee: '4 000 BIF', status: 'Échouée', statusPillColor: '#e14b4b', channel: 'wallet', location: 'Bururi', category: 'agent' },
  { dateTime: '18/06/2024 07:30', transactionNo: 'TX-2024-06-014', type: 'Paiement facture', typePillColor: '#0d9488', sender: 'Odette Mbonimpa', recipient: 'ONATEL', amount: '50 000 BIF', fee: '500 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Cibitoke', category: 'mobile_money' },
  { dateTime: '18/06/2024 07:15', transactionNo: 'TX-2024-06-015', type: 'Transfert', typePillColor: '#2f6fed', sender: 'Pascal Niyonzima', recipient: 'Quitterie Ntahobari', amount: '45 000 BIF', fee: '450 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Muramvya', category: 'mobile_money' },
  { dateTime: '18/06/2024 07:00', transactionNo: 'TX-2024-06-016', type: 'Appro. SA', typePillColor: '#7c3aed', sender: 'Admin Iblopay', recipient: 'SA Eric Nkundwa', amount: '3 000 000 BIF', fee: '0 BIF', status: 'En attente', statusPillColor: '#e0932c', channel: 'attribué', location: 'Bujumbura', category: 'super_agent' },
  { dateTime: '18/06/2024 06:45', transactionNo: 'TX-2024-06-017', type: 'Paiement NFC', typePillColor: '#0d9488', sender: 'Rose Nduwimana', recipient: 'Marchant C', amount: '12 000 BIF', fee: '120 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'card', location: 'Gitega', category: 'card' },
  { dateTime: '18/06/2024 06:30', transactionNo: 'TX-2024-06-018', type: 'Cash In', typePillColor: '#7c3aed', sender: 'Agent Rutana Centre', recipient: 'Salvatore Hakizimana', amount: '75 000 BIF', fee: '0 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'attribué', location: 'Rutana', category: 'agent' },
  { dateTime: '18/06/2024 06:15', transactionNo: 'TX-2024-06-019', type: 'Cash Out', typePillColor: '#ea580c', sender: 'Théophile Ntirandekura', recipient: 'Agent Karusi Est', amount: '150 000 BIF', fee: '3 000 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Karusi', category: 'agent' },
  { dateTime: '18/06/2024 06:00', transactionNo: 'TX-2024-06-020', type: 'Transfert', typePillColor: '#2f6fed', sender: 'Ursule Niyonsaba', recipient: 'Valentin Miburo', amount: '95 000 BIF', fee: '950 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Bubanza', category: 'mobile_money' },
  { dateTime: '17/06/2024 16:30', transactionNo: 'TX-2024-06-021', type: 'Paiement NFC', typePillColor: '#0d9488', sender: 'Alain Manzi', recipient: 'Super Marché Central', amount: '155 000 BIF', fee: '0 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'card', location: 'Bujumbura', category: 'card' },
  { dateTime: '17/06/2024 15:00', transactionNo: 'TX-2024-06-022', type: 'Transfert Agent→SA', typePillColor: '#7c3aed', sender: 'Agent Jean-Pierre', recipient: 'SA Alphonse', amount: '850 000 BIF', fee: '4 250 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'attribué', location: 'Bujumbura', category: 'super_agent' },
  { dateTime: '17/06/2024 14:20', transactionNo: 'TX-2024-06-023', type: 'Paiement Mobile', typePillColor: '#2f6fed', sender: 'Béatrice N.', recipient: 'Marchant D', amount: '65 000 BIF', fee: '650 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'wallet', location: 'Gitega', category: 'mobile_money' },
  { dateTime: '17/06/2024 11:45', transactionNo: 'TX-2024-06-024', type: 'Cash In Agent', typePillColor: '#7c3aed', sender: 'Agent Ngozi Ouest', recipient: 'Fabien N.', amount: '300 000 BIF', fee: '0 BIF', status: 'Réussie', statusPillColor: '#1fae5b', channel: 'attribué', location: 'Ngozi', category: 'agent' },
  { dateTime: '17/06/2024 10:10', transactionNo: 'TX-2024-06-025', type: 'Paiement NFC', typePillColor: '#0d9488', sender: 'Gérard M.', recipient: 'Station Total', amount: '78 500 BIF', fee: '0 BIF', status: 'Réversé', statusPillColor: '#f97316', channel: 'card', location: 'Bujumbura', category: 'card' },
];

export const MOCK_TRANSACTION_DETAIL: TransactionDetail = {
  transactionId: 'TX-2024-06-001',
  status: 'Réussie',
  statusColor: '#1fae5b',
  timestamp: '18 juin 2024 à 10:45',
  typeTag: 'Transfert Wallet à Wallet',
  typeTagColor: '#2f6fed',
  amountTotal: '250 000 BIF',
  fee: '2 500 BIF',
  commission: '1 250 BIF',
  netAmount: '246 250 BIF',
  sender: {
    initials: 'JM',
    name: 'Jean Baptiste M.',
    phone: '+257 79 123 456',
    walletId: 'WLT-001-2024',
    balanceBefore: '1 250 000 BIF',
    balanceAfter: '997 500 BIF',
    province: 'Bujumbura Mairie',
    commune: 'Mukaza',
    agency: 'Agence Bujumbura Centre'
  },
  recipient: {
    initials: 'AN',
    name: 'Alice Niyonzima',
    phone: '+257 71 456 789',
    walletId: 'WLT-002-2024',
    balanceBefore: '500 000 BIF',
    balanceAfter: '748 750 BIF',
    province: 'Gitega',
    commune: 'Gitega',
    agency: 'Agence Gitega'
  },
  channel: 'Application Mobile',
  reference: 'TRF-2024-06-001',
  ip: '197.255.123.45',
  device: 'Samsung Galaxy S24 / Android 14',
  location: 'Bujumbura, Kiririmiro',
  validatedBy: 'Admin Iblopay',
  validatedByAvatar: 'AI',
  validatedAt: '18 juin 2024 à 10:45',
  attachments: []
};

export const MOCK_TRACEABILITY: TraceabilityData = {
  steps: [
    { icon: '💰', timestamp: '17 juin 2024 14:00', description: 'Approvisionnement SA', amount: '+5 000 000 BIF', signedAmount: '+5 000 000 BIF', reference: 'AP-2024-06-001' },
    { icon: '🔄', timestamp: '18 juin 2024 08:00', description: 'Transfert → Agent', amount: '-1 000 000 BIF', signedAmount: '-1 000 000 BIF', reference: 'TRF-2024-06-002' },
    { icon: '⬇️', timestamp: '18 juin 2024 09:30', description: 'Cash In Client', amount: '+500 000 BIF', signedAmount: '+500 000 BIF', reference: 'CIN-2024-06-003' },
    { icon: '📶', timestamp: '18 juin 2024 10:45', description: 'Paiement NFC', amount: '-45 000 BIF', signedAmount: '-45 000 BIF', reference: 'PAY-2024-06-004' }
  ],
  initialAmount: '5 000 000 BIF',
  currentAmount: '4 455 000 BIF',
  stepCount: 4,
  totalDuration: '20h 45min',
  status: 'En cours',
  statusColor: '#e0932c'
};

export const MOCK_TOP_AGENTS: TopActor[] = [
  { rank: 1, name: 'SA Jean Bosco', volume: 15500000, volumeFormatted: '15 500 000 BIF', barPercent: 100 },
  { rank: 2, name: 'SA Eric Nkundwa', volume: 12200000, volumeFormatted: '12 200 000 BIF', barPercent: 79 },
  { rank: 3, name: 'SA Marie Claire', volume: 9800000, volumeFormatted: '9 800 000 BIF', barPercent: 63 },
  { rank: 4, name: 'SA Pierre Hakizimana', volume: 7500000, volumeFormatted: '7 500 000 BIF', barPercent: 48 },
  { rank: 5, name: 'SA Alice Niyonzima', volume: 6200000, volumeFormatted: '6 200 000 BIF', barPercent: 40 }
];

export const MOCK_TOP_CLIENTS: TopActor[] = [
  { rank: 1, name: 'Emmanuel Ndayizeye', volume: 3200000, volumeFormatted: '3 200 000 BIF', barPercent: 100 },
  { rank: 2, name: 'Christine Uwimana', volume: 2800000, volumeFormatted: '2 800 000 BIF', barPercent: 88 },
  { rank: 3, name: 'David Manirakiza', volume: 2100000, volumeFormatted: '2 100 000 BIF', barPercent: 66 },
  { rank: 4, name: 'Rose Nduwimana', volume: 1850000, volumeFormatted: '1 850 000 BIF', barPercent: 58 },
  { rank: 5, name: 'Théophile N.', volume: 1500000, volumeFormatted: '1 500 000 BIF', barPercent: 47 }
];

export const MOCK_TOP_MERCHANTS: TopActor[] = [
  { rank: 1, name: 'Marchant A', volume: 4500000, volumeFormatted: '4 500 000 BIF', barPercent: 100 },
  { rank: 2, name: 'Marchant B', volume: 3200000, volumeFormatted: '3 200 000 BIF', barPercent: 71 },
  { rank: 3, name: 'Marchant C', volume: 2800000, volumeFormatted: '2 800 000 BIF', barPercent: 62 },
  { rank: 4, name: 'Marchant D', volume: 1900000, volumeFormatted: '1 900 000 BIF', barPercent: 42 },
  { rank: 5, name: 'Marchant E', volume: 1200000, volumeFormatted: '1 200 000 BIF', barPercent: 27 }
];

export const MOCK_OPERATION_TYPES: OperationTypeStats[] = [
  { type: 'Cash In', color: '#7c3aed', count: 385, percentage: 30.7 },
  { type: 'Transfert', color: '#2f6fed', count: 320, percentage: 25.5 },
  { type: 'Cash Out', color: '#ea580c', count: 215, percentage: 17.1 },
  { type: 'Paiement NFC', color: '#0d9488', count: 180, percentage: 14.3 },
  { type: 'Autres', color: '#6b7280', count: 156, percentage: 12.4 }
];

export const MOCK_ALERTS: AlertNotification[] = [
  { icon: '💳', message: '15 dépôts en attente de validation', link: 'Voir la liste' },
  { icon: '⚠️', message: '3 transactions suspectes détectées', link: 'Voir la liste' },
  { icon: '↩️', message: '2 réattributions en cours', link: 'Voir la liste' }
];

export const MOCK_SYSTEM_ACTIVITIES: SystemActivity[] = [
  { icon: '✅', action: 'Approvisionnement validé', actor: 'SA Super Agent 07', time: '10:40' },
  { icon: '↩️', action: 'Transaction réattribuée', actor: 'Admin Iblopay → Agent 12', time: '10:35' },
  { icon: '💰', action: 'Cash In effectué', actor: 'Client Dupont → Agent 15', time: '10:30' },
  { icon: '📶', action: 'Paiement NFC complété', actor: 'Client Mugisha → Marchant C', time: '10:25' },
  { icon: '🔁', action: 'Transfert wallet', actor: 'Mme Fatima → M. Gratien', time: '10:20' }
];