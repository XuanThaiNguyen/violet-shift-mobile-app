import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const IS_DEV = __DEV__;

export const EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
export const EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
export const EMPTY_STRING = '--';
