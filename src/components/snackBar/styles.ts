import colors from '@themes/color';
import { StyleSheet } from 'react-native';
import { BG_SUCCESS } from './constant';
import { SpacingDefault } from '@components/spacing/spacing';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 50,
      paddingHorizontal: 15,
      zIndex: 10000000,
    },
    itemBar: {
      borderLeftWidth: 3,
      borderLeftColor: BG_SUCCESS,
      paddingHorizontal: 15,
    },
    defaultView: {
      backgroundColor: colors.background2,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.46,
      shadowRadius: 5,
      elevation: 5,
      borderRadius: 6,
      position: 'absolute',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    block: {
      flex: 1,
    },
    height: {
      height: 52,
    },
    icon16: {
      width: 16,
      height: 16,
    },
    icon24: {
      width: 24,
      height: 24,
    },
    viewIcon: {
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: SpacingDefault.small,
      alignItems: 'center',
    },
    msg: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
