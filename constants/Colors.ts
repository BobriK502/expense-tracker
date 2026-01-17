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
    tabIconDefault: '#687076',
    tabIconSelected: '#000',
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
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
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
};
