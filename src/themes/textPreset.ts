import { scaleFontSize } from '@utils/scaleFontSize';
import { StyleSheet } from 'react-native';
import { FontDefault } from './font';

const presets = {
  regular_10: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(10),
  },
  medium_10: {
    fontFamily: FontDefault.Medium,
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
  semibold_14: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(14),
  },
  medium_14: {
    fontFamily: FontDefault.Medium,
    fontSize: scaleFontSize(14),
  },
  regular_14: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(14),
  },
  regular_16: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(16),
  },
  semibold_16: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(16),
  },
  bold_20: {
    fontFamily: FontDefault.Bold,
    fontSize: scaleFontSize(20),
  },
} as const;

export const textPresets = StyleSheet.create(presets);

export type TextPresets = typeof textPresets;
