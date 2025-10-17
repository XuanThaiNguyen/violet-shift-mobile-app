import { IconTypes } from '@themes/images';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface TextFieldProps extends TextInputProps {
  value: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  renderRightChildren?: () => React.ReactNode;
  editable?: boolean;
  iconLeft?: any;
  iconRight?: any;
  title?: string;
  inputHeight?: number;
  multiline?: boolean;
  maxLength?: number;
  inputStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  blockInputStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
}
