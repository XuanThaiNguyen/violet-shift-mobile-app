import { TextPresets } from '@themes/textPreset';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ButtonPresetNames } from './preset';

export interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  text?: string;
  style?: StyleProp<ViewStyle>;
  variant?: keyof TextPresets;
  children?: React.ReactNode;
  onPress?: () => void;
  textColor?: string;
  preset?: ButtonPresetNames;
  buttonColor?: string;
}
