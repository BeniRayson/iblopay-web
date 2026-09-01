import { Injectable } from '@angular/core';
import {
  ReportDefinition, TransactionRow, CommissionRow, ReconciliationRow,
  CashDeclarationRow, OfflineBatchRow, AuditLogRow, KpiCard,
  CashManagementRow, ComplianceRow, KycUserRow, ChartDataPoint
} from '../models/report.models';

@Injectable({ providedIn: 'root' })
export class ReportDummyData {

  readonly reports: ReportDefinition[] = [
    { id: 'financial', name: 'Transactions & Flux', description: 'Volumes et montants par type d\'opération, évolution dans le temps', category: 'financial', icon: 'fa-solid fa-money-bill-transfer', roles: ['admin', 'super_agent'], route: 'financial' },
    { id: 'commissions', name: 'Commissions Agents', description: 'Commissions gagnées par agent / super agent sur une période', category: 'commissions', icon: 'fa-solid fa-coins', roles: ['admin', 'super_agent', 'agent'], route: 'commissions' },
    { id: 'trust-account', name: 'Trust Account & Réconciliation', description: 'Solde e-money vs solde bancaire, écarts constatés', category: 'trust_account', icon: 'fa-solid fa-scale-balanced', roles: ['admin'], route: 'trust-account' },
    { id: 'cash-management', name: 'Gestion Cash Agents', description: 'Montants déclarés vs attendus par agent, alertes d\'écart', category: 'cash_management', icon: 'fa-solid fa-sack-dollar', roles: ['admin', 'super_agent'], route: 'cash-management' },
    { id: 'offline-pos', name: 'Transactions Offline / POS', description: 'Lots traités hors-ligne, taux de succès/échec', category: 'offline_pos', icon: 'fa-solid fa-tablet-screen-button', roles: ['admin', 'super_agent'], route: 'offline-pos' },
    { id: 'compliance', name: 'Conformité & Audit', description: 'Actions sensibles récentes, cartes blacklistées', category: 'compliance_audit', icon: 'fa-solid fa-shield-halved', roles: ['admin'], route: 'compliance' },
    { id: 'kyc-users', name: 'KYC & Base Utilisateurs', description: 'Utilisateurs par statut et rôle, inscriptions', category: 'kyc_users', icon: 'fa-solid fa-users-gear', roles: ['admin', 'super_agent'], route: 'kyc-users' },
  ];

  readonly categoryLabels: Record<string, string> = {
    financial: 'Financier & Transactions',
    commissions: 'Commissions & Revenus',
    trust_account: 'Trust Account & Réconciliation',
    cash_management: 'Gestion Cash',
    offline_pos: 'Offline / POS',
    compliance_audit: 'Conformité & Audit',
    kyc_users: 'KYC & Utilisateurs',
  };

  readonly categoryColors: Record<string, string> = {
    financial: '#3b82f6',
    commissions: '#22c55e',
    trust_account: '#a855f7',
    cash_management: '#eab308',
    offline_pos: '#f97316',
    compliance_audit: '#ef4444',
    kyc_users: '#06b6d4',
  };

  readonly agents: { id: string; name: string }[] = [
    { id: 'AGT-001', name: 'Ndayishimiye Jean' },
    { id: 'AGT-002', name: 'Niyonzima Claude' },
    { id: 'AGT-003', name: 'Irakoze David' },
    { id: 'AGT-004', name: 'Bukuru Alphonse' },
    { id: 'AGT-005', name: 'Nizigiyimana Pierre' },
    { id: 'AGT-006', name: 'Hakizimana François' },
    { id: 'AGT-007', name: 'Mpoyi Kévin' },
    { id: 'AGT-008', name: 'Uwimana Béatrice' },
    { id: 'AGT-009', name: 'Manirakiza Eric' },
    { id: 'AGT-010', name: 'Bazompa Jérôme' },
    { id: 'AGT-011', name: 'Mugisha Aimable' },
    { id: 'AGT-012', name: 'Havyarimana Salvator' },
  ];

  // ─── HELPERS ─────────────────────────────────────────
  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randDate(daysAgo: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - this.rand(0, daysAgo));
    return d;
  }

  private pickAgent(): { id: string; name: string } {
    const idx = this.rand(0, this.agents.length - 1);
    return this.agents[idx]!;
  }

  private pick<T>(arr: readonly T[]): T {
    const idx = this.rand(0, arr.length - 1);
    return arr[idx]!;
  }

  getAgentOptions(): { id: string; name: string }[] {
    return [{ id: '', name: 'Tous les agents' }, ...this.agents];
  }

  // ─── 1. FINANCIAL / TRANSACTIONS ─────────────────────
  getFinancialKpis(): KpiCard[] {
    return [
      { label: 'Volume Total', value: 523690000, prefix: '', suffix: ' BIF', change: 8.1, changeLabel: 'vs période préc.', icon: 'fa-solid fa-arrows-rotate', color: '#3b82f6' },
      { label: 'Nombre Transactions', value: 2847, change: 5.3, changeLabel: 'vs période préc.', icon: 'fa-solid fa-hashtag', color: '#22c55e' },
      { label: 'Montant Moyen', value: 183950, prefix: '', suffix: ' BIF', change: 2.7, changeLabel: 'vs période préc.', icon: 'fa-solid fa-chart-line', color: '#a855f7' },
      { label: 'Taux de Succès', value: '97.8', suffix: '%', change: 0.5, changeLabel: 'vs période préc.', icon: 'fa-solid fa-check-circle', color: '#22c55e' },
    ];
  }

  getFinancialChartTrend(): ChartDataPoint[] {
    const days = ['Lun 14', 'Mar 15', 'Mer 16', 'Jeu 17', 'Ven 18', 'Sam 19', 'Dim 20'];
    return days.map(d => ({
      label: d,
      value: this.rand(55000000, 95000000),
      secondary: this.rand(40000000, 75000000),
    }));
  }

  getFinancialByType(): ChartDataPoint[] {
    return [
      { label: 'DEPOSIT', value: 35 },
      { label: 'WITHDRAWAL', value: 22 },
      { label: 'TRANSFER', value: 18 },
      { label: 'PAYMENT_NFC', value: 12 },
      { label: 'SWEEP', value: 6 },
      { label: 'COMMISSION', value: 4 },
      { label: 'REIMBURSEMENT', value: 3 },
    ];
  }

  getFinancialTransactions(): TransactionRow[] {
    const types = ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT_NFC', 'SWEEP', 'COMMISSION', 'REIMBURSEMENT'] as const;
    const statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'FAILED', 'REVERSED'] as const;
    const modes = ['NFC', 'USSD', 'MOBILE_APP', 'WEB', 'AGENT'] as const;
    const rows: TransactionRow[] = [];
    for (let i = 0; i < 85; i++) {
      const type = this.pick(types);
      rows.push({
        reference: `TXN-${String(202600000 + i)}`,
        date: this.randDate(90),
        type,
        fromWallet: `WALLET-${this.rand(100, 9999)}`,
        toWallet: `WALLET-${this.rand(100, 9999)}`,
        amount: this.rand(1000, 5000000),
        fee: type === 'WITHDRAWAL' ? this.rand(500, 5000) : this.rand(0, 2000),
        status: this.pick(statuses),
        paymentMode: this.pick(modes),
      });
    }
    return rows.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // ─── 2. COMMISSIONS ──────────────────────────────────
  getCommissionKpis(): KpiCard[] {
    return [
      { label: 'Commissions Totales', value: 3474900, suffix: ' BIF', change: 12.4, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-coins', color: '#22c55e' },
      { label: 'Agents Commissionnés', value: 186, change: 4.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-users', color: '#3b82f6' },
      { label: 'Commission Moyenne', value: 18682, suffix: ' BIF', change: 3.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-chart-simple', color: '#a855f7' },
      { label: 'Taux de Crédit', value: '94.2', suffix: '%', change: 1.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-percent', color: '#22c55e' },
    ];
  }

  getCommissionChart(): ChartDataPoint[] {
    return [
      { label: 'Fév', value: 2100000, secondary: 1800000 },
      { label: 'Mar', value: 2400000, secondary: 2000000 },
      { label: 'Avr', value: 2800000, secondary: 2200000 },
      { label: 'Mai', value: 2600000, secondary: 2400000 },
      { label: 'Juin', value: 3100000, secondary: 2500000 },
      { label: 'Juil', value: 3470000, secondary: 2700000 },
    ];
  }

  getCommissionByAgent(): ChartDataPoint[] {
    return this.agents.slice(0, 8).map(a => ({
      label: a.name.split(' ')[0]!,
      value: this.rand(150000, 850000),
    }));
  }

  getCommissionRows(): CommissionRow[] {
    const rows: CommissionRow[] = [];
    const statuses = ['PENDING', 'CREDITED', 'CREDITED', 'CREDITED', 'FAILED'] as const;
    for (let i = 0; i < 55; i++) {
      const agent = this.pickAgent();
      rows.push({
        agentName: agent.name,
        agentId: agent.id,
        transactionRef: `TXN-${String(202600000 + i)}`,
        date: this.randDate(60),
        amount: this.rand(5000, 150000),
        rate: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
        commissionType: Math.random() > 0.3 ? 'AGENT_COMMISSION' : 'SUPER_AGENT_COMMISSION',
        status: this.pick(statuses),
      });
    }
    return rows.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // ─── 3. TRUST ACCOUNT ────────────────────────────────
  getTrustAccountKpis(): KpiCard[] {
    return [
      { label: 'Solde e-Money', value: 1256000000, suffix: ' BIF', icon: 'fa-solid fa-wallet', color: '#3b82f6' },
      { label: 'Solde Bancaire', value: 1254800000, suffix: ' BIF', icon: 'fa-solid fa-building-columns', color: '#22c55e' },
      { label: 'Écart', value: 1200000, prefix: '', suffix: ' BIF', change: -15.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-triangle-exclamation', color: '#eab308' },
      { label: 'Jours sans écart', value: 3, icon: 'fa-solid fa-calendar-check', color: '#a855f7' },
    ];
  }

  getReconciliationChart(): ChartDataPoint[] {
    return [
      { label: 'J-7', value: 1256000000, secondary: 1254800000 },
      { label: 'J-6', value: 1253000000, secondary: 1251000000 },
      { label: 'J-5', value: 1258000000, secondary: 1259000000 },
      { label: 'J-4', value: 1260000000, secondary: 1257000000 },
      { label: 'J-3', value: 1259000000, secondary: 1258000000 },
      { label: 'J-2', value: 1255000000, secondary: 1253000000 },
      { label: 'J-1', value: 1256000000, secondary: 1254800000 },
    ];
  }

  getReconciliationRows(): ReconciliationRow[] {
    const rows: ReconciliationRow[] = [];
    const statuses = ['OK', 'OK', 'OK', 'DISCREPANCY'] as const;
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const emoney = 1250000000 + this.rand(0, 20000000);
      const bank = emoney + this.rand(-1500000, 1500000);
      rows.push({
        date: d,
        totalEmoney: emoney,
        trustAccountBalance: bank,
        difference: Math.abs(emoney - bank),
        status: Math.abs(emoney - bank) < 500000 ? 'OK' : 'DISCREPANCY',
      });
    }
    return rows;
  }

  // ─── 4. CASH MANAGEMENT ────────────────────────────
  getCashManagementKpis(): KpiCard[] {
    return [
      { label: 'Déclarations Totales', value: 482, change: 6.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-file-invoice', color: '#eab308' },
      { label: 'Montant Total Déclaré', value: 184200000, suffix: ' BIF', icon: 'fa-solid fa-sack-dollar', color: '#22c55e' },
      { label: 'Écart Total', value: 4850000, prefix: '', suffix: ' BIF', change: -23.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-triangle-exclamation', color: '#ef4444' },
      { label: 'Alertes Non Résolues', value: 7, icon: 'fa-solid fa-bell', color: '#f97316' },
    ];
  }

  getCashManagementChart(): ChartDataPoint[] {
    return [
      { label: 'Lun', value: 18200000, secondary: 17600000 },
      { label: 'Mar', value: 19500000, secondary: 19200000 },
      { label: 'Mer', value: 16800000, secondary: 17000000 },
      { label: 'Jeu', value: 20100000, secondary: 19500000 },
      { label: 'Ven', value: 22300000, secondary: 21000000 },
      { label: 'Sam', value: 14500000, secondary: 15000000 },
    ];
  }

  getCashManagementRows(): CashManagementRow[] {
    const statuses = ['VALIDATED', 'VALIDATED', 'VALIDATED', 'REJECTED', 'ESCALATED', 'PENDING'] as const;
    const rows: CashManagementRow[] = [];
    for (let i = 0; i < 45; i++) {
      const agent = this.pickAgent();
      const expected = this.rand(500000, 8000000);
      const declared = expected + this.rand(-500000, 300000);
      rows.push({
        agentName: agent.name,
        agentId: agent.id,
        declaredAmount: declared,
        expectedAmount: expected,
        difference: declared - expected,
        status: this.pick(statuses),
        date: this.randDate(30),
      });
    }
    return rows.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // ─── 5. OFFLINE / POS ────────────────────────────────
  getOfflineKpis(): KpiCard[] {
    return [
      { label: 'Lots Reçus', value: 234, change: 11.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-database', color: '#f97316' },
      { label: 'Transactions Offline', value: 2847, change: 4.6, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-hashtag', color: '#3b82f6' },
      { label: 'Taux de Succès', value: '96.3', suffix: '%', change: 2.1, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-check-circle', color: '#22c55e' },
      { label: 'Terminaux Actifs', value: 42, change: 3, changeLabel: 'nouveaux ce mois', icon: 'fa-solid fa-tablet-screen-button', color: '#a855f7' },
    ];
  }

  getOfflineChart(): ChartDataPoint[] {
    return [
      { label: 'Lun', value: 28, secondary: 26 },
      { label: 'Mar', value: 35, secondary: 33 },
      { label: 'Mer', value: 22, secondary: 21 },
      { label: 'Jeu', value: 40, secondary: 38 },
      { label: 'Ven', value: 45, secondary: 42 },
      { label: 'Sam', value: 52, secondary: 50 },
    ];
  }

  getOfflineByStatus(): ChartDataPoint[] {
    return [
      { label: 'COMPLETED', value: 68 },
      { label: 'PROCESSING', value: 18 },
      { label: 'FAILED', value: 10 },
      { label: 'RECEIVED', value: 4 },
    ];
  }

  getOfflineRows(): OfflineBatchRow[] {
    const statuses = ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PROCESSING', 'FAILED', 'RECEIVED'] as const;
    const rows: OfflineBatchRow[] = [];
    for (let i = 0; i < 40; i++) {
      rows.push({
        batchId: `BATCH-${String(2400 + i)}`,
        posTerminalId: `POS-${this.rand(100, 999)}-${String(this.rand(10, 99))}`,
        transactionCount: this.rand(5, 150),
        totalAmount: this.rand(50000, 5000000),
        status: this.pick(statuses),
        receivedAt: this.randDate(30),
      });
    }
    return rows.sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime());
  }

  // ─── 6. COMPLIANCE / AUDIT ──────────────────────────
  getComplianceKpis(): KpiCard[] {
    return [
      { label: 'Actions Sensibles', value: 142, change: -8.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-shield-halved', color: '#ef4444' },
      { label: 'Cartes Blacklistées', value: 23, change: 2, changeLabel: 'ce mois-ci', icon: 'fa-solid fa-ban', color: '#f97316' },
      { label: 'Tentatives Bloquées', value: 87, change: 15.6, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-lock', color: '#3b82f6' },
      { label: 'Alertes Actives', value: 5, icon: 'fa-solid fa-exclamation-triangle', color: '#eab308' },
    ];
  }

  getComplianceChart(): ChartDataPoint[] {
    return [
      { label: 'Fév', value: 85, secondary: 156 },
      { label: 'Mar', value: 92, secondary: 148 },
      { label: 'Avr', value: 78, secondary: 162 },
      { label: 'Mai', value: 102, secondary: 138 },
      { label: 'Juin', value: 88, secondary: 145 },
      { label: 'Juil', value: 65, secondary: 142 },
    ];
  }

  getComplianceByAction(): ChartDataPoint[] {
    return [
      { label: 'LOGIN_FAILED', value: 38 },
      { label: 'CARD_BLOCK', value: 14 },
      { label: 'WALLET_UPDATE', value: 22 },
      { label: 'EMISSION_CREATE', value: 8 },
      { label: 'PIN_CHANGE', value: 18 },
      { label: 'ROLE_CHANGE', value: 5 },
    ];
  }

  getComplianceRows(): ComplianceRow[] {
    const actions = ['LOGIN_FAILED', 'CARD_BLOCK', 'WALLET_UPDATE', 'EMISSION_CREATE', 'PIN_CHANGE', 'ROLE_CHANGE'] as const;
    const users = ['Super Admin', 'Ndayishimiye J.', 'Niyonzima C.', 'Irakoze D.', 'System', 'Bukuru A.'] as const;
    const rows: ComplianceRow[] = [];
    for (let i = 0; i < 50; i++) {
      rows.push({
        user: this.pick(users),
        actionType: this.pick(actions),
        targetId: `UUID-${this.rand(1000, 9999)}-${this.rand(1000, 9999)}`,
        details: `Action sur ${['wallet', 'card', 'user', 'emission'][this.rand(0, 3)]}`,
        ipAddress: `${this.rand(10, 223)}.${this.rand(0, 255)}.${this.rand(0, 255)}.${this.rand(1, 254)}`,
        createdAt: this.randDate(30),
      });
    }
    return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // ─── 7. KYC / USERS ──────────────────────────────────
  getKycKpis(): KpiCard[] {
    return [
      { label: 'Utilisateurs Total', value: 12548, change: 8.7, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-users', color: '#06b6d4' },
      { label: 'Nouveaux (30j)', value: 847, change: 12.3, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-user-plus', color: '#22c55e' },
      { label: 'KYC Complété', value: '94.2', suffix: '%', change: 1.8, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-check-double', color: '#3b82f6' },
      { label: 'Comptes Suspendus', value: 124, change: -5.2, changeLabel: 'vs mois préc.', icon: 'fa-solid fa-user-lock', color: '#ef4444' },
    ];
  }

  getKycChart(): ChartDataPoint[] {
    return [
      { label: 'Fév', value: 10800, secondary: 9200 },
      { label: 'Mar', value: 11200, secondary: 9600 },
      { label: 'Avr', value: 11600, secondary: 10100 },
      { label: 'Mai', value: 11900, secondary: 10500 },
      { label: 'Juin', value: 12300, secondary: 11000 },
      { label: 'Juil', value: 12548, secondary: 11400 },
    ];
  }

  getKycByStatus(): ChartDataPoint[] {
    return [
      { label: 'ACTIFS', value: 11240 },
      { label: 'SUSPENDUS', value: 890 },
      { label: 'FROZEN', value: 312 },
      { label: 'CLOSED', value: 106 },
    ];
  }

  getKycByRole(): ChartDataPoint[] {
    return [
      { label: 'Clients', value: 8540 },
      { label: 'Agents', value: 2890 },
      { label: 'Super Agents', value: 680 },
      { label: 'Admins', value: 438 },
    ];
  }

  getKycRows(): KycUserRow[] {
    const statuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'] as const;
    const roles = ['Client', 'Agent', 'Super Agent', 'Admin'] as const;
    const firstNames = ['Jean', 'Claude', 'David', 'Alphonse', 'Pierre', 'François', 'Béatrice', 'Eric', 'Jérôme', 'Aimable', 'Salvator', 'Marie', 'Esther', 'Patricia', 'Olivier'] as const;
    const lastNames = ['Ndayishimiye', 'Niyonzima', 'Irakoze', 'Bukuru', 'Nizigiyimana', 'Hakizimana', 'Mpoyi', 'Uwimana', 'Manirakiza', 'Bazompa', 'Mugisha', 'Havyarimana'] as const;
    const rows: KycUserRow[] = [];
    for (let i = 0; i < 60; i++) {
      rows.push({
        userId: `USR-${String(10000 + i)}`,
        name: `${this.pick(firstNames)} ${this.pick(lastNames)}`,
        phone: `+257 ${String(70000000 + this.rand(0, 9999999)).slice(0, 8)}`,
        email: `user${i}@email.com`,
        status: this.pick(statuses),
        role: this.pick(roles),
        registeredAt: this.randDate(180),
        kycCompleted: Math.random() > 0.08,
      });
    }
    return rows.sort((a, b) => b.registeredAt.getTime() - a.registeredAt.getTime());
  }
}