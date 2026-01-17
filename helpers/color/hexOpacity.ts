/**
 * Добавляет прозрачность к HEX-цвету
 * @param hexColor — цвет в формате '#RRGGBB' или '#RGB'
 * @param opacity — от 0 до 1
 * @returns цвет в формате '#RRGGBBAA'
 */
export const hexWithOpacity = (hexColor: string, opacity: number): string => {
  // Убираем # и приводим к 6 символов
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  // Ограничим opacity от 0 до 1
  const alpha = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0').toUpperCase();

  return `#${hex}${alphaHex}`;
};