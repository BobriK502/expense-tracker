import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { TransactionFormHeader } from '@/components/form/entities/transactionForm/transactionFormHeader';
import { getText } from '@/services/localization';
import { TransparentButton } from '@/components/buttons/transparent';
import { TransactionForm } from '@/components/form/entities/transactionForm/index'
import { CategorySelect } from '@/components/form/inputs/categorySelect';
import { useCategoriesState } from '@/states/categories.state';
import {
  useTransactionStore,
} from '@/states/transactions.state';
import { selectCategoriesByType } from '@/db/categories/index';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';
import {
  formatStoredAmountValue,
} from '@/helpers/number/transactions/formatStoredAmountValue';

type IncomeFormProps = {
  headerStyle: { opacity: number };
  onSubmit: (data: {
    title: string;
    date: Date;
    amount: number;
    notice: string;
    categoryId: number;
  }) => Promise<void>;
  record: {
    title: string;
    date: Date;
    amount: number;
    notice: string;
    categoryId: number | null;
  };
}

function IncomeForm({
  headerStyle = {},
  record,
  onSubmit,
}: IncomeFormProps): React.JSX.Element {
  const setCategories = useCategoriesState((state) => state.setCategories);
  const selectedCategoryId = useCategoriesState((state) => state.selectedCategoryId);
  const { renewLastActionTimestamp } = useTransactionStore();
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const submitHandler = async (data) => {
    await onSubmit({
      title: data.title,
      date: data.date,
      amount: formatStoredAmountValue(data.amount),
      notice: data.description,
      categoryId: selectedCategoryId,
    });
    renewLastActionTimestamp();
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await selectCategoriesByType(TRANSACTION_TYPE_IDS.INCOME);
      setCategories(categoriesRaw as Array<never>);
    }
    fetchData();
  }, []);

  const handleFormSubmit = handleSubmit(submitHandler);

  return (
    <View
    style={{
      backgroundColor: '#fafafa',
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    }}
    >
      <TransactionFormHeader
        name="date"
        label={getText('date_input_label')}
        defaultValue={new Date()}
        control={control}
        headerStyle={headerStyle}
      />
      <CategorySelect categoryId={record.categoryId}/>
      <TransactionForm control={control} record={record}/>
      <View style={formButtonStyles.container}>
        <TransparentButton
          label={"Готово"}
          onPress={handleFormSubmit}
        />
      </View>
    </View>
  )
}

const formButtonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    gap: 4,
  },
  button: {
    width: 120,
    marginRight: 14,
  }
})

export { IncomeForm };