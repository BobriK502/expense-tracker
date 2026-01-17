import { TouchableHighlight, Text, StyleSheet } from 'react-native';

function SecondaryButton({ onPress, label, fullWidth = true }) {
  const widthStyle = fullWidth ? styles.fullWidth : styles.autoWidth;

  return (
    <TouchableHighlight
      underlayColor="#E4E4E7"
      style={[styles.button, widthStyle]}
      onPress={onPress}
    >
      <Text style={[styles.label]}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5F5F5',
    height: 40,
    width: 360,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  fullWidth: {
    width: 360,
  },
  autoWidth: {
    width: 'auto',
  },
  label: {
    fontWeight: 500,
    color: '#2B7FFF',
    fontSize: 16,
  }
})

export { SecondaryButton };
