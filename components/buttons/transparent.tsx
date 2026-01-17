import { TouchableHighlight, Text, StyleSheet } from 'react-native';

function TransparentButton({ onPress, label, fullWidth = true }) {
  const widthStyle = fullWidth ? styles.fullWidth : styles.autoWidth;

  return (
    <TouchableHighlight
      style={[styles.button, widthStyle]}
      onPress={onPress}
      underlayColor="#E4E4E7"
    >
      <Text style={[styles.label, {}]}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
  },
  fullWidth: {
    width: 360,
  },
  autoWidth: {
    width: 'auto',
  },
  label: {
    color: '##6A7282',
    fontWeight: 500,
    fontSize: 16,
  },
})

export { TransparentButton };
