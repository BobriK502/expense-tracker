import { create } from 'zustand'
import { combine } from 'zustand/middleware'

import {
  getPeriodKey,
} from '@/helpers/date/transactions/getPeriodKey';

import type { Transaction } from '@/types/entities/transaction';

export type TransactionsPeriodData = {
  transactions: Transaction[];
  income: number;
  expences: number;
  total: number;
  periodKey: string;
}

export const useTransactionStore = create(
  combine(
    {
      data: [{}] as Array<TransactionsPeriodData>,
      selectedTransaction: null,
      lastActionTimestamp: new Date(),
    },
    (set, get) => ({
      wipeData: () => {
        set(() => ({
          data: [],
          selectedTransaction: null,
        }));
      },
      setSelectedTransaction: (
        newSelectedTransaction: Transaction | null
          | ((curr: Transaction | null) => Transaction | null)
      ) => {
        // @ts-ignore
        set((state) => ({
          selectedTransaction:
            typeof newSelectedTransaction === 'function'
              ? newSelectedTransaction(state.selectedTransaction)
              : newSelectedTransaction,
        }));
      },
      renewLastActionTimestamp: () => {
        set(() => ({
          lastActionTimestamp: new Date(),
        }));
      },
      addPeriodData: (periodData: TransactionsPeriodData) => {
        set(() => ({
          data: [
            ...get()
              .data
              .filter((period: TransactionsPeriodData) => {
                return period.periodKey !== periodData.periodKey;
              }),
            periodData,
          ],
        }));
      },
      removePeriodData: (requestedPeriod: Date) => {
        const requestedPeriodKey = getPeriodKey(requestedPeriod);
        set(() => ({
          data: get()
            .data
            .filter((period: TransactionsPeriodData) => {
              return period.periodKey !== requestedPeriodKey;
            }),
        }));
      },
      getPeriodData: (requestedPeriod: Date) => {
        const requestedPeriodKey = getPeriodKey(requestedPeriod);
        return get()
          .data
          .find((period: TransactionsPeriodData) => {
            return period.periodKey === requestedPeriodKey;
          }) ?? {
          transactions: [],
          income: 0,
          expences: 0,
          total: 0
        };
      }
    })
  )
);
