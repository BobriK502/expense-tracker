import {
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

function PeriodTabs({
  periodData,
  currentIndex,
  onSelectPeriod,
}) {
  const flatList = useRef<null | FlatList>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeItem = useMemo(() => {

    return periodData[currentIndex];
  }, [periodData, currentIndex])

  useEffect(() => {
    if (isExpanded && flatList.current) {
      flatList.current.scrollToIndex({ index: currentIndex })
    }
  }, [isExpanded, currentIndex])

  return (
    <View style={{ position: 'relative', height: 35, }}>
      <View style={{
        display: isExpanded ? "none" : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
        <Pressable
          style={{
            height: 30,
            marginHorizontal: 12,
            borderRadius: 10,
            backgroundColor: '#2A2524',
            elevation: 1,
            zIndex: 1,
          }}
          onPress={() => setIsExpanded((e) => !e)}
        >
          <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center', flex: 1}}>
            <View style={{ paddingHorizontal: 15, borderRightWidth: 1, borderColor: 'white', height: '100%', justifyContent: 'center' }}>
              <FontAwesome6 name={"calendar"} size={14} color="white" />
            </View>
            <Text style={{
              color: 'white',
              fontWeight: 500,
              textAlign: 'center',
              paddingHorizontal: 20,
            }}>
              {activeItem.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
         
        </Pressable>
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={{ marginHorizontal: 5, padding: 8 }}>
            <FontAwesome6 name={"magnifying-glass"} size={18} />
          </Pressable>
          <Pressable style={{ marginHorizontal: 5, padding: 8 }}>
            <FontAwesome6 name={"filter"} size={18} />
          </Pressable>
        </View>
      </View>
      {
        isExpanded && (
          <View
            style={{
              height: 35,
              maxHeight: 35,
              backgroundColor: '#2A2524',
              zIndex: 2,
            }}
          >
            <FlatList
              style={{
                maxHeight: 35,
                backgroundColor: '#2A2524',
              }}
              contentContainerStyle={{ alignItems: 'center' }}
              ref={flatList}
              data={periodData}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise(resolve => setTimeout(resolve, 100));
                wait.then(() => {
                  flatList.current?.scrollToIndex({ index: info.index, animated: true });
                });
              }}
              renderItem={({ item, index }) => {
                const isSelected = currentIndex === index;
                return <Pressable
                  key={item}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    marginHorizontal: 5,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    onSelectPeriod(index);
                    setIsExpanded(false);
                  }}
                >
                  <Text style={{
                    color: 'white',
                    fontWeight: isSelected ? 500 : 400,
                  }}>
                    {item.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                  </Text>
                  {isSelected && <View style={{ height: 5, width: 5, backgroundColor: 'lime', borderRadius: '50%', position: 'absolute', top: 10, right: 5 }}/>}
                </Pressable>
              }}
            />
          </View>

        )
      }
    </View>
  )
}

const header = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 400,
  }
})

export { PeriodTabs };
