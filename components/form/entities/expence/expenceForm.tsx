import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ExpenceFormHeader } from '@/components/form/entities/expence/expenceFormHeader';
import { getText } from '@/services/localization';
import { TransparentButton } from '@/components/buttons/transparent';
import { TransactionForm } from '@/components/form/entities/transactionForm/index'
import { selectCategoriesByType } from '@/db/categories/index';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';
import {
  useTransactionStore,
} from '@/states/transactions.state';
import { CategorySelect } from '@/components/form/inputs/categorySelect';
import { useCategoriesState } from '@/states/categories.state';
import {
  formatStoredAmountValue,
} from '@/helpers/number/transactions/formatStoredAmountValue';

type ExpenceFormProps = {
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

function ExpenceForm({ headerStyle, onSubmit, record }: ExpenceFormProps): React.JSX.Element {
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
   })
    renewLastActionTimestamp();
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await selectCategoriesByType(TRANSACTION_TYPE_IDS.EXPENCE);
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
        alignItems: 'center',
      }}
    >
      <ExpenceFormHeader
        name="date"
        label={getText('date_input_label')}
        defaultValue={record.date}
        control={control}
        headerStyle={headerStyle}
      />
      <CategorySelect categoryId={record.categoryId} />
      <TransactionForm control={control} record={record} />
      <View style={formButtonStyles.container}>
        <TransparentButton
          label={"Готово"}
          onPress={handleFormSubmit}
        />
      </View>
    </View >
  )
}

const formButtonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 60,
    gap: 4,
  },
  button: {
    width: 120,
    marginRight: 14,
  }
})

export { ExpenceForm };