import {
  numButtonTypes,
  NumPadSymbol,
  NumPadButtonSizes,
} from '@/components/numPad/types';

export const numSizesMap: Record<string, NumPadButtonSizes> = {
  default: 'default',
  big: 'big',
  wide: 'wide',
};

export const numButtons: Array<
  Array<{
    value: NumPadSymbol;
    size: NumPadButtonSizes;
    type: numButtonTypes;
  }>
> = [
   [
    {
      value: '1',
      size: numSizesMap.default,
      type: numButtonTypes.input,
    },
    {
      value: '2',
      size: numSizesMap.default,
      type: numButtonTypes.input,
    },
    {
      value: '3',
      size: numSizesMap.default,
      type: numButtonTypes.input,
    },
   ],
   [
     {
       value: '4',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
     {
       value: '5',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
     {
       value: '6',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
   ],
   [
     {
       value: '7',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
     {
       value: '8',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
     {
       value: '9',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
   ],
   [
     {
       value: '0',
       size: numSizesMap.wide,
       type: numButtonTypes.input,
     },
     {
       value: '.',
       size: numSizesMap.default,
       type: numButtonTypes.input,
     },
   ]
  ];