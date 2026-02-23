import { hexWithOpacity } from '@/helpers/color/hexOpacity';
import {
  Path,
  Skia,
} from '@shopify/react-native-skia';
import {
  useDerivedValue,
} from 'react-native-reanimated';

function BarStack({
  color,
  offset,
  val,
}) {

  const r = 4;

    const rrct = useDerivedValue(() => {
      const path = Skia.Path.Make();
      
      path.addRRect({
        rect: { x: offset + 10, y: 10, width: val, height: 20 },
        rx: r,
        ry: r,
      })
  
      return path;
    });

  return (<Path path={rrct} color={hexWithOpacity(color, 0.6)} />);
}

export { BarStack };
