export interface FontDefault {
  Regular: string;
  Bold: string;
  Medium: string;
  SemiBold: string;
}

export const FontDefault: FontDefault = {
  Regular: 'SFProText-Regular',
  Bold: 'SFProText-Bold',
  Medium: 'SFProText-Medium',
  SemiBold: 'SFProText-Semibold',
};

export type FontFamily = keyof typeof FontDefault;
