import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';

import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  AVATAR_MAX_SIZE,
  AVATAR_MIN_SIZE,
  SCROLL_RANGE,
  AVATAR_X_MIN,
  AVATAR_Y_MIN,
} from '@/components/layout/collapsibleHeaderLayout/constants';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

function useCollapsibleHeader() {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, SCROLL_RANGE],
            [1, 0],
            Extrapolation.CLAMP
        );
        return { opacity };
    });

    const collapsedHeaderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, SCROLL_RANGE],
            [0, 1],
            Extrapolation.CLAMP
        );
        return { opacity };
    });

    const collapsedIconStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollY.value,
            [0, SCROLL_RANGE],
            [WINDOW_WIDTH / 2 - AVATAR_MAX_SIZE / 2, AVATAR_X_MIN],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollY.value,
            [0, SCROLL_RANGE],
            [HEADER_MAX_HEIGHT / 2 - AVATAR_MAX_SIZE / 2 - 60, AVATAR_Y_MIN],
            Extrapolation.CLAMP
        );
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            width: AVATAR_MIN_SIZE,
            height: AVATAR_MIN_SIZE,
            borderRadius: AVATAR_MIN_SIZE / 2,
            transform: [{ translateX }, { translateY }],
        };
    });

    return {
        collapsedIconStyle,
        headerStyle,
        scrollHandler,
        collapsedHeaderStyle
    }
}

export { useCollapsibleHeader };
