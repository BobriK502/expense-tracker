import { useNavigation } from 'expo-router';
import { Platform, BackHandler } from 'react-native';
import { useEffect, useRef } from 'react';

export function useBack(handler: () => void): void {
  const navigation = useNavigation();
  const backPressCount = useRef(0);

  useEffect(() => {
    const hardwareBack = (): boolean | null | undefined => {
      if (backPressCount.current === 1) {
        return false;
      }

      backPressCount.current = 1;
      setTimeout(() => {
        backPressCount.current = 0;
      }, 2000);
      handler();
      return true;
    }

    const back = (e: any) => {
      e.preventDefault();
      handler();
    }

    navigation.addListener('beforeRemove', back);

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', hardwareBack);
    }

    return () => {
      navigation.removeListener('beforeRemove', back);
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', hardwareBack);
      }
    };
  }, [navigation]);
}