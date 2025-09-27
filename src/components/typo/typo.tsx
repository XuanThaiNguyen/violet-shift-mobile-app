import { textPresets } from '@themes/textPreset';
import { Text } from 'react-native';
import { TypoProps } from './type';

export const Typo: React.FC<TypoProps> = ({
  variant = 'semibold_10',
  style,
  children,
  color,
  numberOfLines,
  center,
  ...rest
}) => {
  let textColorStyle = {};
  if (color) {
    textColorStyle = { color };
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        variant && textPresets[variant],
        center && { textAlign: 'center' },
        textColorStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
