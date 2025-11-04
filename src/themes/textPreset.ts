import { scaleFontSize } from '@utils/scaleFontSize';
import { StyleSheet } from 'react-native';
import colors from './color';
import { FontDefault, FontWeight } from './font';

const presets = {
  regular_10: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(10),
    fontWeight: FontWeight.Regular,
    color: colors.primaryText,
  },
  medium_10: {
    fontFamily: FontDefault.Medium,
    fontSize: scaleFontSize(10),
    fontWeight: FontWeight.Medium,
    color: colors.primaryText,
  },
  semibold_10: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(10),
    fontWeight: FontWeight.SemiBold,
    color: colors.primaryText,
  },
  bold_10: {
    fontFamily: FontDefault.Bold,
    fontSize: scaleFontSize(10),
    fontWeight: FontWeight.Bold,
    color: colors.primaryText,
  },
  regular_12: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(12),
    fontWeight: FontWeight.Regular,
    color: colors.primaryText,
  },
  semibold_12: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(12),
    fontWeight: FontWeight.SemiBold,
    color: colors.primaryText,
  },
  bold_14: {
    fontFamily: FontDefault.Bold,
    fontSize: scaleFontSize(14),
    fontWeight: FontWeight.Bold,
    color: colors.primaryText,
  },
  semibold_14: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(14),
    fontWeight: FontWeight.SemiBold,
    color: colors.primaryText,
  },
  medium_14: {
    fontFamily: FontDefault.Medium,
    fontSize: scaleFontSize(14),
    fontWeight: FontWeight.Medium,
    color: colors.primaryText,
  },
  regular_14: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(14),
    fontWeight: FontWeight.Regular,
    color: colors.primaryText,
  },
  regular_16: {
    fontFamily: FontDefault.Regular,
    fontSize: scaleFontSize(16),
    fontWeight: FontWeight.Regular,
    color: colors.primaryText,
  },
  medium_16: {
    fontFamily: FontDefault.Medium,
    fontSize: scaleFontSize(16),
    fontWeight: FontWeight.Medium,
    color: colors.primaryText,
  },
  semibold_16: {
    fontFamily: FontDefault.SemiBold,
    fontSize: scaleFontSize(16),
    fontWeight: FontWeight.SemiBold,
    color: colors.primaryText,
  },
  bold_20: {
    fontFamily: FontDefault.Bold,
    fontSize: scaleFontSize(20),
    fontWeight: FontWeight.Bold,
    color: colors.primaryText,
  },
} as const;

export const textPresets = StyleSheet.create(presets);

export type TextPresets = typeof textPresets;
