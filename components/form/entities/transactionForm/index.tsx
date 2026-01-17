import React from 'react';
import { View } from 'react-native';

import { FormTextInput } from '@/components/form/inputs/textInput';
import { FormSumInput } from '@/components/form/inputs/sumInput';
import { getText } from '@/services/localization';

function TransactionForm({
  control,
}) {
  return (
    <>
      <FormTextInput
        name="title"
        label={getText('title_input_label')}
        control={control}
        placeholder={getText('title_placeholder')}
        defaultValue=""
        icon="text-format"
      />
      <View className='flex-row'>
        <FormSumInput
          name="amount"
          label={getText('amount_input_label')}
          control={control}
          placeholder={getText('amount_input_placeholder')}
          defaultValue={0}
          icon="wallet"
          currency={"BYN"}
        />
      </View>
      <FormTextInput
        name='description'
        label={getText('desctiption_input_label')}
        placeholder={getText('description_placeholder')}
        control={control}
        defaultValue=""
        multiline
        numberOfLines={4}
        icon="description"
      />
    </>
  );
}

export { TransactionForm };
