import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    activeOuter: {
      borderWidth: 2,
      height: 24,
      width: 24,
      borderColor: colors.toggle,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeInner: {
      backgroundColor: colors.toggle,
      height: 16,
      width: 16,
      borderRadius: 22,
    },
    inactiveOuter: {
      borderWidth: 2,
      height: 24,
      width: 24,
      borderColor: colors.divider2,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inactiveInner: {
      backgroundColor: colors.transparent,
    },
  });
