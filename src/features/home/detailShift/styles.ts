import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    footer: {
      backgroundColor: colors.white,
      paddingVertical: 8,
    },
    btnTab: {
      gap: 8,
      alignItems: 'center',
    },
    shiftTab: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderColor: colors.divider,
      paddingTop: 8,
    },
    icon16: {
      width: 16,
      height: 16,
    },
    viewClock: {
      paddingVertical: 8,
      borderTopWidth: 1,
      borderColor: colors.divider,
    },
    btnClock: {
      marginHorizontal: SpacingDefault.normal,
      height: 36,
    },
  });
