import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MojiIcon } from '@/components/ui/MojiIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

function ListItem({
  entity,
  onBottomSheetClose,
}): React.JSX.Element {
  const router = useRouter();

  const handlePress = () => {
    onBottomSheetClose();
    router.push(entity.path);
  }

  const theme = useColorScheme() ?? 'light';
  const color = Colors[theme].entities[entity.type];

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginBottom: 5,
      }}>
        <View style={{
          height: 35,
          width: 35,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <View style={{ zIndex: 2 }}>
            <MojiIcon iconId={entity.iconName} width={30} height={30} />
          </View>
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 35,
            width: 35,
            backgroundColor: color,
            borderRadius: 10,
          }}/>
        </View>
        <Text style={{ lineHeight: 35, fontSize: 15, marginLeft: 15 }}>{entity.label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export { ListItem };
