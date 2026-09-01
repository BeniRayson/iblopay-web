import { CommissionStatus } from '../enums/commission-status.enum';
import { CommissionType } from '../enums/commission-type.enum';
import { PaymentMode } from '../enums/payment-mode.enum';
import { SweepStatus } from '../enums/sweep-status.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { CommissionTransaction } from '../models/commission-transaction.model';
import { SweepTransaction } from '../models/sweep-transaction.model';
import { Transaction } from '../models/transaction.model';

/** Development data used until the transactions API is available. Amounts are in BIF minor units. */
export const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    transactionId: 'tx-001', reference: 'DEP-20260715-001',
    fromWalletId: null, toWalletId: 'wallet-001',
    amount: 250000, fee: 0,
    transactionType: TransactionType.DEPOSIT, status: TransactionStatus.COMPLETED,
    description: 'Cash deposit through agent', paymentMode: PaymentMode.AGENT,
    metadata: { agentId: 'agent-001' },
    createdAt: '2026-07-15T09:12:00.000Z', completedAt: '2026-07-15T09:13:00.000Z'
  },
  {
    transactionId: 'tx-002', reference: 'NFC-20260715-002',
    fromWalletId: 'wallet-002', toWalletId: 'wallet-merchant-01',
    amount: 48000, fee: 500,
    transactionType: TransactionType.PAYMENT_NFC, status: TransactionStatus.COMPLETED,
    description: 'Payment at Bujumbura Market', paymentMode: PaymentMode.NFC,
    metadata: { merchant: 'Bujumbura Market' },
    createdAt: '2026-07-15T08:10:00.000Z', completedAt: '2026-07-15T08:10:08.000Z'
  },
  {
    transactionId: 'tx-003', reference: 'TRF-20260714-003',
    fromWalletId: 'wallet-001', toWalletId: 'wallet-004',
    amount: 85000, fee: 850,
    transactionType: TransactionType.TRANSFER, status: TransactionStatus.COMPLETED,
    description: 'Wallet transfer', paymentMode: PaymentMode.MOBILE_APP,
    metadata: null,
    createdAt: '2026-07-14T14:45:00.000Z', completedAt: '2026-07-14T14:45:12.000Z'
  },
  {
    transactionId: 'tx-004', reference: 'WDL-20260714-004',
    fromWalletId: 'wallet-005', toWalletId: null,
    amount: 60000, fee: 1200,
    transactionType: TransactionType.WITHDRAWAL, status: TransactionStatus.COMPLETED,
    description: 'Agent cash withdrawal', paymentMode: PaymentMode.AGENT,
    metadata: { agentId: 'agent-003' },
    createdAt: '2026-07-14T07:55:00.000Z', completedAt: '2026-07-14T07:57:00.000Z'
  },
  {
    transactionId: 'tx-005', reference: 'NFC-20260713-005',
    fromWalletId: 'wallet-001', toWalletId: 'wallet-merchant-02',
    amount: 12000, fee: 120,
    transactionType: TransactionType.PAYMENT_NFC, status: TransactionStatus.PENDING,
    description: 'NFC payment awaiting confirmation', paymentMode: PaymentMode.NFC,
    metadata: { merchant: 'Café du Centre' },
    createdAt: '2026-07-13T17:05:00.000Z', completedAt: null
  },
  {
    transactionId: 'tx-006', reference: 'DEP-20260713-006',
    fromWalletId: null, toWalletId: 'wallet-007',
    amount: 175000, fee: 0,
    transactionType: TransactionType.DEPOSIT, status: TransactionStatus.FAILED,
    description: 'Bank deposit declined', paymentMode: PaymentMode.WEB,
    metadata: { failureReason: 'Provider timeout' },
    createdAt: '2026-07-13T10:20:00.000Z', completedAt: null
  },
  {
    transactionId: 'tx-007', reference: 'SWP-20260712-007',
    fromWalletId: 'wallet-004', toWalletId: 'wallet-settlement',
    amount: 320000, fee: 0,
    transactionType: TransactionType.SWEEP, status: TransactionStatus.COMPLETED,
    description: 'Automatic merchant sweep', paymentMode: PaymentMode.WEB,
    metadata: null,
    createdAt: '2026-07-12T23:00:00.000Z', completedAt: '2026-07-12T23:00:35.000Z'
  },
  {
    transactionId: 'tx-008', reference: 'COM-20260712-008',
    fromWalletId: 'wallet-system', toWalletId: 'wallet-agent-01',
    amount: 6400, fee: 0,
    transactionType: TransactionType.COMMISSION, status: TransactionStatus.COMPLETED,
    description: 'Weekly agent commission', paymentMode: PaymentMode.WEB,
    metadata: { agentId: 'agent-001' },
    createdAt: '2026-07-12T23:01:00.000Z', completedAt: '2026-07-12T23:01:05.000Z'
  },
  {
    transactionId: 'tx-009', reference: 'TRF-20260711-009',
    fromWalletId: 'wallet-002', toWalletId: 'wallet-005',
    amount: 150000, fee: 1500,
    transactionType: TransactionType.TRANSFER, status: TransactionStatus.REVERSED,
    description: 'Transfer reversed by support', paymentMode: PaymentMode.USSD,
    metadata: { reversalReason: 'Duplicate transfer' },
    createdAt: '2026-07-11T16:40:00.000Z', completedAt: '2026-07-11T17:02:00.000Z'
  },
  {
    transactionId: 'tx-010', reference: 'RMB-20260710-010',
    fromWalletId: 'wallet-merchant-01', toWalletId: 'wallet-002',
    amount: 48000, fee: 0,
    transactionType: TransactionType.REIMBURSEMENT, status: TransactionStatus.COMPLETED,
    description: 'Merchant refund', paymentMode: PaymentMode.MOBILE_APP,
    metadata: { originalTransactionId: 'tx-old-114' },
    createdAt: '2026-07-10T15:30:00.000Z', completedAt: '2026-07-10T15:31:00.000Z'
  },
  {
    transactionId: 'tx-011', reference: 'SWI-20260710-011',
    fromWalletId: 'wallet-settlement', toWalletId: 'wallet-004',
    amount: 32000, fee: 0,
    transactionType: TransactionType.SWEEP_INVERSE, status: TransactionStatus.COMPLETED,
    description: 'Partial sweep rollback', paymentMode: PaymentMode.WEB,
    metadata: null,
    createdAt: '2026-07-10T11:22:00.000Z', completedAt: '2026-07-10T11:22:20.000Z'
  },
  {
    transactionId: 'tx-012', reference: 'WDL-20260709-012',
    fromWalletId: 'wallet-001', toWalletId: null,
    amount: 100000, fee: 2000,
    transactionType: TransactionType.WITHDRAWAL, status: TransactionStatus.FAILED,
    description: 'Withdrawal cancelled', paymentMode: PaymentMode.AGENT,
    metadata: { failureReason: 'Insufficient agent float' },
    createdAt: '2026-07-09T09:05:00.000Z', completedAt: null
  }
];

export const DUMMY_SWEEPS: SweepTransaction[] = [
  {
    sweepId: 'sweep-001', transactionId: 'tx-007',
    fromWalletId: 'wallet-004', toWalletId: 'wallet-settlement',
    amount: 320000, reason: 'PAYMENT_NFC',
    status: SweepStatus.COMPLETED, parentTransactionId: null,
    createdAt: '2026-07-12T23:00:00.000Z', completedAt: '2026-07-12T23:00:35.000Z',
    rolledBackAt: null
  },
  {
    sweepId: 'sweep-002', transactionId: 'tx-011',
    fromWalletId: 'wallet-settlement', toWalletId: 'wallet-004',
    amount: 32000, reason: 'REIMBURSEMENT',
    status: SweepStatus.ROLLED_BACK, parentTransactionId: 'tx-007',
    createdAt: '2026-07-10T11:22:00.000Z', completedAt: '2026-07-10T11:22:20.000Z',
    rolledBackAt: '2026-07-10T11:22:20.000Z'
  }
];

export const DUMMY_COMMISSIONS: CommissionTransaction[] = [
  {
    commissionId: 'commission-001', transactionId: 'tx-008',
    agentId: 'agent-001', amount: 6400, rate: 2,
    commissionType: CommissionType.AGENT_COMMISSION, status: CommissionStatus.CREDITED,
    createdAt: '2026-07-12T23:01:00.000Z', creditedAt: '2026-07-12T23:01:05.000Z'
  }
];