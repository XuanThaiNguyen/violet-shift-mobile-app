import { SpacingDefault } from '@components/spacing/spacing';
import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SpacerProps } from './type';

export const Spacer = ({ height = 0, width = 0 }: SpacerProps) => {
  const resolvedWidth =
    typeof width === 'string' ? SpacingDefault[width] : width;

  const actualStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      height,
      width: resolvedWidth,
    }),
    [height, resolvedWidth],
  );

  return <View style={actualStyle} />;
};
