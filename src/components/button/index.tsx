import { Typo } from '@components/typo/typo';
import colors from '@themes/color';
import throttle from 'lodash.throttle';
import { memo, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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
    loading,
    loadingColor = colors.white,
    hitSlop,
    throttleDelay = 500,
    ...rest
  }: ButtonProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const viewStyle = useMemo<ViewStyle>(
      () =>
        StyleSheet.flatten([
          preset && stylesView()?.[preset],
          buttonColor && { backgroundColor: buttonColor },
          disabled && preset && { backgroundColor: colors.disabledButton },
          styleOverride as ViewStyle,
        ]),
      [preset, buttonColor, disabled, isPressed, styleOverride],
    );

    let content = useMemo(() => {
      let _typoColor = textColor || colors.white;
      if (preset === 'secondary') {
        _typoColor = colors.primaryButton;
      }

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

    const throttledPress = useCallback(
      throttle(
        () => {
          if (onPress) {
            onPress();
          }
        },
        throttleDelay,
        { trailing: false },
      ), // no trailing calls
      [onPress, throttleDelay],
    );

    const colorLoading = loadingColor;
    if (loading) {
      content = <ActivityIndicator size="small" color={colorLoading} />;
    }

    return (
      <TouchableOpacity
        //@ts-ignore
        hitSlop={_hitSlop}
        activeOpacity={activeOpacity}
        style={viewStyle}
        onPress={throttledPress}
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
