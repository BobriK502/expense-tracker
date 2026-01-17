import { TouchableHighlight, Text, StyleSheet } from 'react-native';

function PrimaryButton({ onPress, label, fullWidth = true }) {
  const widthStyle = fullWidth ? styles.fullWidth : styles.autoWidth;

  return (
    <TouchableHighlight
      underlayColor="#51A2FF"
      style={[styles.button, widthStyle]}
      onPress={onPress}
    >
      <Text style={[styles.label]}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2B7FFF',
    height: 40,
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
    color: 'white',
    fontSize: 16,
  }
})

export { PrimaryButton };