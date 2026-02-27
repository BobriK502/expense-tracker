import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from '@/constants/Colors';

const BalanceWidgetStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  infoPercents: {
    marginLeft: 5,
    fontSize: 15,
  },
  infoLabel: {
    marginLeft: 8,
    color: 'gray',
  },
  moreButton: {
    height: 40,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonLabel: {
    fontSize: 14,
  },
  inner: {
    height: 100,
    width: '100%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.75,
    marginLeft: 5,
  },
  amountContainer: {
    flexDirection: 'row',
  },
  amountCurrency: {
    color: 'gray',
    fontWeight: 500,
    marginTop: 14,
    marginLeft: 5,
    fontSize: 26,
  },
  amount: {
    fontSize: 30,
    fontWeight: 500,
    marginTop: 10,
    marginLeft: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: '50%',
    backgroundColor: Colors.unthemed.accents.orange,
    elevation: 1,
  },
});

export { BalanceWidgetStyles };
