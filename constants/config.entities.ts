import { getText } from '@/services/localization'

export const TRANSACTION_TYPE_IDS = {
  EXPENCE: 1,
  INCOME: 2,
}

export const TRANSACTION_TYPE_OPTIONS = [
  {
    id: TRANSACTION_TYPE_IDS.EXPENCE,
    label: getText('add_expences_record'),
  },
  {
    id: TRANSACTION_TYPE_IDS.INCOME,
    label: getText('add_income_record'),
  },
]
