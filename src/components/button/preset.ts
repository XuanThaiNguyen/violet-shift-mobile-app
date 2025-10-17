import { StyleSheet, ViewStyle } from 'react-native';
import colors from '@themes/color';

export type ButtonPresetProps = {
  primary: ViewStyle;
  secondary: ViewStyle;
};

export type ButtonPresetNames = keyof ButtonPresetProps;

export const stylesView = (): ButtonPresetProps =>
  StyleSheet.create<ButtonPresetProps>({
    primary: {
      backgroundColor: colors.primaryButton,
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      borderRadius: 6,
    },
    secondary: {
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primaryButton,
    },
  });
