import {
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { LegendItem } from './LegendItem';

type LegendContainerProps = {
  items?: Array<{ name: string; color: string; }>;
}

function LegendContainer({
  items,
}: LegendContainerProps): React.JSX.Element | null {
  if (!items || items.length === 0) return null;

  return (
    <View style={LegendContainerStyles.conatianer} >
      {items.map((item) => (
        <LegendItem color={item.color} name={item.name} />
      ))}
    </View>
  );
}

const LegendContainerStyles = StyleSheet.create({
  conatianer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
})

export { LegendContainer };