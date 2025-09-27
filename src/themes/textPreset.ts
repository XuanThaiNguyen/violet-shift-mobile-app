import { scaleFontSize } from '@utils/scaleFontSize';
import { StyleSheet } from 'react-native';
import { FontDefault } from './font';

const presets = {
  regular_10: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(10),
  },
  semibold_10: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(10),
  },
  semibold_12: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(12),
  },
} as const;

export const textPresets = StyleSheet.create(presets);

export type TextPresets = typeof textPresets;
