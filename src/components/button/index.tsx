import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import { memo, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { stylesView } from './preset';
import { ButtonProps } from './type';

export const Button = memo(
  ({
    activeOpacity = 0.5,
    style: styleOverride = {},
    onPress,
    disabled = false,
    textColor,
    children,
    text,
    variant = 'semibold_16',
    preset,
    buttonColor,
    hitSlop,
    ...rest
  }: ButtonProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const viewStyle = useMemo<ViewStyle>(
      () =>
        StyleSheet.flatten([
          preset && stylesView()?.[preset],
          buttonColor && { backgroundColor: buttonColor },
          disabled && { backgroundColor: colors.disabledButton },
          styleOverride as ViewStyle,
        ]),
      [preset, buttonColor, disabled, isPressed, styleOverride],
    );

    let content = useMemo(() => {
      let _typoColor = textColor || colors.white;

      return (
        children || (
          <Typo color={_typoColor} variant={variant}>
            {text}
          </Typo>
        )
      );
    }, [children, text, variant, textColor]);

    const _hitSlop =
      hitSlop !== undefined
        ? typeof hitSlop === 'number'
          ? { top: hitSlop, left: hitSlop, right: hitSlop, bottom: hitSlop }
          : hitSlop
        : undefined;

    return (
      <TouchableOpacity
        //@ts-ignore
        hitSlop={_hitSlop}
        activeOpacity={activeOpacity}
        style={viewStyle}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        {...rest}
        disabled={disabled}
      >
        {content}
      </TouchableOpacity>
    );
  },
);
