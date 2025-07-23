import { View, ViewProps } from 'react-native';

export interface ICellProps extends ViewProps {
  width: number;
}

export default function Cell({ width, ...rest }: ICellProps) {
   return (
     <View style={{
     minHeight: `${100}%`,
     width: `${width}%`,
     flexDirection: 'column',
     }} {...rest} />
   );
}