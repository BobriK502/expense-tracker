import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useEffect,
  useState,
} from 'react';

import {
  prepareWealthWidgetData,
} from '@/services/dashboard/index';
import {
  WealthChart,
} from '@/components/chart/WealthChart/WealthChart';
import {
  WealthInfoItem,
} from '@/components/widgets/wealthWidget/WealthInfoItem';
import { Feather } from '@expo/vector-icons';

function WealthWidget() {
  const [amountData, setAmountData] = useState({
    dataSet: [],
    info: '',
  });

  useEffect(() => {
    const doLoadData = async () => {
      const amoutDataRaw = await prepareWealthWidgetData();
      setAmountData(amoutDataRaw as {});
    }

    doLoadData();
  }, []);

  return (
    <View style={WealthWidgetStyles.container}>
      <View>
        {amountData.dataSet.map((item) => {
          return (
            <WealthInfoItem item={item} />
          )
        })}
      </View>
      {/* <Text>{JSON.stringify(amountData)}</Text> */}
      <WealthChart items={amountData.dataSet} onPress={(a) => console.log(a)} />
      <View style={WealthWidgetStyles.infoContainer}>
        <Feather name='info' size={16} color='gray' />
        <Text style={WealthWidgetStyles.info}>{amountData.info}</Text>
      </View>
    </View>
  );
}

const WealthWidgetStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '92%',
    marginHorizontal: '4%',
    marginVertical: '10%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  info: {
    marginLeft: 10,
    color: 'gray',
  }
})

export { WealthWidget };
