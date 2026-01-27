import { View, Text, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import {
  useTransactionStore
} from '@/states/transactions.state';
import { MojiIcon } from '@/components/ui/MojiIcon';
import {
  TransactionAmount,
} from '@/components/ui/transactionAmount';
import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';
import { FontAwesome6 } from '@expo/vector-icons';
import {
  deleteTransactionById,
} from '@/dataRepositories/transactions/index';
import {
  formatTransactionDate,
} from '@/helpers/transactions/dateStringFormatter';
import {
  useCloseAction,
} from '@/components/bottomSheet/hooks/useCloseAction';
import { useBottomSheet } from '@/states/bottomSheet.state';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';


function TransactionBottomSheet() {
  const {
    selectedTransaction: activeTransaction,
    setSelectedTransaction,
    renewLastActionTimestamp,
  } = useTransactionStore();
  const { setActiveView, setIsOpen } = useBottomSheet();
  const router = useRouter();

  const handleEdit = () => {
      router.push(`/entities/edit/transaction`);
      setIsOpen(false);
      setActiveView('');
  }
  const handleDelete = async () => {
    await deleteTransactionById(activeTransaction.id);
    renewLastActionTimestamp();
    setSelectedTransaction(null);
    setIsOpen(false);
    setActiveView('');
  };

  const renderDescription = () => {
    if (!activeTransaction.notice) return null;

    return (
      <>
        <Text style={{ color: 'gray', fontWeight: 500, marginBottom: 10, borderBottomColor: 'lightgray', borderBottomWidth: 0.2, paddingBottom: 5 }}>Заметки</Text>
        <Text style={{ fontSize: 15 }}>{activeTransaction.notice}</Text>
      </>
    )
  }

  useCloseAction();

  return (
    <View style={{ width: '100%', padding: 20, flex: 1 }}>
      <Animated.ScrollView style={{ marginTop: 16, marginBottom: 10 }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 120,
        }}>
          <View style={{
            backgroundColor: activeTransaction.color,
            height: 90,
            width: 90,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View  style={{
             height: 75,
             width: 75,
             borderRadius: '50%',
             display: 'flex',
             paddingTop: 7,
             paddingLeft: 6,
            }}>
              <MojiIcon iconId={activeTransaction.iconId} width={60} height={60} />
            </View>
          </View>
          <View style={{
            height: 120,
            width: 180,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            }}>
            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'flex-end' }}>
              <TouchableHighlight underlayColor="#F4F4F5" onPress={handleEdit} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome6 name="edit" size={20} />
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#F4F4F5" onPress={handleDelete} style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5, borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome6 name="trash-can" size={20} />
              </TouchableHighlight>
            </View>
            <TransactionAmount
              transactionTypeId={activeTransaction.transactionTypeId}
              amountStr={formatAmountStr(activeTransaction.amount)}
              size='large'
            />
            <View style={{ marginRight: 10, marginTop: 10 }}>
              <Text style={{
                color: activeTransaction.color,
                textShadowColor: 'black',
                textShadowRadius: 0.2,
                opacity: 0.7,
                fontSize: 14,
              }}>{activeTransaction.categoryTitle}</Text>
            </View>
          </View>
         
        </View>
        <View style={{ marginLeft: 10}}>
          <Text style={{ color: 'gray',fontSize: 15 }}>
            {formatTransactionDate(
              activeTransaction.transactionDate,
              {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              },
            )}
          </Text>
          <Text style={{ fontSize: 22, marginTop: 16, marginBottom: 14 }}>{activeTransaction.title}</Text>
          {renderDescription()}
        </View>
      </Animated.ScrollView>
    </View>

  )
}

export { TransactionBottomSheet };
