import { type GrowStatus } from '@/types/common';

export type ChartDataItem = {
  value: number;
  totalValue: number;
  color: string;
  label: string;
  gradientCenterColor: string;
  categoryGrowStatus: GrowStatus,
  focused?: boolean;
}