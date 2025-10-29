import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: SpacingDefault.normal,
      flex: 1,
    },
    logo: {
      width: 84,
      height: 84,
      alignSelf: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.divider,
      borderRadius: 6,
      paddingHorizontal: 12,
      height: 44,
      fontSize: 14,
    },
    btnLogin: {
      backgroundColor: colors.primaryButton,
      paddingVertical: 14,
      borderRadius: 6,
      alignItems: 'center',
    },
    upper: {
      flex: 1,
    },
    txtForget: {
      alignSelf: 'flex-end',
    },
    icon16: {
      width: 16,
      height: 16,
    },
  });
