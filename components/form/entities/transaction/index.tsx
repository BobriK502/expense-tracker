import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useForm,
  useController,
} from 'react-hook-form';
import {
  useRouter,
} from 'expo-router';

import {
  NumPad,
} from '@/components/numPad/index';
import {
  DateTimeInput,
} from '@/components/form/inputs/dateTimeInput';
import {
  FormTextInput,
} from '@/components/form/inputs/textInput';
import {
  TRANSACTION_TYPE_IDS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/constants/config.entities';
import {
  getText,
} from '@/services/localization';
import {
  BackButton,
} from '@/components/buttons/back';
import {
  CategorySelect,
} from '@/components/form/inputs/categorySelect';
import {
  selectCategoriesByType,
} from '@/db/categories/index';
import {
  TransactionTypeSelect,
} from '@/components/form/inputs/transactionTypeSelect';
import {
  useCategoriesState,
} from '@/states/categories.state';
import {
  useTransactionStore,
} from '@/states/transactions.state';
import {
  formatStoredAmountValue,
} from '@/helpers/number/transactions/formatStoredAmountValue';

function TransactionForm({
  onSubmit,
  defaultValues,
}): React.JSX.Element {
  const router = useRouter();
  const {
    selectedCategoryId,
    setCategories,
  } = useCategoriesState();
  const {
    renewLastActionTimestamp,
  } = useTransactionStore();

  const [
    transactionType,
    setTransactionType,
  ] = useState(TRANSACTION_TYPE_IDS.EXPENCE);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: defaultValues.amount,
    }
  });

  const { field: amountField } = useController({
    control,
    name: 'amount',
  });

  const onAddSymbol = (val: any) => {
    const splitedBySeparator = amountField.value.split('.');

    if (val === '.' && splitedBySeparator.length > 1) return;
    if (splitedBySeparator[1]?.length >= 2) return;

    amountField.onChange(amountField.value + val);
  }

  const onClear = () => {
    amountField.onChange('');
  }

  const onRemove = () => {
    if (amountField.value.length === 0) {
      return amountField.onChange('');
    }

    amountField.onChange(amountField.value.substring(0, amountField.value.length - 1));
  }

  const submitHandler = async (data) => {
    await onSubmit({
      title: data.title,
      date: data.date,
      amount: formatStoredAmountValue(data.amount),
      notice: '',
      categoryId: selectedCategoryId,
      transactionTypeId: transactionType,
    });
    renewLastActionTimestamp();
    router.back();
  };

  const handleFormSubmit = handleSubmit(submitHandler);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await selectCategoriesByType(transactionType);
      setCategories(categoriesRaw as Array<never>);
    }
    fetchData();
  }, [transactionType]);

  return (
    <View style={TransactionFormStyles.container}>
      <View style={TransactionFormStyles.inner}>
        <View style={TransactionFormStyles.backControlContainer}>
          <BackButton style={{}} />
        </View>
        <View style={TransactionFormStyles.transactionTypeContainer}>
          <TransactionTypeSelect
            options={TRANSACTION_TYPE_OPTIONS}
            selectedType={transactionType}
            onChange={setTransactionType}
          />
        </View>
        <View style={TransactionFormStyles.inputsContainer}>
          <View style={AmountStyles.container}>
            <Text style={AmountStyles.value}>{amountField.value || '0'}</Text>
            <View style={AmountStyles.currency}>
              <Text style={AmountStyles.currencyVal}>BYN</Text>
            </View>
          </View>
          <View style={TransactionFormStyles.titleContainer}>
            <FormTextInput
              control={control}
              name={"title"}
              defaultValue={defaultValues.title}
              placeholder={getText('title_placeholder')}
              icon="text-format"
            />
          </View>
          <View>
            <CategorySelect categoryId={defaultValues.categoryId} />
          </View>
          <DateTimeInput
            control={control}
            name={"date"}
            defaultValue={defaultValues.date}
          />
        </View>
      </View>
      <View style={{ height: '40%', width: '100%' }}>
        <NumPad
          onAddSymbol={onAddSymbol}
          onClear={onClear}
          onRemoveSymbol={onRemove}
          onSubmit={handleFormSubmit}
        />
      </View>
    </View>
  );
}

const TransactionFormStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  inner: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 25,
    justifyContent: 'flex-start',
  },
  backControlContainer: {

  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  transactionTypeContainer: {
    width: '100%',
    height: 60,
    marginTop: 12,
  }
});

const AmountStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    marginBottom: 10,
  },
  value: {
    fontSize: 44,
    letterSpacing: 2,
    fontWeight: 500,
  },
  currency: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  currencyVal: {
    color: '#E2E8F1',
    fontSize: 32,
    fontWeight: 300,
  }
});

export { TransactionForm };
