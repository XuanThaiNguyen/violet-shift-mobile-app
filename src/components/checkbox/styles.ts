import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: colors.divider,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      backgroundColor: colors.transparent,
    },
    icon16: {
      height: 16,
      width: 16,
    },
    active: {
      backgroundColor: colors.toggle,
      borderColor: colors.toggle,
    },
  });
