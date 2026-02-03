import { getText } from '@/services/localization'
import {
  type TransactionType,
  type TransactionId,
} from '@/types/ui/transaction/transactionType';

export const TRANSACTION_TYPE_IDS: Record<string, TransactionId> = {
  EXPENCE: 1,
  INCOME: 2,
}

export const TRANSACTION_TYPE_OPTIONS: Array<TransactionType> = [
  {
    id: TRANSACTION_TYPE_IDS.EXPENCE,
    label: getText('add_expences_record'),
  },
  {
    id: TRANSACTION_TYPE_IDS.INCOME,
    label: getText('add_income_record'),
  },
]
