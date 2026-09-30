export interface CardTransaction {
  transactionId: string;
  cardId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;

  operationType?: string;
  description?: string;
  direction?: 'CREDIT' | 'DEBIT';
}
