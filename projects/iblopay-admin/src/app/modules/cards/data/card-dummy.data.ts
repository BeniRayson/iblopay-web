import { CardStatus } from '../enums/card-status.enum';
import { CardType } from '../enums/card-type.enum';
import { CardTransaction } from '../models/card-transaction.model';
import { Card } from '../models/card.model';

/** Development data used until the cards API is available. */
export const DUMMY_CARDS: Card[] = [
  {
    cardId: 'card-001',
    cardUid: '04A1B2C3D4E5F6',
    userId: 'user-001',
    walletId: 'wallet-001',
    status: CardStatus.ACTIVE,
    transactionCounter: 18,
    activatedAt: '2026-05-12T08:30:00.000Z',
    activatedBy: 'agent-001',
    blockedAt: null,
    replacedAt: null,
    oldCardId: null,
    cardType: CardType.PHYSICAL,
    maskedPan: '5399 •••• •••• 1024',
    holderName: 'Aline Ndayizeye',
    balance: 245000
  },
  {
    cardId: 'card-002',
    cardUid: '04B2C3D4E5F6A7',
    userId: 'user-002',
    walletId: 'wallet-002',
    status: CardStatus.ACTIVE,
    transactionCounter: 9,
    activatedAt: '2026-06-03T10:15:00.000Z',
    activatedBy: 'agent-002',
    blockedAt: null,
    replacedAt: null,
    oldCardId: null,
    cardType: CardType.VIRTUAL,
    maskedPan: '5399 •••• •••• 2381',
    holderName: 'Eric Manirakiza',
    balance: 87500
  },
  {
    cardId: 'card-003',
    cardUid: '04C3D4E5F6A7B8',
    userId: null,
    walletId: null,
    status: CardStatus.NEUTRAL,
    transactionCounter: 0,
    activatedAt: null,
    activatedBy: null,
    blockedAt: null,
    replacedAt: null,
    oldCardId: null,
    cardType: CardType.PHYSICAL,
    maskedPan: '5399 •••• •••• 3417',
    holderName: 'Unassigned card',
    balance: 0
  },
  {
    cardId: 'card-004',
    cardUid: '04D4E5F6A7B8C9',
    userId: 'user-004',
    walletId: 'wallet-004',
    status: CardStatus.BLOCKED,
    transactionCounter: 27,
    activatedAt: '2026-02-18T13:40:00.000Z',
    activatedBy: 'agent-001',
    blockedAt: '2026-07-10T16:20:00.000Z',
    replacedAt: null,
    oldCardId: null,
    cardType: CardType.PHYSICAL,
    maskedPan: '5399 •••• •••• 4650',
    holderName: 'Diane Irakoze',
    balance: 132000
  },
  {
    cardId: 'card-005',
    cardUid: '04E5F6A7B8C9D0',
    userId: 'user-005',
    walletId: 'wallet-005',
    status: CardStatus.REPLACED,
    transactionCounter: 41,
    activatedAt: '2025-11-08T09:00:00.000Z',
    activatedBy: 'agent-003',
    blockedAt: null,
    replacedAt: '2026-06-22T11:35:00.000Z',
    oldCardId: null,
    cardType: CardType.PHYSICAL,
    maskedPan: '5399 •••• •••• 5793',
    holderName: 'Patrick Nkurunziza',
    balance: 310000
  },
  {
    cardId: 'card-006',
    cardUid: '04F6A7B8C9D0E1',
    userId: 'user-005',
    walletId: 'wallet-005',
    status: CardStatus.ACTIVE,
    transactionCounter: 6,
    activatedAt: '2026-06-22T11:40:00.000Z',
    activatedBy: 'agent-003',
    blockedAt: null,
    replacedAt: null,
    oldCardId: 'card-005',
    cardType: CardType.PHYSICAL,
    maskedPan: '5399 •••• •••• 6826',
    holderName: 'Patrick Nkurunziza',
    balance: 310000
  },
  {
    cardId: 'card-007',
    cardUid: '047A8B9C0D1E2F',
    userId: 'user-007',
    walletId: 'wallet-007',
    status: CardStatus.CLOSED,
    transactionCounter: 12,
    activatedAt: '2025-09-14T07:25:00.000Z',
    activatedBy: 'agent-002',
    blockedAt: null,
    replacedAt: null,
    oldCardId: null,
    cardType: CardType.VIRTUAL,
    maskedPan: '5399 •••• •••• 7149',
    holderName: 'Claude Hakizimana',
    balance: 4200
  }
];

export const DUMMY_CARD_TRANSACTIONS: CardTransaction[] = [
  { transactionId: 'tx-001', cardId: 'card-001', amount: 25000, currency: 'BIF', status: 'COMPLETED', createdAt: '2026-07-15T09:12:00.000Z' },
  { transactionId: 'tx-002', cardId: 'card-001', amount: 8500, currency: 'BIF', status: 'COMPLETED', createdAt: '2026-07-14T14:45:00.000Z' },
  { transactionId: 'tx-003', cardId: 'card-001', amount: 12000, currency: 'BIF', status: 'PENDING', createdAt: '2026-07-13T17:05:00.000Z' },
  { transactionId: 'tx-004', cardId: 'card-002', amount: 48000, currency: 'BIF', status: 'COMPLETED', createdAt: '2026-07-15T08:10:00.000Z' },
  { transactionId: 'tx-005', cardId: 'card-002', amount: 15000, currency: 'BIF', status: 'FAILED', createdAt: '2026-07-12T12:30:00.000Z' },
  { transactionId: 'tx-006', cardId: 'card-004', amount: 32000, currency: 'BIF', status: 'COMPLETED', createdAt: '2026-07-09T11:22:00.000Z' },
  { transactionId: 'tx-007', cardId: 'card-006', amount: 6000, currency: 'BIF', status: 'COMPLETED', createdAt: '2026-07-14T07:55:00.000Z' }
];