export const formatCurrencyCompact = (value: number): string => {
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  if (absValue >= 1000000000) {
    return `${(absValue / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (absValue >= 1_000_000) {
    return `${(absValue / 1000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (absValue >= 1_000) {
    return `${(absValue / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }

  return `${absValue.toFixed(2).replace(/\.00$/, '') }`;
};