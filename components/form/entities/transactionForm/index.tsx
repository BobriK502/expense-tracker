import React from 'react';
import { View } from 'react-native';

import { FormTextInput } from '@/components/form/inputs/textInput';
import { FormSumInput } from '@/components/form/inputs/sumInput';
import { getText } from '@/services/localization';

function TransactionForm({
  control,
  record,
}) {
  return (
    <>
      <FormTextInput
        name="title"
        label={getText('title_input_label')}
        control={control}
        placeholder={getText('title_placeholder')}
        defaultValue={record.title}
        icon="text-format"
      />
      <View style={{ flexDirection: 'row' }}>
        <FormSumInput
          name="amount"
          label={getText('amount_input_label')}
          control={control}
          placeholder={getText('amount_input_placeholder')}
          defaultValue={record.amount}
          icon="wallet"
          currency={"BYN"}
        />
      </View>
      <FormTextInput
        name='description'
        label={getText('desctiption_input_label')}
        placeholder={getText('description_placeholder')}
        control={control}
        defaultValue={record.notice}
        multiline
        numberOfLines={4}
        icon="description"
      />
    </>
  );
}

export { TransactionForm };
