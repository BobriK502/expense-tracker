import {
  View,
  StyleSheet,
} from 'react-native';

import {
  MojiIcon
} from '@/components/ui/MojiIcon';

const getIconSize = (size = 'default') => {
  switch (size) {
    case 'small':
      return 22
    default:
      return 32;
  }
}

function TransactionIcon({
  iconId,
  color,
  size = 'default'
}) {
  return (
    <View style={[styles.categoryContainer, sizes[size]]}>
      <View style={[{ backgroundColor: color }, styles.categoryIcon, iconSize[size]]}>
        <MojiIcon iconId={iconId} width={getIconSize(size)} height={getIconSize(size)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryIcon: {
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

const sizes = StyleSheet.create({
  default: {
    height: 50,
    width: 50,
  },
  small: {
    height: 30,
    width: 30,
  }
});

const iconSize = StyleSheet.create({
  default: {
    height: 50,
    width: 50,
  },
  small: {
    height: 30,
    width: 30,
    elevation: 1
  }
})

export {
  TransactionIcon,
}