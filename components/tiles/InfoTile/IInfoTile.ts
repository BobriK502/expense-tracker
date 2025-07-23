export enum InfoTileTypes {
  DayDate = 'DayDate',
  Expenses = 'Expenses',
  Balance = 'Balance',
}

export interface IInfoTileProps {
  type: InfoTileTypes;
}