import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    icon20: {
      width: 20,
      height: 20,
    },
    icon16: {
      width: 16,
      height: 16,
    },
    notiTab: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    notiContent: {
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
  });
