export interface Transaction {
  id: number;
  transactionTypeId: number;
  categoryId?: number;
  amount: number;
  transactionDate: string; // ISO 8601: '2025-12-16T10:30:00.000Z'
  title: string;
  notice?: string;
}