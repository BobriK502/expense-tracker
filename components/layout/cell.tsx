import { View, ViewProps } from 'react-native';

export interface ICellProps extends ViewProps {
  width: number;
  gap: number;
}

export default function Cell({ width, gap, ...rest }: ICellProps) {
   return (
     <View style={{
     flexDirection: 'column',
     flex: 1,
     width: width,
     padding: gap,
     }} {...rest} />
   );
}