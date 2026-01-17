import { pathes } from '@/constants/pathes';
import { entityTypes } from '@/constants/entity.types';

export const entitiesConfig = [
  {
    label: 'Запись о доходах',
    path: pathes.addIcnomeRecord,
    iconName:'icon_money',
    type: entityTypes.income,
    key: 1,
  },
  {
    label: 'Запись о расходах',
    path: pathes.addExpenceRecord,
    iconName: 'icon_money_flight',
    type: entityTypes.expence,
    key: 2,
  },
  {
    label: 'Бюджет',
    path: pathes.addBudget,
    iconName: 'icon_bank_two',
    type: entityTypes.budget,
    key: 3,
  }
]