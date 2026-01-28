import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useEffect,
} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

function TransactionTypeSelect({
  onChange,
  selectedType,
  options,
}) {
  const selectedInd = useSharedValue(0);
  const selectUnderlayWidth = Math.round((100 - 1 * (options.length || 1)) / (options.length || 1));

  const style = useAnimatedStyle(() => {
    const trValue = interpolate(
      selectedInd.value,
      [0, options.length - 1],
      [3, 100],
    );

    return {
      transform: [{ translateX: `${trValue}%` }]
    };
  });

  useEffect(() => {
    selectedInd.value = options
      .findIndex((opt) => opt.id === selectedType);

  }, [selectedType, options])

  return (
    <View style={TransactionTypeSelectStyles.container}>
      {options.map((option) => {
        return (
          <Pressable
            onPress={() => {
              onChange(option.id);
            }}
            style={TransactionTypeSelectStyles.option}
          >
            <View
              style={TransactionTypeSelectStyles.optionContainer}
            >
              <Text>{option.label}</Text>
            </View>
          </Pressable>
        );
      })}
      <Animated.View style={[
        TransactionTypeSelectStyles.selectedItemUnderlay,
        {
          width: `${selectUnderlayWidth}%`,
        },
        style
      ]} />
    </View>
  );
}

const TransactionTypeSelectStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    position: 'relative',
  },
  option: {
    flexDirection: 'row',
    flex: 1,
    height: 35,
    marginHorizontal: 10,
    zIndex: 2,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  selectedItemUnderlay: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
    height: 35,
    borderRadius: 10,
  }
});

export { TransactionTypeSelect };