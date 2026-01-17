import { View, ViewProps, StyleSheet } from 'react-native';

export interface IRowProps extends ViewProps {
  height: number;
  gap: number;
}

export default function Row({ height, gap, ...rest }: IRowProps) {
  return (
    <View
      style={[
      [styles.row],
      {
        height,
        padding: gap,
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1,
      }]}
      { ...rest }
    />
  );
}

const styles = StyleSheet.create({
  row: {
    overflow: 'hidden'
  }
});
