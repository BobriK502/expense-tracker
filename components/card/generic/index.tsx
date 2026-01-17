import React, { useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { cardStyles } from '@/components/card/generic/styles';
import { runOnJS } from 'react-native-reanimated';

function GenericCard({
  underlayColor,
  backgroundColor,
  onPress,
  style,
  children,
}): React.JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => {
    setTimeout(() => {
      setIsPressed(false)
    }, 250)
  };


  const handlePress = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      'worklet'
      runOnJS(handlePressStart)();
    })
    .onEnd(() => {
      'worklet'
      runOnJS(handlePressEnd)()
      runOnJS(onPress)();
    });

  return (
    <GestureDetector gesture={handlePress}>
      <View
        style={[
          {
            backgroundColor: isPressed ? underlayColor : backgroundColor,
          },
          cardStyles.card,
          style,
        ]}
      >
        {children}
      </View>
    </GestureDetector>

  )
}

export { GenericCard };
