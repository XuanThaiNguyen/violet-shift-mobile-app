import React, { FC } from 'react';
import { View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  type?: keyof EdgeInsets;
}

export const InsetSubstitute: FC<Props> = ({ type = 'top' }) => {
  const insets = useSafeAreaInsets();
  const rootStyles = { height: insets[type] || 16 };

  return <View style={rootStyles} />;
};
