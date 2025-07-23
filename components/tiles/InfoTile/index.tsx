import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import useInfoTileData from '@/components/tiles/InfoTile/hooks/useInfoTileData';

import { IInfoTileProps } from '@/components/tiles/InfoTile/IInfoTile';

export default function InfoTile(props: IInfoTileProps) {
  const { value, colors } = useInfoTileData(props.type);

  return (
      <LinearGradient
        colors={colors}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
         <ThemedText>{value}</ThemedText>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  }
});