import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { IconSymbol } from '@/components/ui/IconSymbol';

type BackButtonProps = {
  className: string;
}

function BackButton({ className }: BackButtonProps) {
  const router = useRouter();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.back()
  };
  return (
    <Pressable onPress={handlePress} className={className}>
      <IconSymbol name={"chevron.left"} size={32} color={"black"} />
    </Pressable>
  );
}

export { BackButton };