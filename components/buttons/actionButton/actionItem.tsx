import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import Animated, {
  withSpring,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { pathes } from '@/constants/pathes';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;


function ActionItem({ isExpanded, index, icon, path, handleHide }) {
  const router = useRouter();

  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 60;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  const handlerPress = (): void => {
    handleHide();

    if (path && Object.values(pathes).includes(path)) {
      router.push(path);
    }
  }

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.buttonContainer]}
      onPress={handlerPress}
    >
      <Animated.View style={styles.button} className="shadow-xl shadow-black bg-slate-100" >
        <MaterialIcons name={icon} size={20} />
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    display: 'flex',
    zIndex: -2,
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    fontWeight: 500,
    marginRight: 10,
  },
})

export { ActionItem, AnimatedPressable };