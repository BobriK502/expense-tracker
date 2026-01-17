import { GrowMap } from '@/constants/common';

export function getChartData() {
  return [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
      label: 'Категория 1',
      totalValue: 2500,
      categoryGrowStatus: GrowMap.Down,
    },
    {
      value: 40,
      color: '#93FCF8',
      label: 'Категория 2',
      gradientCenterColor: '#54dad5ff',
      totalValue: 1800,
      categoryGrowStatus: GrowMap.Up,
    },
    {
      value: 16,
      color: '#BDB2FA',
      label: 'Категория 3',
      gradientCenterColor: '#7462d9ff',
      totalValue: 600,
      categoryGrowStatus: GrowMap.Down,
    },
    {
      value: 3,
      color: '#FFA5BA',
      label: 'Категория 4',
      gradientCenterColor: '#eb6080ff',
      totalValue: 70,
      categoryGrowStatus: GrowMap.Up,
    },
  ]
}

export const getFocusedItemIndex = () => 0;