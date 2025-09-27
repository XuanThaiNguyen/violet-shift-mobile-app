import { TextPresets } from '@themes/textPreset';
import { StyleProp, TextProps, TextStyle } from 'react-native';

export interface TypoProps extends TextProps {
  variant: keyof TextPresets;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  color?: string;
  numberOfLines?: number;
  center?: boolean;
}
