import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import {
  AnimatedPressable,
} from '@/components/buttons/actionButton/actionItem';
import { useBottomSheet } from '@/states/bottomSheet.state';


export function ActionButton() {
  const setActiveBshView = useBottomSheet((state) => state.setActiveView);
  const setIsBshOpen = useBottomSheet((state) => state.setIsOpen);

  const handlePress = () => {
    setActiveBshView('newEntity');
    setIsBshOpen(true);
  };

  return (
    <SafeAreaView className='absolute w-16 flex-col z-20 bottom-6 right-4'>
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <AnimatedPressable
            onPress={handlePress}
            className="bg-blue-200 flex items-center justify-center"
            style={mainButtonStyles.button}>
            <Animated.View>
              <MaterialIcons name='add' size={22} color="white" />
            </Animated.View>
          </AnimatedPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 1,
    height: 56,
    width: 56,
    borderRadius: '50%',
    elevation: 4,
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});