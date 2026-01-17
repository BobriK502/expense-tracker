export enum InfoTileTypes {
  DayDate = 'DayDate',
  Expenses = 'Expenses',
  Balance = 'Balance',
  HealthStatus = 'HealthStatus',
}

export interface IInfoTileProps {
  type: InfoTileTypes;
}