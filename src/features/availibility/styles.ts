import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { Insets, StyleSheet } from 'react-native';

export const useStyles = (insets: Insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    icon32: {
      width: 32,
      height: 32,
    },
    btnOnSet: {
      width: 48,
      height: 48,
      backgroundColor: colors.primary,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: insets.bottom || 16,
      right: SpacingDefault.mediumPlush,
    },
  });
