import { ShiftTypeOptions } from './constants';

export const getShiftTypeLabel = (key: string): string => {
  const found = ShiftTypeOptions.find(item => item.key === key);
  return found ? found.label : key;
};
