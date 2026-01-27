import {
  getTransactionsByMonth,
  deleteRecordById,
  getTransacrionsByType,
  create,
  update,
} from '@/db/transactions/index';
import {
  TRANSACTION_TYPE_IDS,
} from '@/constants/config.entities';
import {
  getPeriodKey,
} from '@/helpers/date/transactions/getPeriodKey';
import {
  formatAmount,
} from '@/helpers/number/transactions/formatAmount';
import type { Transaction } from '@/types/entities/transaction';

export async function deleteTransactionById(id: number) {
  await deleteRecordById(id);
}

async function getTransactionsDataByMonth(period: Date) {
  try {
    const transactions = await getTransactionsByMonth(period);
    const {
      income,
      expences,
      processedTransactions,
    } = transactions.reduce((acc, tr) => {
      if (tr.transactionTypeId === TRANSACTION_TYPE_IDS.EXPENCE && tr.amount) {
        acc.expences = acc.expences + tr.amount;
      }

      if (tr.transactionTypeId === TRANSACTION_TYPE_IDS.INCOME && tr.amount) {
        acc.income = acc.income + tr.amount;
      }

      acc.processedTransactions.push({
        ...tr,
        amount: formatAmount(tr.amount),
      });


      return acc;
    }, { income: 0, expences: 0, processedTransactions: [] as Array<Transaction> });

    return {
      transactions: processedTransactions,
      income: formatAmount(income),
      expences: formatAmount(expences),
      total: formatAmount(income - expences),
      periodKey: getPeriodKey(period),
    }
  } catch(e) {
    throw new Error(JSON.stringify(e))
  }
}

async function getMonthExpencesByCategories(period: Date) {
  const data = await getTransacrionsByType(
    TRANSACTION_TYPE_IDS.EXPENCE,
    period,
  );
  return data.map((tr) => ({ ...tr, total: formatAmount(tr.total)}));
}

async function getMonthIncomeByCategories(period: Date) {
  const data = await getTransacrionsByType(
    TRANSACTION_TYPE_IDS.INCOME,
    period,
  );
  return data.map((tr) => ({ ...tr, total: formatAmount(tr.total)}));
}

async function createTransaction(data: Omit<Transaction, 'id'>) {
  try {
    await create(data);
  } catch(e) {
    console.log(e);
  }
}

async function updateTransaction(data: Transaction) {
  try {
    await update(data);
  } catch (e) {
    console.log(e);
  }
}

export {
  getTransactionsDataByMonth,
  getMonthExpencesByCategories,
  getMonthIncomeByCategories,
  createTransaction,
  updateTransaction,
}