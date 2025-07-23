import { View, ViewProps } from 'react-native';

export interface ICellProps extends ViewProps {
  width: number;
  gap: number;
}

export default function Cell({ width, gap, ...rest }: ICellProps) {
   return (
     <View style={{
     minHeight: `${100}%`,
     width: `${width}%`,
     flexDirection: 'column',
     padding: gap,
     }} {...rest} />
   );
}