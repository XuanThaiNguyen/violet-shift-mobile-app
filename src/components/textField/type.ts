import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface TextFieldProps extends TextInputProps {
  value: string;
  error?: any;
  errorMessage?: string;
  placeholder?: string;
  editable?: boolean;
  iconLeft?: any;
  title?: string;
  inputHeight?: number;
  multiline?: boolean;
  maxLength?: number;
  inputStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  blockInputStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
}
