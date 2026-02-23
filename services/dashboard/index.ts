import {
  getTransactionsAmount,
} from '@/dataRepositories/transactions';
import {
  getText,
} from '@/services/localization/index';
import {
  Colors,
} from '@/constants/Colors';

async function prepareWealthWidgetData() {
  const amountData = await getTransactionsAmount();

  if (!amountData.count) {
    return {
      dataSet: [],
      info: getText('wealth_widget_info_no_transactions'),
      isEmpty: true,
    };
  }

  return {
    dataSet: [
      {
        name: getText('wealth_widget_expence_label'),
        value: amountData.expencesAmount,
        color: Colors.unthemed.wealthEntitites.expence,
      },
      {
        name: getText('wealth_widget_income_label'),
        value: amountData.incomeAmount,
        color: Colors.unthemed.wealthEntitites.income,
      },
      {
        name: getText('wealth_widget_balance_label'),
        value: amountData.incomeAmount - amountData.expencesAmount,
        color: Colors.unthemed.wealthEntitites.balance,
      },
    ],
    info: getText(
      'wealth_widget_info_transactions_count',
      {
        transactionCount: amountData.count,
      },
    ),
    isEmpty: false,
  }
}

export { prepareWealthWidgetData };
