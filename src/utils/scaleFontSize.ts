import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const baseWidth = 375;

export const scaleFontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
