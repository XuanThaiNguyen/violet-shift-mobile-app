import { moderateScale } from '@utils/moderateScale';
import { Dimensions } from 'react-native';
import { Spacing } from './spacing.type';

const { width, height } = Dimensions.get('window');

export const SpacingDefault: Spacing = {
  none: 0,
  tiny: moderateScale(4),
  radius: moderateScale(6),
  smaller: moderateScale(8),
  small: moderateScale(12),
  normal: moderateScale(16),
  large: moderateScale(20),
  medium: moderateScale(24),
  big: moderateScale(28),
  mediumPlush: moderateScale(32),
  bigger: moderateScale(44),
  huge: moderateScale(48),
  massive: moderateScale(52),
  width,
  height,
};
export type SpacingType = keyof typeof SpacingDefault;
