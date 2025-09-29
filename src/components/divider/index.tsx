import colors from '@themes/color';
import React, { memo, useMemo } from 'react';
import equals from 'react-fast-compare';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { DividerProps } from './type';

const DividerComponent = (props: DividerProps) => {
  // state
  const {
    height = StyleSheet.hairlineWidth,
    width = '100%',
    color = colors.divider,
  } = props;

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      width,
      //@ts-ignore
      height,
      backgroundColor: color,
    }),
    [color, height, width],
  );

  // render
  return <View style={[divider]} />;
};

export const Divider = memo(DividerComponent, equals);
