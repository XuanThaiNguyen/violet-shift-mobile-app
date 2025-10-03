export type TimeRange = {
  startTime: Date;
  endTime: Date;
};

export type TimePickerField = 'startTime' | 'endTime' | null;
export type DatePickerField = 'availableDate' | 'endDate' | null;

export interface TimePickerProps {
  visible: boolean;
  field: TimePickerField;
  index: number | null;
}

export interface DatePickerProps {
  visible: boolean;
  field: DatePickerField;
}

export enum RepeatingEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}
