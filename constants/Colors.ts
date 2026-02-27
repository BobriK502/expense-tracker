import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';
import { entityTypes } from '@/constants/entity.types';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: 'white',
    backgroundAccent: '#FAFBFC',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#000',
    btnPrimaryColor: '#F4F4F5',
    accentColor: '#fff085',
    transaction: {
      [TRANSACTION_TYPE_IDS.EXPENCE]: '#DF2638',
      [TRANSACTION_TYPE_IDS.INCOME]: '#1BAB68',
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
    backgroundAccent: '#94a3b8',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#fff',
    btnPrimaryColor: '#fff085',
    accentColor: '#fff085',
    transaction: {
      [TRANSACTION_TYPE_IDS.EXPENCE]: '#DF2638',
      [TRANSACTION_TYPE_IDS.INCOME]: '#1BAB68',
    },
    entities: {
      [entityTypes.expence]: '#fecdd3',
      [entityTypes.income]: '#d9f99d',
      [entityTypes.budget]: '#bae6fd',
    }
  },
  unthemed: {
    wealthEntitites: {
      expence: '#DF2638',
      income: '#1BAB68',
      balance: '#dbdbdb',
    },
    accents: {
      yellow: '#FFFACD',
      rose: '#FFE4E5',
      green: '#ECFCCA',
      blue: '#DFE7FF',
      gray: '#F4F4F5',
      orange: '#FFE3B8'
    },
    trending: {
      up: '#1BAB68',
      down: '#DF2638',
    }
  }
};
