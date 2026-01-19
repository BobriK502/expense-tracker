import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { IconSymbol } from '@/components/ui/IconSymbol';

type BackButtonProps = {
  style: Record<string, any>;
}

function BackButton({ style }: BackButtonProps) {
  const router = useRouter();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.back()
  };

  return (
    <Pressable onPress={handlePress} style={style}>
      <IconSymbol name={"chevron.left"} size={32} color={"black"} />
    </Pressable>
  );
}

export { BackButton };