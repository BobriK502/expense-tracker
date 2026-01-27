export interface Transaction {
  id: number;
  transactionTypeId: number;
  categoryId: number;
  amount: number;
  transactionDate: string;
  title: string;
  notice?: string;
}