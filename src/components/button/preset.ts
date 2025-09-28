import colors from '@themes/color';
import { StyleSheet } from 'react-native';

export type ButtonPresetProps = {
  primary: any;
  secondary: any;
};

export const stylesView = (): any =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.primaryButton,
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      borderRadius: 6,
    },
    // secondary: {
    //   backgroundColor: colors.secondary,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: 44,
    //   borderRadius: 12,
    //   borderWidth: 1,
    //   borderColor: colors.primary,
    // },
  });

export type ButtonPresetNames = keyof ButtonPresetProps;
