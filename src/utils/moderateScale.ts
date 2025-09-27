import { Dimensions } from 'react-native';

const guidelineBaseWidth = 390;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const [shortDimension] =
  DEVICE_WIDTH < DEVICE_HEIGHT
    ? [DEVICE_WIDTH, DEVICE_HEIGHT]
    : [DEVICE_HEIGHT, DEVICE_WIDTH];

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
