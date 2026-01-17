export function getDateByOffset(baseDate: Date, offset: number) {
  const newDate = new Date(baseDate);
  newDate.setMonth(newDate.getMonth() - offset);
  return newDate;
}