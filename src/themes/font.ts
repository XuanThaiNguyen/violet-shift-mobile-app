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

export const FontWeight: Record<string, '400' | '500' | '600' | '700'> = {
  Regular: '400',
  Medium: '500',
  SemiBold: '600',
  Bold: '700',
};
