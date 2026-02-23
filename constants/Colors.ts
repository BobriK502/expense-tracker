import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';
import { entityTypes } from '@/constants/entity.types';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: 'white',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#000',
    btnPrimaryColor: '#F4F4F5',
    accentColor: '#fff085',
    transaction: {
      [TRANSACTION_TYPE_IDS.EXPENCE]: '#C10008',
      [TRANSACTION_TYPE_IDS.INCOME]: 'green',
    },
    entities: {
      [entityTypes.expence]: '#fecdd3',
      [entityTypes.income]: '#d9f99d',
      [entityTypes.budget]: '#bae6fd',
    }
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#fff',
    btnPrimaryColor: '#fff085',
    accentColor: '#fff085',
    transaction: {
      [TRANSACTION_TYPE_IDS.EXPENCE]: '#C10008',
      [TRANSACTION_TYPE_IDS.INCOME]: 'green',
    },
    entities: {
      [entityTypes.expence]: '#fecdd3',
      [entityTypes.income]: '#d9f99d',
      [entityTypes.budget]: '#bae6fd',
    }
  },
  unthemed: {
    wealthEntitites: {
      expence: '#C10008',
      income: '#008000',
      balance: '#dbdbdb',
    }
  }
};
