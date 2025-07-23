import { View, ViewProps, StyleSheet } from 'react-native';

export interface IRowProps extends ViewProps {
  height: number;
  gap: number;
}

export default function Row({ height, gap, ...rest }) {
  return (
    <View
      style={[
      [styles.row],
      {
        height: `${height}%`,
        minHeight: `${height}%`,
        minWidth: '100%',
        padding: gap
      }]}
      { ...rest }
    />
  );
}

const styles = StyleSheet.create({
  row: {}
});
