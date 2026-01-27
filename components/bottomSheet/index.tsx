import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

import { useBottomSheet } from '@/states/bottomSheet.state';
import { IconSelectBottomSheet } from './icons/index';
import { TransactionBottomSheet } from './transaction/index';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getMaxTr = (view) => {
  return view === 'newEntity' ? 250 : 450;
}

function BottomSheet({ duration = 250 }): React.JSX.Element | null {
  const isBottomSheetOpen = useBottomSheet((state) => state.isOpen);
  const view = useBottomSheet((state) => state.activeView);
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const setActiveBshView = useBottomSheet((state) => state.setActiveView);

  const [isDragged, setIsDragged] = useState(false);
  const isOpen = useSharedValue(false);
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const backgroundColorSheetStyle = {
    backgroundColor: '#f8f9ff',
  };

  const sheetStyle = useAnimatedStyle(() => {
    const translateY = isDragged
      ? height.value - 10
      : progress.value * height.value
    return {
      transform: [{ translateY }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  const closeBsh = () => {
    setIsOpen(false);
    setTimeout(() => {
      setActiveBshView('');
    }, 100)
  };
 

  useEffect(() => {
    isOpen.value = isBottomSheetOpen;
  }, [isBottomSheetOpen]);


  const renderContent = () => {
    if (view === 'icon') {
      return <IconSelectBottomSheet />
    }

    if (view === 'transaction') {
      return <TransactionBottomSheet />
    }

    return null;
  }

  const handleDragStart = () => setIsDragged(true);
  const handleDragEnd = () => {
    setIsDragged(false);
    if (height.value > 150) {
      closeBsh();
    }
  };

  const onDrag = Gesture.Pan()
    .onStart((e) => {
      'worklet'
      runOnJS(handleDragStart)();
    })
    .onUpdate((e) => {
      if (e.translationY < 0) return;
      height.value = e.translationY + 10;
    })
    .onEnd(() => {
      'worklet'
      runOnJS(handleDragEnd)();
    })

  const getHeightByViewType = () => {
    return view === 'newEntity' ? 250 : 450;
  }

  if(!isBottomSheetOpen) return null;

  return (
    <>
      <AnimatedPressable style={[sheetStyles.backdrop, backdropStyle]} onPress={closeBsh} />
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[
          sheetStyles.sheet,
          sheetStyle,
          backgroundColorSheetStyle,
          {
            height: getHeightByViewType(),
          },
        ]}>
        <GestureDetector gesture={onDrag}>
          <View style={sheetStyles.dragabbleContainer}>
            <View style={sheetStyles.controllStick} />
          </View>
        </GestureDetector>
        {renderContent()}
      </Animated.View>
    </>
  );
}

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    paddingRight: 10,
    paddingLeft: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragabbleContainer: {
    position: 'absolute',
    top: 0,
    height: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllStick: {
    width: 40,
    height: 5,
    borderRadius: 15,
    backgroundColor: 'gray',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export { BottomSheet };