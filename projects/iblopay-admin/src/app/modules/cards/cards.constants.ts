import { CardStatus } from './enums/card-status.enum';
import { CardType } from './enums/card-type.enum';

export interface StatusMeta {
  label: string;
  color: string; // used as a CSS custom property value
}

// Display metadata for each CardStatus. Keep in sync with card-status.enum.ts.
export const CARD_STATUS_META: Record<CardStatus, StatusMeta> = {
  [CardStatus.NEUTRAL]: { label: 'Not activated', color: '#8a8f98' },
  [CardStatus.ACTIVE]: { label: 'Active', color: '#1fae5b' },
  [CardStatus.BLOCKED]: { label: 'Blocked', color: '#e0932c' },
  [CardStatus.REPLACED]: { label: 'Replaced', color: '#6f6fef' },
  [CardStatus.CLOSED]: { label: 'Closed', color: '#e14b4b' },
  [CardStatus.SUSPENDED]: { label: 'Suspended', color: '#f2a90c' }
};

export const CARD_TYPE_META: Record<CardType, { label: string; icon: string }> = {
  [CardType.PHYSICAL]: { label: 'Physical', icon: '💳' },
  [CardType.VIRTUAL]: { label: 'Virtual', icon: '🖥️' }
};

export const CARDS_ROUTE_PATHS = {
  list: '',
  detail: ':id',
  activation: 'activation',
  distribution: 'distribution',
  stock: 'stock'
};