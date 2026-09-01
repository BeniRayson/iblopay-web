// Placeholder shape only — the transactions feature and its backend endpoint
// don't exist yet. Nothing populates real data through this model until
// that's built; card-detail renders an empty state instead. Adjust the
// fields once the real endpoint/contract is defined.
export interface CardTransaction {
  transactionId: string;
  cardId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}
