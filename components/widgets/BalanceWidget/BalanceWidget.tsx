import {
  Pressable,
  Text,
  View,
} from 'react-native';
import cc from 'currency-codes';
import React, {
  useState,
  useEffect,
} from 'react';
import { Feather } from '@expo/vector-icons';

import {
  BalanceWidgetStyles,
} from '@/components/widgets/BalanceWidget/styles';
import {
  prepareCurrentBalanceData,
  type BalanceData,
} from '@/services/dashboard/index';
import {
  Colors
} from '@/constants/Colors';
import {
  useColorScheme,
} from '@/hooks/useColorScheme';
import { getText } from '@/services/localization';

const currencyCode = '933';

function BalanceWidget(): React.JSX.Element {
  const [balanceData, setBalanceData] = useState<BalanceData>({
    isEmpty: false,
    value: 0,
    info: '',
    diffPercentage: 0,
  });

  const scheme = useColorScheme() || 'light';
  const theme = Colors[scheme];
  const infoIconColor = balanceData.diffPercentage > 0
    ? Colors.unthemed.trending.up
    : Colors.unthemed.trending.down;
  const infoIcon = balanceData.diffPercentage > 0
    ? 'arrow-up'
    : 'arrow-down';

  useEffect(() => {
    const getBalanceData = async () => {
      const data = await prepareCurrentBalanceData();
      setBalanceData(data);
    }

    getBalanceData();
  }, []);

  return (
    <View
      style={BalanceWidgetStyles.container}
    >
      <View style={BalanceWidgetStyles.inner}>
        <View style={BalanceWidgetStyles.header}>
          <Text style={BalanceWidgetStyles.title}>{balanceData.info}</Text>
          <View style={BalanceWidgetStyles.icon}>
            <Feather name='credit-card' size={16} color='black' />
          </View>
        </View>
        <View style={BalanceWidgetStyles.amountContainer}>
          <Text style={BalanceWidgetStyles.amountCurrency}>{cc.number(currencyCode)?.code}</Text>
          <Text style={BalanceWidgetStyles.amount}>{balanceData.value}</Text>
        </View>
      </View>
      <View style={[BalanceWidgetStyles.footer, { backgroundColor: theme.backgroundAccent }]}>
        <View style={BalanceWidgetStyles.info}>
          <Feather name={infoIcon} size={20} color={infoIconColor} />
          <Text style={[BalanceWidgetStyles.infoPercents, { color: infoIconColor }]}>
            {balanceData.diffPercentage}%
          </Text>
          <Text style={BalanceWidgetStyles.infoLabel}>
            {getText('balance_widget_info_label')}
          </Text>
        </View>
        <Pressable
          onPress={() => console.log('e')}
          style={BalanceWidgetStyles.moreButton}
        >
          <Text style={BalanceWidgetStyles.moreButtonLabel}>
            {getText('balance_widget_action_button_label')}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export { BalanceWidget };
